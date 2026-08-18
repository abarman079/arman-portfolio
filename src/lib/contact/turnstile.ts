import "server-only";

import { z } from "zod";

import { CONTACT_TURNSTILE_ACTION } from "@/schemas/contact";

import type { ContactEnvironmentResult } from "./environment";
import type { TurnstileVerificationResult } from "./types";

const siteverifyResponseSchema = z
  .object({
    success: z.boolean(),
    action: z.string().optional(),
    hostname: z.string().optional(),
    "error-codes": z.array(z.string()).optional(),
  })
  .passthrough();

type ConfiguredContactEnvironment = Extract<
  ContactEnvironmentResult,
  { mode: "configured" }
>;

export async function verifyTurnstileToken(
  token: string,
  requestId: string,
  environment: ConfiguredContactEnvironment,
): Promise<TurnstileVerificationResult> {
  if (!token) {
    return { ok: false, category: "missing" };
  }

  const payload = new FormData();
  payload.set("secret", environment.values.TURNSTILE_SECRET_KEY);
  payload.set("response", token);
  payload.set("idempotency_key", requestId);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: payload,
        cache: "no-store",
        signal: AbortSignal.timeout(8_000),
      },
    );

    if (!response.ok) {
      return { ok: false, category: "service-unavailable" };
    }

    const parsed = siteverifyResponseSchema.safeParse(await response.json());

    if (!parsed.success) {
      return { ok: false, category: "service-unavailable" };
    }

    if (!parsed.data.success) {
      return { ok: false, category: "rejected" };
    }

    const actionMismatch = environment.enforceResponseContext
      ? parsed.data.action !== CONTACT_TURNSTILE_ACTION
      : Boolean(
          parsed.data.action &&
            parsed.data.action !== CONTACT_TURNSTILE_ACTION,
        );
    const hostnameMismatch = environment.enforceResponseContext
      ? parsed.data.hostname !== environment.expectedHostname
      : false;

    if (actionMismatch || hostnameMismatch) {
      return { ok: false, category: "mismatch" };
    }

    return { ok: true };
  } catch {
    return { ok: false, category: "service-unavailable" };
  }
}
