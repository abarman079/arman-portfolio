# Md. Akibul Hasan Arman — Portfolio

A production portfolio for Md. Akibul Hasan Arman, a software engineer building full-stack products, backend systems, and applied ML. The site pairs evidence-backed engineering case studies with a responsive editorial interface and progressively enhanced motion.

V1.1 adds an Interactive Lab built with custom GLSL: a progressive GPU visualization inspired by computer-vision processing concepts, with static mobile and reduced-motion fallbacks. It does not run the project models.

## Live portfolio

[abarmandev-bay.vercel.app](https://abarmandev-bay.vercel.app/)

## Highlights

- Next.js 16 App Router and React 19, with Server Components as the default
- Strict TypeScript and a centralized, validated project-content model
- Responsive “Signal & Structure” visual system built with Tailwind CSS v4 and CSS Modules
- Motion for local interaction, GSAP for selected scroll choreography, and Lenis for eligible desktop scrolling
- Progressive React Three Fiber capability visualization and custom GLSL Interactive Lab with CSS/media fallbacks
- Evidence-backed flagship case studies with verified project media and contextualized research results
- Environment-gated Contact Server Action using Zod, Cloudflare Turnstile Siteverify, and Resend
- Metadata, JSON-LD, sitemap, robots, social-card, custom icon, and branded not-found foundations
- Vitest, Playwright, Axe, visual regression baselines, and Lighthouse-oriented QA

## Architecture

The application keeps content and routing server-rendered wherever possible. Narrow Client Component islands own browser-only behavior such as navigation state, local motion, smooth scrolling, the capability and Interactive Lab canvases, and Contact form interaction.

Animation responsibilities remain separated: CSS handles state and accessibility fallbacks, Motion handles component interaction, GSAP owns coordinated project storytelling, and Lenis supplies the single optional smooth-scroll clock. WebGL is loaded only for capable desktop contexts and is never required to understand the content.

Project facts live in typed records under `src/content/` and are validated before presentation. Contact delivery fails closed when its production environment is incomplete, while the direct email route remains available. SEO uses one validated `SITE_URL`; unconfigured and Vercel Preview builds remain non-indexable.

```text
src/app/          App Router routes, metadata, Server Actions
src/components/   layout, sections, project, motion, visual, and UI modules
src/content/      evidence-backed site and project records
src/lib/          project, SEO, environment, and provider helpers
src/schemas/      shared validation schemas
src/types/        public content and application contracts
public/projects/  approved, optimized project media
docs/             evidence, provenance, decisions, and owner inputs
e2e/              Playwright, Axe, and visual-regression coverage
```

## Local development

Node.js 22 is the supported development and deployment major.

```bash
npm ci
npm run dev
```

Copy `.env.example` to an ignored local environment file only when testing Contact or production-shaped metadata. Never commit credentials.

| Variable | Visibility | Responsibility |
| --- | --- | --- |
| `SITE_URL` | Server | Canonical production origin and Turnstile hostname validation |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Browser | Public Turnstile widget key |
| `TURNSTILE_SECRET_KEY` | Server | Turnstile Siteverify secret |
| `RESEND_API_KEY` | Server | Contact email delivery |
| `CONTACT_FROM_EMAIL` | Server | Sender on an owner-controlled, Resend-verified domain |
| `CONTACT_TO_EMAIL` | Server | Contact destination inbox |

## Quality gates

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

The Playwright suite covers desktop, mobile, reduced motion, Chromium visual baselines, Firefox, WebKit, keyboard navigation, and automated Axe checks. The GitHub Actions workflow runs the dependency, lint, type, unit-test, and production-build gate without requiring deployment secrets; full browser QA remains a release gate.

## Deployment

The existing Vercel project deploys the GitHub `main` branch to production. `SITE_URL` must be scoped to Vercel Production and set to the current public origin. Preview deployments should not receive a competing canonical origin and remain protected from indexing.

No source-code license is currently granted. Licensing remains an owner decision.
