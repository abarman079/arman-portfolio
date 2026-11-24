# P08A — Real 3D signature and measured research scenes

## Scope and rationale
This is the first implementation slice of P08–P11, not the completion of the cinematic redesign. It extends the accepted P05–P07 hero, retains the four published case studies and existing routes, and introduces two evidence-backed, reusable research comparisons. The new flagship records and their case-study routes require a separate migration because the current schema, UI, and tests enforce a fixed inventory and flagship ordering. No package additions, dependency updates, env changes, secrets, or production deployment are involved.

- Real Three.js geometry: bevelled plates, technical traces, fasteners, interface components, physically based materials, directional and hemisphere lighting, procedural contact shadow, camera orbit, separation and pointer response. No external model or texture downloads. The illustration remains the first paint. The optional desktop control loads 3D only on request; this is a controlled performance gate, not the eventual automatic movie-like experience. Touch, smaller screens, reduced motion, unavailable WebGL2, and context loss retain the illustration. One frame is scheduled on relevant input; the renderer rests when the pose settles or the scene is offscreen. DPR capped at 1.5. All listeners, observers, geometry, material, and renderer resources are cleaned up. The existing SVG motion remains owned by GSAP; the 3D renderer owns only its own scene transforms.
- Research: phishing AP/F1/MCC/FPR comparison across four learned models, and crack segmentation comparison between best-overlap and false-positive-aware thresholds. Interactive controls are native radios. Accessible HTML tables retain all values, metric scales are explicit, and the selected best/lowest values are labeled, not just colored. Both comparisons are source-linked, with limitations displayed in the same scene. CrackSAFE-CP is marked in progress, dated to its documented status.

## Sources and implementation references
- https://nextjs.org/docs/app/guides/lazy-loading
- https://nextjs.org/docs/app/getting-started/server-and-client-components
- https://threejs.org/docs/pages/WebGLRenderer.html
- https://threejs.org/manual/pages/how-to-dispose-of-objects.html
- https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/webglcontextlost_event
- https://github.com/abarman079/phishing-website-detection/blob/main/Results/Notebook%204/metrics/final_test_metrics.csv
- https://github.com/abarman079/phishing-website-detection/blob/main/Results/Notebook%204/reports/final_result_values_for_thesis.md
- https://github.com/abarman079/wallCrackWith2datasets/blob/main/Phase8_Threshold_Tuning_Operating_Point/phase8_threshold_policy.json
- https://github.com/abarman079/wallCrackDetection-CP/blob/main/docs/RESEARCH_STATUS.md

## Verified locally in preparation environment
- TypeScript syntax/transpilation checked for the authored TS/TSX files; no syntax diagnostics. Pure motion and evidence modules compiled with strict TypeScript and executed through Node assertions. This is not a full repository typecheck.
- Numerical data checked against the CSV and policy JSON read directly from GitHub. The test rows, classes, selected model values, thresholds, and 98%-of-best-IoU constraint agree. The displayed percentages are rounded to two decimals; the underlying values retain their source precision.
- Equal-time exponential damping produced the same values at simulated 60, 90, 120, 144 and 240 Hz. This is mathematical frame-rate independence, not measured renderer FPS.
- Selected new text/background pairs tested: dark scene primary 12.17:1, secondary 10.00:1, accent 7.46:1; light scene primary 13.02:1, secondary 6.22:1, accent 6.69:1. Browser Axe testing remains required.
- Full Next.js/React integration, actual WebGL rendering, actual browser accessibility, screenshots and performance are not yet accepted. The preparation environment did not have the repository's installed dependencies. A standalone Chromium preview timed out. Do not treat that as a passed visual test.

## Application
Finish the pending P05–P07 accessibility fix first. Verify the full suite before applying this new patch, and commit the prior phase separately if not yet committed. Copy the supplied patch to the repository root (do not extract into or replace the source directories), then run `git apply --check --whitespace=error cinematic-p08a.patch` followed by `git apply --whitespace=error cinematic-p08a.patch`. The patch is intended for the P05–P07 hero and the existing homepage at d59890b; if the check fails, stop rather than forcing it. Inspect `git status --short`, `git diff --check`, and `git diff --stat`; new files are untracked until staged. Review installed Next.js documentation as required by AGENTS.md before making framework changes.

## Acceptance
Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e`. The added test cases cover mathematical motion, numerical evidence, unavailable WebGL2, conditional 3D lifecycle, research metric switches and tables, mobile overflow, reduced motion, and scoped Axe scans. A successful fallback test does not prove the actual GPU scene renders. Existing screenshot assertions may require investigation if the hero's dimensions change; never update snapshots blindly. Manually start production, inspect the 3D scene, move pointer, scroll forward/back, toggle illustration, resize, use keyboard, and check research sections at mobile and desktop widths. Use DevTools Performance to measure actual frame delivery and memory. Capture a screenshot and the test output; do not push until reviewed. Production SEO remains a separate gate.

## Next slice
P08B will migrate flagship records and ordering with all dependent renderers, metadata, route and test updates. P09–P11 will extend these evidence visualizations into complete project scenes, richer case studies and transitions, and the research gallery. Auto-enabling 3D, scene-to-scene camera movement, and richer media will be decided from actual GPU and performance results rather than assumed.
