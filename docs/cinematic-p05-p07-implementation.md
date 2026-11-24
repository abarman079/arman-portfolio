# P05–P07 — Cinematic opening, first implementation

Baseline: `d59890b` on `feature/portfolio-v2-cinematic`. This is the first production-component slice, not the full cinematic release.

## Scope
- Replace the homepage opening with a server-rendered editorial layout, real name and plain first-person introduction. Preserve the current section anchor, navigation sentinel, work/resume routes and three existing project shortcuts.
- Original layered vector illustration: interface, logic, data. It is a perspective drawing, not WebGL, a real 3D model or a live system. All layers render without JS, and the image is decorative. Later scene-specific 3D/WebGL enhancements remain optional and performance-gated.
- Integrate one reversible GSAP timeline into the existing desktop homepage runtime; it moves the three SVG groups independently with short scrub smoothing. The existing Lenis/GSAP ticker and transition provider remain untouched. The new opening has no additional animation loop, no canvas and no loading gate. Mobile and reduced-motion use the same static artwork and normal scrolling.
- Consume the scoped P04 tokens. Keep existing project routes, hero heading semantics, current contact form, resume and other sections. No package or database changes. The new phishing and CrackSAFE showcases belong to P08–P11, not this slice.

## Apply (Windows PowerShell, from repository root)
1. Confirm the working branch is `feature/portfolio-v2-cinematic` and the working tree is clean before extracting this package.
2. Extract the ZIP into the repo root, retaining paths and replacing the two existing hero files. The runtime patch is in docs. Apply it once: `git apply --check docs/cinematic-p05-p07-runtime.patch` then `git apply docs/cinematic-p05-p07-runtime.patch`. Stop if the check fails.
3. Run `git diff --check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e`. The two new tests target desktop reversibility and reduced-motion fallback. Review actual failures; do not blindly update snapshots. Old hero-specific tests expect three project shortcuts and no initial canvas, both intentionally retained.
4. Run `npm run start` and inspect the homepage at desktop and mobile widths. Scroll slowly, rapidly and in reverse. Capture the new opening and send the test summary and visual feedback. Check real frame pacing later on the 60 Hz and 120 Hz panels, not by assuming Lighthouse measures animation FPS.

## Acceptance
No new dependency, no regression in existing functional routes, keyboard flow, or reduced motion. Name, role, work and resume available on first paint. SVG scene visible without JS. New motion starts only with existing desktop eligibility, never hides content, and reverses as scroll reverses. No high-refresh-rate performance claim until device measurement. The package has been statically reviewed; the actual Next.js build and Playwright tests must run in the owner's environment before commit.
