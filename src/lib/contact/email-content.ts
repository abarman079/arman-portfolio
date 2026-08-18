import {
  contactReasonLabels,
  type ContactSubmission,
} from "../../schemas/contact";

export interface ContactEmailContent {
  subject: string;
  text: string;
  html: string;
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeSubjectPart(value: string) {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

export function buildContactEmail(
  submission: ContactSubmission,
): ContactEmailContent {
  const reason = contactReasonLabels[submission.reason];
  const name = safeSubjectPart(submission.name);
  const escapedMessage = escapeHtml(submission.message).replaceAll("\n", "<br />");

  return {
    subject: `Portfolio contact — ${reason} — ${name}`,
    text: [
      "New portfolio contact",
      "",
      `Name: ${submission.name}`,
      `Email: ${submission.email}`,
      `Reason: ${reason}`,
      "",
      "Message:",
      submission.message,
    ].join("\n"),
    html: [
      '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111318;max-width:640px">',
      '<p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8a2413">Portfolio contact</p>',
      `<p><strong>Name:</strong> ${escapeHtml(submission.name)}<br />`,
      `<strong>Email:</strong> ${escapeHtml(submission.email)}<br />`,
      `<strong>Reason:</strong> ${escapeHtml(reason)}</p>`,
      '<hr style="border:0;border-top:1px solid #c8c3b7;margin:24px 0" />',
      `<p>${escapedMessage}</p>`,
      "</div>",
    ].join(""),
  };
}
