# Phase 0 repository audit

Audit date: 2026-08-18  
Scope: read-only review of the tracked Next.js application and ignored `reference/legacy/` material before Portfolio V2 implementation.

## Current tracked application

- Git branch: `main`.
- The tracked application is the unmodified Create Next App starter. It still renders the default Next.js page and default metadata.
- Runtime dependencies are limited to `next@16.3.1`, `react@19.2.8`, and `react-dom@19.2.8`.
- Development dependencies are the Create Next App TypeScript, ESLint, and Tailwind CSS v4 baseline. No Portfolio V2 dependency has been installed.
- Available scripts are `dev`, `build`, `start`, and `lint`.
- `next.config.ts` contains no enabled options or experiments.
- TypeScript has `strict: true` and `noEmit: true`. `allowJs: true` is a starter default to reconsider in Phase 1; it is not changed in Phase 0.
- `src/app/layout.tsx`, `src/app/page.tsx`, and `src/app/globals.css` are starter files, not Portfolio V2 architecture.
- The tracked `public/` directory contains only Create Next App SVGs. These are obsolete for V2 but are intentionally untouched in Phase 0.
- `.env*`, build output, coverage, TypeScript build info, Vercel state, and `reference/legacy/` are ignored.

## Legacy reference

`reference/legacy/` is preserved and remains ignored by Git. It is evidence/reference material, not a migration base.

The active legacy implementation is:

- `reference/legacy/index.html`
- `reference/legacy/style/main.css`
- `reference/legacy/js/main.js`

It is a Vite application using GSAP, ScrollTrigger, Lenis, Splitting, global CSS, and direct DOM event management. Its content and links can inform verification, but its architecture and presentation should not be copied.

Observed implementation risks that V2 must not inherit:

- Important content begins hidden and depends on animation initialization to become visible.
- Navigation and mobile-menu behavior are managed with global selectors and listeners; the menu does not provide a complete dialog/focus lifecycle.
- A perpetual animation loop, scroll-linked effects, cursor effects, parallax, and multiple global interactions run from one script.
- Project imagery is sourced from generic Unsplash URLs rather than the actual applications.
- The UI relies heavily on glass surfaces, gradients, rounded cards, glow effects, and duplicated CSS overrides.
- Legacy facts include stale positioning, availability language, repository counts, and a broken/mismatched CV path; none are trusted as V2 facts without independent evidence.

The following legacy files are unused Vite starter or abandoned source material:

- `reference/legacy/src/main.js`
- `reference/legacy/src/counter.js`
- `reference/legacy/src/style.css`
- `reference/legacy/src/assets/vite.svg`
- `reference/legacy/src/assets/javascript.svg`

They remain preserved because Phase 0 is non-destructive.

## Baseline decisions for Phase 1

- Keep App Router and Server Components as the default.
- Read the relevant bundled Next.js 16.3 documentation under `node_modules/next/dist/docs/` immediately before implementation.
- Replace starter UI only in Phase 1 after foundation scope is approved.
- Do not add experimental Next.js configuration for View Transitions.
- Add dependencies only at the phase that first has working code or tests requiring them.
- Treat the evidence manifest as the source gate for all public project content.

## Phase 0 non-actions

- No application, package, TypeScript, Next.js, or styling configuration was changed.
- No dependencies were installed or removed.
- No assets were copied, generated, optimized, or deleted.
- No claims were promoted into application content.
