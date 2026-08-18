import { describe, expect, it, vi } from "vitest";

import {
  contactSubmissionSchema,
  protectedContactSubmissionSchema,
} from "../../schemas/contact";

import { buildContactEmail, escapeHtml } from "./email-content";
import { processContactSubmission } from "./process-submission";
import type { ContactSubmissionDependencies } from "./types";

const validContact = {
  name: "Jane Doe",
  email: "jane@example.com",
  reason: "job-opportunity",
  message: "I would like to discuss a software engineering role.",
  website: "",
  turnstileToken: "verified-token",
} as const;

function createFormData(overrides: Partial<Record<keyof typeof validContact, string>> = {}) {
  const formData = new FormData();
  const values = { ...validContact, ...overrides };

  for (const [key, value] of Object.entries(values)) {
    formData.set(key, value);
  }

  return formData;
}

function createDependencies(
  overrides: Partial<ContactSubmissionDependencies> = {},
): ContactSubmissionDependencies {
  return {
    deliveryMode: "configured",
    createRequestId: () => "request-01",
    verifyTurnstile: vi.fn().mockResolvedValue({ ok: true }),
    sendEmail: vi.fn().mockResolvedValue({ ok: true, providerId: "email-01" }),
    ...overrides,
  };
}

describe("contact validation", () => {
  it("accepts a valid protected submission", () => {
    expect(protectedContactSubmissionSchema.safeParse(validContact).success).toBe(true);
  });

  it.each([
    ["invalid email", { email: "not-an-email" }],
    ["short name", { name: "A" }],
    ["short message", { message: "Too short" }],
    ["invalid reason", { reason: "freelance-budget" }],
    ["filled honeypot", { website: "https://spam.example" }],
    ["missing verification", { turnstileToken: "" }],
  ])("rejects %s", (_label, override) => {
    expect(
      protectedContactSubmissionSchema.safeParse({
        ...validContact,
        ...override,
      }).success,
    ).toBe(false);
  });

  it("enforces maximum input lengths", () => {
    expect(
      contactSubmissionSchema.safeParse({
        ...validContact,
        name: "n".repeat(81),
        email: `${"e".repeat(245)}@example.com`,
        message: "m".repeat(4_001),
        turnstileToken: "t".repeat(2_049),
      }).success,
    ).toBe(false);
  });
});

describe("contact submission flow", () => {
  it("returns structured field errors without calling providers", async () => {
    const dependencies = createDependencies();
    const result = await processContactSubmission(
      createFormData({ email: "invalid", message: "short" }),
      dependencies,
    );

    expect(result.status).toBe("validation-error");
    expect(result.fieldErrors.email?.[0]).toContain("valid email");
    expect(result.fieldErrors.message?.[0]).toContain("at least 20");
    expect(dependencies.verifyTurnstile).not.toHaveBeenCalled();
    expect(dependencies.sendEmail).not.toHaveBeenCalled();
  });

  it("requires a Turnstile token on a configured submission", async () => {
    const dependencies = createDependencies();
    const result = await processContactSubmission(
      createFormData({ turnstileToken: "" }),
      dependencies,
    );

    expect(result.status).toBe("validation-error");
    expect(result.fieldErrors.turnstileToken?.[0]).toContain("verification");
    expect(dependencies.verifyTurnstile).not.toHaveBeenCalled();
    expect(dependencies.sendEmail).not.toHaveBeenCalled();
  });

  it("returns a successful structured response after verification and delivery", async () => {
    const dependencies = createDependencies();
    const result = await processContactSubmission(createFormData(), dependencies);

    expect(result.status).toBe("success");
    expect(result.values).toEqual({ name: "", email: "", reason: "", message: "" });
    expect(dependencies.verifyTurnstile).toHaveBeenCalledOnce();
    expect(dependencies.sendEmail).toHaveBeenCalledOnce();
  });

  it("rejects a failed or expired Turnstile token before email delivery", async () => {
    const dependencies = createDependencies({
      verifyTurnstile: vi.fn().mockResolvedValue({ ok: false, category: "rejected" }),
    });
    const result = await processContactSubmission(createFormData(), dependencies);

    expect(result.status).toBe("verification-error");
    expect(result.resetTurnstile).toBe(true);
    expect(dependencies.sendEmail).not.toHaveBeenCalled();
  });

  it("fails closed when the verification service is unavailable", async () => {
    const dependencies = createDependencies({
      verifyTurnstile: vi.fn().mockResolvedValue({
        ok: false,
        category: "service-unavailable",
      }),
    });
    const result = await processContactSubmission(createFormData(), dependencies);

    expect(result.status).toBe("verification-error");
    expect(result.message).toContain("temporarily unavailable");
    expect(dependencies.sendEmail).not.toHaveBeenCalled();
  });

  it("returns a retryable error when the email provider fails", async () => {
    const result = await processContactSubmission(
      createFormData(),
      createDependencies({
        sendEmail: vi.fn().mockResolvedValue({
          ok: false,
          category: "provider-rejected",
        }),
      }),
    );

    expect(result.status).toBe("delivery-error");
    expect(result.message).toContain("No message was sent");
    expect(result.resetTurnstile).toBe(true);
  });

  it("validates locally without pretending that delivery succeeded", async () => {
    const dependencies = createDependencies({
      deliveryMode: "development-disabled",
    });
    const result = await processContactSubmission(createFormData(), dependencies);

    expect(result.status).toBe("development-disabled");
    expect(result.message).toContain("delivery is disabled");
    expect(dependencies.verifyTurnstile).not.toHaveBeenCalled();
    expect(dependencies.sendEmail).not.toHaveBeenCalled();
  });

  it("does not expose honeypot details or call providers", async () => {
    const dependencies = createDependencies();
    const result = await processContactSubmission(
      createFormData({ website: "spam" }),
      dependencies,
    );

    expect(result.status).toBe("delivery-error");
    expect(result.fieldErrors).toEqual({});
    expect(dependencies.verifyTurnstile).not.toHaveBeenCalled();
    expect(dependencies.sendEmail).not.toHaveBeenCalled();
  });
});

describe("contact email content", () => {
  it("constrains the subject, sets readable text, and escapes HTML", () => {
    const email = buildContactEmail({
      ...validContact,
      name: "Jane\r\nBcc: attacker@example.com",
      message: "Hello <script>alert('x')</script>\nNext line is safe.",
    });

    expect(email.subject).not.toContain("\n");
    expect(email.subject).not.toContain("\r");
    expect(email.text).toContain("Reason: Job opportunity");
    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
    expect(escapeHtml("<&\"'")).toBe("&lt;&amp;&quot;&#039;");
  });
});
