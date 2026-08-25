# Phase 10 production readiness

## Existing deployment

- Public candidate: `https://abarmandev-bay.vercel.app`
- Existing Vercel project: `ab_armandev`
- GitHub `main` integration: confirmed through the successful Vercel deployment/status attached to Phase 9 commit `749d392`.
- Local Vercel link: absent. The CLI is not authenticated, so Phase 10 does not relink, create, configure, or deploy a project.

## Production environment finding

The deployed V2 is live at the intended candidate, but its Phase 9 metadata currently resolves to `https://arman-portfolio.vercel.app`, a different stale deployment. The owner must update the existing Vercel project's **Production** `SITE_URL` to `https://abarmandev-bay.vercel.app` and redeploy after the reviewed Phase 10 commit. Preview deployments should leave `SITE_URL` unset; the application also checks `VERCEL_ENV` before allowing indexing.

Contact currently renders the fail-safe delivery-disabled state. Without authenticated Vercel access, the six variables cannot be inspected individually. The complete Contact environment is not valid in production.

Required names:

- `SITE_URL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

Turnstile must authorize `abarmandev-bay.vercel.app`. `CONTACT_FROM_EMAIL` must use an owner-controlled domain verified in Resend; the public Gmail address may remain the destination. No test keys belong in production. A real submission remains deferred until all credentials and the verified sender are configured.

## Hardening decisions

- Node.js `22.x` is declared for a stable Next.js 16/Vercel toolchain without pinning a patch release.
- GitHub Actions runs install, lint, type-check, unit tests, and the production build without secrets. The multi-browser Playwright suite remains a release/local gate because browser installation is materially heavier.
- Playwright accepts `PLAYWRIGHT_BASE_URL` for deliberate read-only testing of an existing deployment without starting a local server.
- Existing security headers are preserved. CSP is intentionally deferred: a production policy must be tested with Next.js hydration, Turnstile, WebGL/R3F, fonts, images, GSAP, and Lenis after real Contact credentials exist. Launching an unverified policy would be riskier than the current header set.
- Public assets contain only approved project media, the resume, and production brand assets; nothing was removed.
- No dependency or source-code license was added. Licensing remains an owner decision.

## Deployed QA snapshot

The existing Phase 9 production deployment was audited on 2026-08-25 before any Phase 10 commit:

- Seven intended public routes return HTTP 200; an invalid flagship slug returns a branded HTTP 404.
- HTTPS, HSTS, the Phase 9 safety headers, the custom SVG icon, the 1200×630 PNG social card, and the same-origin resume PDF are valid.
- Homepage Person JSON-LD and SlateDesk `SoftwareSourceCode` JSON-LD are present and evidence-aligned.
- Desktop enhancement uses Lenis, four project pin stages, one hero Canvas, and one capability Canvas. Mobile, short-height, and reduced-motion contexts retain native flow and the complete non-WebGL fallback.
- Production Contact is disabled, shows the direct email fallback, and does not load Turnstile early.
- Automated external checks resolved the GitHub profile, all twelve repository destinations, FrameSignal, and Arctic Daze. LinkedIn rejects automated `HEAD` requests, but the owner-confirmed URL and deployed link markup are unchanged.
- Browser console inspection returned no application messages; all rendered images completed, and no horizontal overflow or mixed-content URL was found.

Lighthouse 12.8.2 results against `https://abarmandev-bay.vercel.app`:

| Route/profile | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Homepage mobile | 95 | 100 | 100 | 100 |
| Homepage desktop | 100 | 100 | 100 | 100 |
| `/work` mobile | 93 | 100 | 100 | 100 |
| SlateDesk mobile | 97 | 100 | 100 | 100 |
| Resume mobile | 98 | 100 | 100 | 100 |

Lighthouse accepts the current metadata shape even though the deployed canonical origin is wrong; that score does not remove the `SITE_URL` blocker. The only small comparison regression is `/work` mobile performance from the Phase 9 reference 96 to 93, while other tested profiles improved or held and all five remain above target.

## Review-to-production handoff

1. Review and commit Phase 10 locally; push `main` to preserve the existing Git/Vercel flow.
2. In the existing Vercel project, set Production `SITE_URL` to `https://abarmandev-bay.vercel.app`; keep it absent from Preview.
3. Configure Contact only after a real Turnstile widget, authorized hostname, Resend API key, verified sender domain, and destination are ready.
4. Redeploy, then recheck canonical tags, robots, sitemap, social URLs, and perform exactly one real Contact submission.
5. If a custom domain is added later, update Production `SITE_URL`, the Vercel domain, and Turnstile hostnames together before redeploying.
