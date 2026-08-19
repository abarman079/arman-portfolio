# Phase 7 motion decisions

## Ownership

- CSS owns static composition, durable responsive states, focus/reduced-motion styles, and the no-JavaScript baseline.
- Motion owns local interaction state: navigation, menus, buttons, project hover/tap feedback, and the existing Capability Gallery controls.
- GSAP + ScrollTrigger own coordinated, route-local scroll choreography: homepage section reveals, eligible flagship stages, and restrained case-study reveals.
- Lenis owns optional wheel smoothing only. It is dynamically loaded on wide, sufficiently tall, fine-pointer devices and is driven by the GSAP ticker; anchors and native routing remain the baseline.
- React Three Fiber remains limited to the Capability Gallery. The hero retains the bespoke Canvas 2D Signal Field to avoid a second WebGL scene and keep its semantic composition independent.

## Dependencies

Verified and installed for this phase: `gsap@3.15.0`, `@gsap/react@2.1.2`, and `lenis@1.3.26`. No transition, cursor, carousel, or additional 3D package was added.

## Eligibility and fallbacks

- Smooth scroll: at least `64.01rem` wide and `40rem` tall, fine pointer, hover support, and no reduced-motion preference.
- Cinematic flagship stages: at least `80rem` wide and `46rem` tall, fine pointer, hover support, and no reduced-motion preference.
- Short viewports, tablets, touch devices, and reduced-motion users keep native document flow with all content visible.
- The mobile menu pauses Lenis while open. Route changes schedule a resize and ScrollTrigger refresh without replacing browser history or navigation.

## Scroll choreography

- Homepage: one hero handoff, selective section-heading reveals, capability handoffs, archive scan line, About media masks, and a closing contact reveal.
- Selected Work: four short project-specific pinned stages on eligible screens, with a sticky sequence rail and restrained media/copy movement. The normal project list is unchanged when ineligible.
- Case studies: no pinning. Hero, section, diagram, media, and metric reveals are scoped to the route and remain readable before hydration.
- No global route transition was introduced. Normal Next.js navigation, direct URLs, anchors, Back, and Forward remain authoritative.

## Lifecycle and performance

- All ScrollTriggers are created in scoped `useGSAP` contexts and reverted on unmount or dependency change.
- Lenis has one animation clock: the GSAP ticker. It removes its ticker callback, observer, listeners, and instance on cleanup.
- The Canvas hero pauses outside the viewport/document visibility and uses its existing reduced-motion/static behavior. Capability WebGL remains demand-driven.
- On a production build, the homepage client manifest increased by approximately 3.2 KB raw while GSAP/ScrollTrigger/Lenis stayed in dynamically requested chunks. The final build report records the exact output used for handoff.

## Transition decision

Project route transitions remain deferred. Phase 7 adds no router interception or experimental transition configuration; the value of reliable navigation exceeds an ornamental cross-route effect at this stage.
