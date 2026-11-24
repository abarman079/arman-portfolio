# P09 — Cinematic scene choreography (first continuous passage slice)

Baseline: P08A remote commit `b5ec046`; P08B local implementation and acceptance required. No package updates. Install only on a clean `feature/portfolio-v2-cinematic` branch after P08B is committed. This package adds two original CSS-perspective chapter passages: architectural frames between hero and selected work, and concentric evaluation rings between the graphics lab and measured research. The design is explanatory abstract art, not project evidence. Scene titles and native anchors remain useful with no JavaScript. Both scenes use one existing GSAP context, not another loop. Existing 3D hero, shader lab, research controls, project stories, page transitions and SEO remain in place. WebGL remains optional; P14 hardware measurements are needed before deciding on automatic hero activation. No pins or forced scrolling introduced.

## Motion ownership

Existing `HomepageMotionShell` desktop eligibility controls loading of `HomepageMotionRuntime`. `choreographPassages` creates its timelines synchronously within `useGSAP`, so cleanup reverts transforms when the runtime unmounts. GSAP only controls decorative plane/camera transforms and a decorative progress line; CSS controls static styles and focus. No per-frame layout measurement, state update, timer, or new canvas. Numeric scrub (0.25 s) is reversible. Existing Lenis clock remains unchanged. Small/touch/reduced-motion screens see a static composition in normal flow. The decorative art is hidden from assistive technology, not the content. Focus and links are independent of animation progress.

## Sources reviewed

- Existing repository homepage, motion runtime, smooth-scroll runtime, hero enhancement and three/signature-3d-runtime.ts.
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/ — scrub and refresh lifecycle.
- https://gsap.com/docs/v3/GSAP/gsap.context()/ — context-owned cleanup.
- https://web.dev/articles/animations-guide — transform-first animation.

## Acceptance

Run lint, typecheck, unit tests, build and entire E2E suite. New tests: desktop forward/reverse progress and hash links, mobile static navigation/reflow, reduced motion static content. Check browser console, test desktop reverse/rapid scroll, direct hash entry, keyboard navigation and focus, 390px/mobile and 200% zoom. Verify both existing research routes. Review any visual snapshot changes individually, not blindly. Compare clean Lighthouse measurements later alongside actual 60/120 Hz traces; no frame-rate guarantee. No production merge. P10 project worlds will use actual project media with coordinated scene lighting/composition and case-study entry continuity. P09 is a first integrated choreography slice rather than a final full-site film.
