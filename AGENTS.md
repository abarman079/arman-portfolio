<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Arman Portfolio V2

## Purpose

Build a premium, truthful software-engineering portfolio for Md. Akibul Hasan Arman. The work must demonstrate full-stack/backend engineering, frontend craft, applied ML/CV, and data/BI without becoming a generic landing page. Project evidence is more important than decorative effects.

## Sources of truth

- Read `docs/project-evidence-manifest.md`, `docs/asset-inventory.md`, `docs/verified-content-model.md`, and `docs/owner-inputs.md` before changing public project content.
- `reference/legacy/` is ignored reference material. Preserve it; never treat its copy, links, availability, metrics, or imagery as verified facts.
- Before writing Next.js code, read the relevant current guide in `node_modules/next/dist/docs/`. Do not assume older Next.js APIs or conventions.

## Architecture

- Use Next.js App Router with Server Components by default.
- Add `"use client"` only for the smallest interactive island requiring browser APIs, state, events, or animation.
- Keep project content in one typed, validated source. Generate project routes and metadata from it.
- Prefer simple, explicit component boundaries. Do not create a monolith or abstract trivial markup.
- Normal Next.js navigation is the baseline. View Transitions are optional progressive enhancement and must never determine routing architecture.

Expected structure as implementation proceeds:

```text
src/app/          routes, layouts, metadata, server actions
src/components/   layout, sections, project, motion, visual, ui
src/content/      evidence-backed project/profile records
src/lib/          environment, SEO, and data helpers
src/schemas/      shared validation schemas
src/types/        public content/application types
public/projects/  approved, optimized project media
docs/             audit, evidence, assets, and owner inputs
```

## TypeScript and code quality

- Keep strict TypeScript; do not use `any`, unsafe casts, or suppressed errors to bypass modeling.
- Prefer discriminated unions for content blocks and action states.
- Keep secrets and server-only integrations outside client modules.
- No debug logs, dead code, commented-out implementations, or hydration-warning workarounds.

## Styling and design system

- Use Tailwind CSS v4 and semantic CSS variables/design tokens; avoid scattered magic values.
- Preserve the approved “Signal & Structure” editorial/technical direction: warm canvas, graphite stages, disciplined grid, strong type, restrained signal accent.
- Do not create a rounded-card/glass/neon portfolio. Project media and readable content lead the composition.
- Mobile is art-directed, not merely stacked desktop. Use explicit image dimensions and responsive `sizes`.

## Content integrity

- Never invent technologies, features, architecture, roles, dates, employers, clients, metrics, results, awards, availability, lessons, or live URLs.
- Every important public claim maps to evidence or explicit owner confirmation.
- Repository ownership does not prove personal role, team context, year, outcome, or lesson.
- Keep research metrics attached to dataset, split/evaluation, model, and limitation context.
- Omit unknown optional fields and empty case-study sections. Never fill gaps with generic marketing copy.
- Never use stock imagery or fabricated screenshots as project evidence. Resolve media license, credit, and privacy before publishing.

## Motion ownership

- CSS: basic focus/hover and reduced-motion overrides.
- Motion: component states, gestures, springs, menus, controls, and local layout motion.
- GSAP/ScrollTrigger: only complex coordinated scroll timelines.
- Lenis: only the single smooth-scroll clock.
- View Transitions: optional project-cover continuity after a fresh compatibility review.
- One engine owns a property. Content must render visible and understandable without animation.
- The hero Canvas is a prototype, not a requirement; reject it if it looks like a generic node/network effect.

## Accessibility and performance

- Use semantic HTML, logical headings, visible focus, keyboard-complete dialogs/forms, live status announcements, 44px touch targets, sufficient contrast, and meaningful alt text.
- Nothing essential may depend on hover, motion, canvas, WebGL, or JavaScript-only reveal.
- Honor `prefers-reduced-motion`; disable smooth scrolling, pinning, parallax, magnetic behavior, and decorative continuous motion.
- Minimize client JavaScript, lazy-load heavy media/visuals, pause offscreen animation, cap canvas DPR, and prevent layout shift.
- Target Lighthouse: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+ without gaming the audit.

## Dependencies and environment

- Install a dependency only in the phase that introduces working code or tests requiring it.
- Immediately before installation, verify the current stable compatible release and official documentation. Record a clear responsibility; do not add packages speculatively.
- Do not enable experimental framework configuration merely to demonstrate an API.
- Never commit `.env*`, API keys, tokens, service credentials, or private URLs. Validate production configuration and fail closed for contact/security services.

## Git safety

- Preserve `reference/legacy/` and keep it ignored.
- Do not use destructive Git operations, delete reference material, or overwrite unrelated user work.
- Work in reviewable phase-scoped increments. Check `git status` and the diff before handoff.

## Validation

Run all commands currently defined for the phase. As scripts are introduced, the expected full gate is:

```text
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Also inspect the browser console, hydration, responsive layouts, keyboard navigation, reduced motion, links, images, routes, form states, and loading behavior when those features exist. Fix failures; do not merely report them.

## Definition of done

A phase is done only when its scoped behavior works responsively and accessibly, content is evidence-backed, new dependencies are justified, relevant validation passes, no secrets or unsupported claims were introduced, and the diff contains no unrelated changes.

Never ship fabricated facts, stock project thumbnails, inaccessible scroll hijacking, fake loaders, decorative 3D, a whole-site Client Component, hidden essential content, exposed secrets, or animation that impairs navigation and reading.
