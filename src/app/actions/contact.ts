"use server";

import { randomUUID } from "node:crypto";

import { deliverContactEmail } from "@/lib/contact/resend";
import { getContactEnvironment } from "@/lib/contact/environment";
import { processContactSubmission } from "@/lib/contact/process-submission";
import { verifyTurnstileToken } from "@/lib/contact/turnstile";
import type { ContactActionState } from "@/lib/contact/types";

export async function submitContact(
  _previousState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const environment = getContactEnvironment();

  return processContactSubmission(formData, {
    deliveryMode: environment.mode,
    createRequestId: randomUUID,
    verifyTurnstile: async (token, requestId) =>
      environment.mode === "configured"
        ? verifyTurnstileToken(token, requestId, environment)
        : { ok: false, category: "service-unavailable" },
    sendEmail: async (submission, requestId) =>
      environment.mode === "configured"
        ? deliverContactEmail(submission, requestId, environment)
        : { ok: false, category: "service-unavailable" },
  });
}
