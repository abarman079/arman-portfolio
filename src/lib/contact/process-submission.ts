import {
  contactFormDataToObject,
  contactReasonValues,
  contactSubmissionSchema,
  protectedContactSubmissionSchema,
} from "../../schemas/contact";

import {
  emptyContactValues,
  type ContactActionState,
  type ContactFieldErrors,
  type ContactFormValues,
  type ContactSubmissionDependencies,
} from "./types";

function retainedValues(raw: ReturnType<typeof contactFormDataToObject>): ContactFormValues {
  return {
    name: raw.name.slice(0, 80),
    email: raw.email.slice(0, 254),
    reason: contactReasonValues.includes(
      raw.reason as (typeof contactReasonValues)[number],
    )
      ? (raw.reason as ContactFormValues["reason"])
      : "",
    message: raw.message.slice(0, 4_000),
  };
}

function fieldErrorsFromZod(
  fieldErrors: Record<string, string[] | undefined>,
): ContactFieldErrors {
  const visibleFields = [
    "name",
    "email",
    "reason",
    "message",
    "turnstileToken",
  ] as const;
  const result: ContactFieldErrors = {};

  for (const field of visibleFields) {
    if (fieldErrors[field]?.length) {
      result[field] = fieldErrors[field];
    }
  }

  return result;
}

export async function processContactSubmission(
  formData: FormData,
  dependencies: ContactSubmissionDependencies,
): Promise<ContactActionState> {
  const raw = contactFormDataToObject(formData);
  const values = retainedValues(raw);
  const requestId = dependencies.createRequestId();
  const structuralResult = contactSubmissionSchema.safeParse(raw);

  if (!structuralResult.success) {
    const flattened = structuralResult.error.flatten();

    if (flattened.fieldErrors.website?.length) {
      return {
        status: "delivery-error",
        message: "This submission could not be processed. Use the direct email link instead.",
        fieldErrors: {},
        values,
        requestId,
      };
    }

    return {
      status: "validation-error",
      message: "Review the highlighted fields and try again.",
      fieldErrors: fieldErrorsFromZod(flattened.fieldErrors),
      values,
      requestId,
    };
  }

  if (dependencies.deliveryMode === "development-disabled") {
    return {
      status: "development-disabled",
      message:
        "The form is valid, but email delivery is disabled in this local environment. Use the direct email link to send it.",
      fieldErrors: {},
      values,
      requestId,
    };
  }

  if (dependencies.deliveryMode === "production-misconfigured") {
    return {
      status: "delivery-error",
      message:
        "Message delivery is temporarily unavailable. Please use the direct email link.",
      fieldErrors: {},
      values,
      requestId,
    };
  }

  const protectedResult = protectedContactSubmissionSchema.safeParse(raw);

  if (!protectedResult.success) {
    return {
      status: "validation-error",
      message: "Complete the verification and try again.",
      fieldErrors: fieldErrorsFromZod(
        protectedResult.error.flatten().fieldErrors,
      ),
      values,
      requestId,
      resetTurnstile: true,
    };
  }

  const verification = await dependencies.verifyTurnstile(
    protectedResult.data.turnstileToken,
    requestId,
  );

  if (!verification.ok) {
    return {
      status: "verification-error",
      message:
        verification.category === "service-unavailable"
          ? "Verification is temporarily unavailable. Please retry or use direct email."
          : "Verification expired or was rejected. Complete it again and retry.",
      fieldErrors: {
        turnstileToken: ["Complete a fresh verification before sending."],
      },
      values,
      requestId,
      resetTurnstile: true,
    };
  }

  const delivery = await dependencies.sendEmail(
    protectedResult.data,
    requestId,
  );

  if (!delivery.ok) {
    return {
      status: "delivery-error",
      message:
        "The message could not be delivered. No message was sent; retry or use direct email.",
      fieldErrors: {},
      values,
      requestId,
      resetTurnstile: true,
    };
  }

  return {
    status: "success",
    message: "Message sent. Thank you — your note is on its way.",
    fieldErrors: {},
    values: emptyContactValues,
    requestId,
    resetTurnstile: true,
  };
}
