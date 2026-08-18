import type { ContactReason, ContactSubmission } from "../../schemas/contact";

export type ContactDeliveryMode =
  | "configured"
  | "development-disabled"
  | "production-misconfigured";

export interface ContactFormValues {
  name: string;
  email: string;
  reason: ContactReason | "";
  message: string;
}

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormValues | "turnstileToken", string[]>
>;

export type ContactActionStatus =
  | "idle"
  | "validation-error"
  | "verification-error"
  | "delivery-error"
  | "development-disabled"
  | "success";

export interface ContactActionState {
  status: ContactActionStatus;
  message: string;
  fieldErrors: ContactFieldErrors;
  values: ContactFormValues;
  requestId?: string;
  resetTurnstile?: boolean;
}

export const emptyContactValues: ContactFormValues = {
  name: "",
  email: "",
  reason: "",
  message: "",
};

export const initialContactActionState: ContactActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: emptyContactValues,
};

export type TurnstileVerificationResult =
  | { ok: true }
  | {
      ok: false;
      category: "missing" | "rejected" | "mismatch" | "service-unavailable";
    };

export type EmailDeliveryResult =
  | { ok: true; providerId: string }
  | { ok: false; category: "provider-rejected" | "service-unavailable" };

export interface ContactSubmissionDependencies {
  deliveryMode: ContactDeliveryMode;
  verifyTurnstile: (
    token: string,
    requestId: string,
  ) => Promise<TurnstileVerificationResult>;
  sendEmail: (
    submission: ContactSubmission,
    requestId: string,
  ) => Promise<EmailDeliveryResult>;
  createRequestId: () => string;
}
