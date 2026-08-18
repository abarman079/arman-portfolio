import "server-only";

import { Resend } from "resend";

import type { ContactSubmission } from "@/schemas/contact";

import { buildContactEmail } from "./email-content";
import type { ContactEnvironmentResult } from "./environment";
import type { EmailDeliveryResult } from "./types";

type ConfiguredContactEnvironment = Extract<
  ContactEnvironmentResult,
  { mode: "configured" }
>;

export async function deliverContactEmail(
  submission: ContactSubmission,
  requestId: string,
  environment: ConfiguredContactEnvironment,
): Promise<EmailDeliveryResult> {
  const resend = new Resend(environment.values.RESEND_API_KEY);
  const email = buildContactEmail(submission);

  try {
    const { data, error } = await resend.emails.send(
      {
        from: environment.values.CONTACT_FROM_EMAIL,
        to: environment.values.CONTACT_TO_EMAIL,
        replyTo: submission.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
      },
      { idempotencyKey: `portfolio-contact/${requestId}` },
    );

    if (error || !data?.id) {
      return { ok: false, category: "provider-rejected" };
    }

    return { ok: true, providerId: data.id };
  } catch {
    return { ok: false, category: "service-unavailable" };
  }
}
