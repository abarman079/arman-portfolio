# Phase 5 design decisions

## Capability gallery

- The four domains are represented by server-rendered cards sourced from `src/content/capabilities.ts` and the verified project records. Every technology and project link is covered by an existing project evidence source.
- The static composition is the product baseline: real Phase 3 project captures, CSS-built technical symbols, project links, and explanatory copy remain complete without JavaScript or WebGL.
- A single lazily loaded React Three Fiber `Canvas` serves four Drei `View` regions. It uses custom procedural symbols for layered systems, interface surfaces, evaluation structure, and dimensional data rather than downloaded models or stock 3D assets.
- The Canvas is an enhancement only for fine-pointer desktop contexts without reduced motion. It mounts near the gallery, caps DPR at 1.5, uses `frameloop="demand"`, stops rendering when the gallery/document is not visible, and is protected by WebGL detection and an error boundary.
- Motion owns the small card lift, pointer-relative media movement, and spring return. Pointer values use refs and CSS custom properties; no React state updates occur per pointer frame.

## Supporting sections

- About now connects product surfaces, backend rules, model evaluation, and data work without adding unverified personal narrative. Confirmed location and centralized profile links are included.
- The media mosaic reuses the publication-safe FrameSignal, Arctic Daze, and SlateDesk captures already recorded in Phase 3 provenance. No new or third-party media was introduced.
- The technology ecosystem groups verified tools by engineering responsibility and links each group back to project evidence instead of presenting a badge wall.
- Featured archive rows now expose one verified technical focus; the additional archive remains intentionally compact.
- The About handoff leads into the existing contact CTA. Contact delivery remains Phase 6 scope.

## Boundaries and fallback

- Homepage sections, project content, archive content, and media markup remain Server Components.
- Client code is limited to the existing Motion card shell, a capability eligibility loader, and the dynamically imported shared Canvas.
- Touch, coarse-pointer, narrow viewport, reduced-motion, missing WebGL, load failure, and JavaScript-disabled experiences use the same complete DOM/CSS presentation. No content exists only in 3D.

## Dependencies

- `three@0.182.0`: renderer, geometry, materials, lighting, and math utilities. This is the newest release before the r183 `Clock` deprecation warning currently emitted by Fiber 9; it remains inside Fiber and Drei's supported peer ranges.
- `@react-three/fiber@9.7.0`: React 19-compatible Canvas and demand-driven render lifecycle.
- `@react-three/drei@10.7.8`: `View`/`View.Port` scissoring for four regions inside one shared Canvas.

No GSAP, Lenis, physics, postprocessing, model-loader, or additional animation dependency was added.
