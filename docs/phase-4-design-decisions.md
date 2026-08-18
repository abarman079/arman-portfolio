# Phase 4 case-study decisions

## Architecture

- One Server Component route, `src/app/work/[slug]/page.tsx`, renders the four flagship records.
- `generateStaticParams` returns only the four flagship slugs, so all four are emitted as static HTML at build time. Unknown slugs reach the same typed lookup and `notFound()` guard, then render the route-local 404. `dynamicParams = false` was intentionally omitted because the installed Next.js 16.3.1 production server emitted internal `NoFallbackError` messages and a hydration mismatch for its fallback path; the guarded route retains correct 404 status without those runtime errors.
- `generateMetadata` derives title, description, Open Graph text, and Twitter text from the verified project source. Canonical URLs and absolute social images remain deferred until the production domain is confirmed.
- Case-study content uses optional, evidence-referenced blocks: prose, features, architecture, decisions, media references, metric references, and limitations.
- Media and metrics are referenced by index from each project record so claims and provenance are not duplicated in presentation code.

## Project composition

- SlateDesk leads with modular architecture, role/ownership boundaries, deadlines, concurrency, and rule-focused testing.
- FrameSignal leads with decision-first content structure, spoiler boundaries, public/server content, protected administration, and database authorization.
- Arctic Daze leads with responsive product discovery, URL-driven collection filters, reusable product UI, account surfaces, and the documented request flow.
- CCTV Violence Anomaly Detection leads with the fixed research pipeline, model comparison, contextualized metrics, confusion-matrix evidence, and explicit research limits.
- No role, timeline, team size, first-person challenge, personal tradeoff, impact, or lesson has been added.

## View Transition decision

View Transition is intentionally deferred.

The bundled Next.js 16.3.1 guide describes App Router integration with no configuration, but the installed stable `react@19.2.8` package does not export `ViewTransition`. The current official React reference also marks `<ViewTransition>` as available only in Canary and Experimental channels. Phase 4 therefore uses ordinary `next/link` navigation, direct URLs, and browser history without changing React release channels or adding experimental configuration.

This decision should be reevaluated only after the API is present in the project's stable React dependency and the exact installed Next.js documentation still recommends the integration.

## Media and client boundaries

- No new media was added. Phase 4 reuses the eight privacy-reviewed Phase 3 assets and their recorded provenance.
- Case-study pages, diagrams, metadata, content blocks, project actions, and next-project navigation are Server Components.
- The pre-existing Motion-powered media-stage island remains limited to homepage and `/work` preview interaction; the case-study routes add no client bundle and no continuous animation.

## Owner narrative gaps

The highest-value later additions remain: personal role/project context, timeline, one personally chosen engineering tradeoff, one significant challenge, verified result/impact, and one lesson per flagship. These remain hidden until owner-confirmed.
