# Phase 2 design decisions

## Navigation

- The header is a focused Client Component; the root layout, homepage, and hero content remain Server Components.
- At the top of the homepage, the rail spans the content width with minimal surface treatment. After the hero sentinel passes, it contracts into a warm, bordered rail and remains visible.
- Homepage section state uses `IntersectionObserver`; `/work` receives a page-level Work state, while other routes keep `/#section` links without false active states.
- At 56rem and below, a native modal `<dialog>` provides the full-screen menu. It owns focus transfer/return, Escape/cancel handling, body scroll lock, route-close behavior, and desktop-resize recovery.

## Hero and motion

- The hero is a motion-free semantic DOM composition first: asymmetric display type, concise evidence-first copy, primary actions, verified location, project counts, and four engineering-domain labels.
- Motion handles only entrance refinement, the header state transition, active indicators, the menu presentation, and 3–4px fine-pointer magnetic offsets.
- Shared timing and spring values live in `src/lib/motion.ts`. Reduced motion makes state changes immediate, removes entrance translation and magnetism, and freezes the Canvas signal.

## Signal field decision

- The Canvas 2D enhancement is retained. It reads as a routed architectural system diagram rather than a particle or neural-network background, stays visually subordinate to the headline, and has a complete DOM/static composition underneath it.
- The Canvas is a lazy client island with capped device pixel ratio, static mobile/reduced-motion rendering, visibility and document-state pausing, observer/listener cleanup, and no external rendering library.

## CSS and performance boundaries

- Navigation and hero rules are colocated in CSS Modules. `globals.css` retains tokens, base typography/layout, shared primitives, and non-component accessibility foundations.
- Motion is the only Phase 2 dependency. No full-page Client Component, scroll library, WebGL library, or second animation system was introduced.
- Expensive pointer work is limited to fine/hover pointers; Canvas pointer coordinates use refs/local mutable values and do not trigger React renders.
