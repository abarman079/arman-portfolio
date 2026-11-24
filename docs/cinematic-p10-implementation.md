# P10 — Project worlds and case-study reading path

Baseline: `ca99ef92d3bec8e5479261cf8fe38a247bf7af7b`, feature/portfolio-v2-cinematic. This phase changes the six case-study openings only; no changes to project claims, slugs, existing homepage stories, dependencies, or production deployment.

## Art direction

- SlateDesk: technical slate/copper grid with two authentic role-workspace captures.
- FrameSignal: film-strip rhythm, warm gold on charcoal, real decision and public interfaces.
- Arctic Daze: warm linen/mineral stage, full interface-only desktop crop and approved phone capture.
- CCTV: pale blueprint grid, pipeline plus test confusion matrix (not a live surveillance demonstration).
- Phishing: paired chart composition in deep petrol, two measures from the official test.
- CrackSAFE-MRC: mineral drafting surface, paired Phase 8 validation policy charts; distinct thresholds remain stated.

Use original media from validated `ProjectRecord.media`; no simulated UI, stock images, changed metrics, or new licenses. Primary image retains the sole shared-media transition target. Secondary image is lazy-loaded by Next Image; dimensions and responsive sizes are explicit. Image contents remain uncut, with captions on opaque contrast-safe backgrounds. On narrow screens, figures stack in normal document flow. All six scenes remain static under reduced motion or without JS. A decorative light and modest secondary-image translation use the existing case-study GSAP context only. No additional WebGL, pinning, animation clock, opacity fades or clip-path on essential hero content.

Native chapter anchors provide an independent reading route. Research comparisons remain directly accessible. Existing case-study metadata and next-project links are preserved.

## Reference research

- https://tympanus.net/codrops/2026/06/23/podium-building-a-website-where-running-becomes-storytelling/ — media-led transitions, rhythm and restraint.
- https://www.hontran.dev/blog/fromanother-award-winning-creative-agency-website — selective motion/WebGL rather than indiscriminate effects.
- https://nextjs.org/docs/app/api-reference/components/image — explicit dimensions, responsive sizes and preload behavior. Installed Next.js guides were unavailable during package preparation; verify the matching local documentation before applying. No new Image API beyond the existing application is used.
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/ — reversible scrubbed transform timelines; existing GSAP context owns cleanup.

## Acceptance gates

1. Review planned file list and clean baseline. Read installed Next.js Image guide.
2. Lint, typecheck, unit tests, build, Playwright. New tests: six desktop routes with image loading, chapter targets and scoped accessibility; forward/reverse scroll; touch flow; reduced-motion static behavior (nine tests).
3. Inspect six case-study openings at 1440px and 390px, verify captions and complete media, test chapter jumps and forward/back navigation. Check motion at actual refresh rate later in P14. Preserve existing screenshot snapshots unless a specifically reviewed intentional change warrants replacement.
4. Commit only after all gates pass. No deployment to main in P10.

Local package checks do not replace the integrated Next.js build, actual WebGL/browser checks or visual review.
