# Phase 6 contact and final-scene decisions

## Architecture

- The homepage keeps a server-rendered Contact section and footer. The interactive boundary is limited to the form, direct Cloudflare Turnstile lifecycle, and Copy Email feedback.
- React `useActionState` calls a Server Action. The server revalidates the shared Zod schema, rejects the honeypot, verifies the single-use Turnstile token through Siteverify, then calls a server-only Resend boundary.
- `resend@6.18.1` is the only Phase 6 dependency. Turnstile uses Cloudflare's official explicit-render script and API directly; no widget wrapper was added.
- Provider functions sit behind a small injectable submission processor so validation, rejection, provider failure, and success paths are unit tested without network calls or real email.

## Security and delivery

- Production requires `SITE_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`. Missing or invalid production configuration fails closed.
- Siteverify must return success. Production also requires the `contact` action and the hostname derived from `SITE_URL`; tokens remain bounded to Cloudflare's documented 2,048-character maximum.
- The visitor address is used only as `replyTo`. `CONTACT_FROM_EMAIL` must belong to an owner-verified Resend domain. Plain-text and escaped HTML notifications contain only the submitted name, email, reason, and message.
- No message database, analytics, fingerprinting, full-message logging, or in-memory rate limiter was added. The baseline is strict limits, Zod, honeypot, Turnstile, and provider validation.

## Development and testing

- Without complete credentials, development still runs the shared validation and returns a clearly labeled delivery-disabled result. It never simulates success. Production with incomplete configuration reports that delivery is unavailable.
- `.env.example` contains placeholders only. Cloudflare's documented dummy site/secret keys may be supplied locally or in automated browser environments, but no bypass is compiled into production.
- Unit tests mock both provider boundaries. A real Resend email is not sent during lint, typecheck, test, or build.

## Final scene

- The closing scene uses the existing night palette, oversized editorial headline, ruled form, technical routing annotations, central profile data, and one publication-safe SlateDesk crop already covered by Phase 3 provenance.
- A CSS-built dimensional frame and signal route provide depth. A second R3F canvas was intentionally rejected because it would duplicate the Capability Gallery and add another rendering context without improving the contact task.
- The footer is part of the same dark conclusion and resolves with an oversized ARMAN wordmark, compact navigation, verified links, location, and current year.

## Remaining production setup

- Owner-controlled deployment settings still need the final production URL, a production Turnstile widget restricted to that hostname, a Turnstile secret, a Resend API key, an owner-verified sending domain/from address, and the destination inbox.
- Credentials must be entered directly in local/deployment secret settings and must not be supplied in chat or committed to the repository.
