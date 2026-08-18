import { z } from "zod";

export const contactReasonValues = [
  "job-opportunity",
  "collaboration",
  "project-inquiry",
  "general-message",
] as const;

export const CONTACT_TURNSTILE_ACTION = "contact";

export const contactReasonLabels = {
  "job-opportunity": "Job opportunity",
  collaboration: "Collaboration",
  "project-inquiry": "Project inquiry",
  "general-message": "General message",
} as const satisfies Record<(typeof contactReasonValues)[number], string>;

export const contactFieldLimits = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 20, max: 4_000 },
  turnstileToken: { max: 2_048 },
} as const;

const contactReasonSchema = z.enum(contactReasonValues, {
  error: "Choose a reason for getting in touch.",
});

const baseContactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(contactFieldLimits.name.min, "Enter your name.")
      .max(contactFieldLimits.name.max, "Keep your name under 80 characters."),
    email: z
      .string()
      .trim()
      .max(contactFieldLimits.email.max, "Keep your email under 254 characters.")
      .pipe(z.email("Enter a valid email address.")),
    reason: contactReasonSchema,
    message: z
      .string()
      .trim()
      .min(
        contactFieldLimits.message.min,
        "Add a little more detail (at least 20 characters).",
      )
      .max(
        contactFieldLimits.message.max,
        "Keep your message under 4,000 characters.",
      ),
    website: z.string().trim().max(0, "Unable to process this submission."),
    turnstileToken: z
      .string()
      .trim()
      .max(
        contactFieldLimits.turnstileToken.max,
        "Verification could not be completed.",
      ),
  })
  .strict();

export const contactSubmissionSchema = baseContactSchema;

export const protectedContactSubmissionSchema = baseContactSchema.extend({
  turnstileToken: z
    .string()
    .trim()
    .min(1, "Complete the verification before sending.")
    .max(
      contactFieldLimits.turnstileToken.max,
      "Verification could not be completed.",
    ),
});

export type ContactReason = (typeof contactReasonValues)[number];
export type ContactSubmission = z.infer<typeof protectedContactSubmissionSchema>;

export function contactFormDataToObject(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    reason: String(formData.get("reason") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
    turnstileToken: String(formData.get("turnstileToken") ?? ""),
  };
}
