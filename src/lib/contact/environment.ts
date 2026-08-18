import "server-only";

import { z } from "zod";

import type { ContactDeliveryMode } from "./types";

const fromAddressSchema = z
  .string()
  .trim()
  .min(3)
  .max(320)
  .refine((value) => {
    const bracketedAddress = value.match(/<([^<>]+)>$/)?.[1];
    return z.email().safeParse(bracketedAddress ?? value).success;
  }, "Use an email address or a Name <email@example.com> sender.");

const contactEnvironmentSchema = z.object({
  SITE_URL: z.url().refine((value) => {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  }),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().trim().min(1).max(128),
  TURNSTILE_SECRET_KEY: z.string().trim().min(1).max(256),
  RESEND_API_KEY: z.string().trim().min(1).max(256),
  CONTACT_FROM_EMAIL: fromAddressSchema,
  CONTACT_TO_EMAIL: z.email(),
});

export type ContactEnvironment = z.infer<typeof contactEnvironmentSchema>;

export type ContactEnvironmentResult =
  | {
      mode: "configured";
      values: ContactEnvironment;
      expectedHostname: string;
      enforceResponseContext: boolean;
    }
  | {
      mode: Exclude<ContactDeliveryMode, "configured">;
      missing: string[];
    };

export function getContactEnvironment(): ContactEnvironmentResult {
  const rawEnvironment = {
    SITE_URL: process.env.SITE_URL,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY:
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  };
  const parsed = contactEnvironmentSchema.safeParse(rawEnvironment);

  if (!parsed.success) {
    const missing = parsed.error.issues.map((issue) => issue.path.join("."));

    return {
      mode:
        process.env.NODE_ENV === "production"
          ? "production-misconfigured"
          : "development-disabled",
      missing: [...new Set(missing)],
    };
  }

  return {
    mode: "configured",
    values: parsed.data,
    expectedHostname: new URL(parsed.data.SITE_URL).hostname,
    enforceResponseContext: process.env.NODE_ENV === "production",
  };
}
