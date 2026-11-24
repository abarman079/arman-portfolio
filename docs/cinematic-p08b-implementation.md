# P08B — Research case-study migration

## Purpose
Add two fully linked, source-backed case-study routes using the existing validated project collection and shared transition system. This is the content/route slice before P09 unified cinematic scene choreography; it does not add another WebGL engine or change the existing signature rendering. It requires P08A to be installed, verified and committed on `feature/portfolio-v2-cinematic` first. Remote checked before preparation: `9e50714c21006e49da34c29bf30b90fc2f92b452` (P05–P07 committed; P08A patch stored, applied source not yet visible remotely). No production change.

## Inventory
13 validated projects, six case studies, two featured archive entries, five additional archive entries. The original four case-study slugs and their relative order remain. The wall-crack archive entry is promoted rather than duplicated, retaining `wall-crack-detection`. New routes `/work/phishing-website-detection` and `/work/wall-crack-detection` use existing metadata, sitemap, structured data, social card and case-study rendering. The four current homepage story layouts remain supported; the new P08A research scenes link directly to the two routes, so the CCTV-specific story template is never incorrectly used for other research. P09 unifies scene order and visual choreography. Work index count/sequence and archive indices are updated; the metric-context block no longer assumes every research result is from CCTV.

## Evidence and media
`src/content/research-projects.ts` derives exact metric display values from P08A `research-comparisons.ts` (one underlying comparison dataset). Each metric carries model, dataset, split, limitation and evidence ID. Phishing uses the official 168,060-row frozen holdout, not a deployment. The majority baseline is explicitly excluded from the four-model comparison graphics; its zero F1 is explained in the case study. The benign train/test date overlap, prevalence sensitivity and bootstrap dependence limitations remain visible. CrackSAFE uses Phase 8 validation, with best-overlap and clean-image policies explicitly separate; no formal risk certificate or later-phase result is claimed.

Original charts generated from the numeric artifacts (1440 x 900 WebP, no dataset photos or third-party screenshots):
- `public/projects/phishing-website-detection/f1-comparison.webp` and `fpr-comparison.webp` — source `https://github.com/abarman079/phishing-website-detection/blob/main/Results/Notebook%204/metrics/final_test_metrics.csv`.
- `public/projects/wall-crack-detection/phase8-iou.webp` and `phase8-fpr.webp` — source `https://github.com/abarman079/wallCrackWith2datasets/blob/main/Phase8_Threshold_Tuning_Operating_Point/phase8_threshold_policy.json`.

The prior wall-crack archive asset is retained on disk for provenance. All new chart media are original visualizations of aggregate project data, no personal or source-dataset imagery. Readable alternatives are in alt text and the native controls/table on each case study. Source report: https://github.com/abarman079/phishing-website-detection/blob/main/Results/Notebook%204/reports/final_result_values_for_thesis.md .

## Technical design
Reuse existing App Router route and project model, server-first rendering, native links, next/image, existing client comparison islands and existing motion/transition provider. No package, environment, authentication, or framework configuration changes. Current Next.js public documentation: https://nextjs.org/docs/app/api-reference/functions/generate-static-params and https://nextjs.org/docs/app/api-reference/components/image . Accessible complex-image alternatives: https://www.w3.org/WAI/tutorials/images/complex/ . Installed Next.js guides remain the authority for the local pinned version; this change introduces no new framework API.

## Installation safety
Extract package outside repository, run from repository root with `node <path-to-package>/apply-p08b.mjs --check` then `--apply`. The installer validates project identity, feature branch, clean tree, P08A files and unique source anchors before any writes, rejects pre-existing new files, and attempts rollback if a write fails. Review the diff and do not commit until verification succeeds. No force/reset/automatic staging or push.

## Acceptance
Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run test:e2e`. New tests extend the project inventory checks, route and accessibility fixtures, sitemap assertions and interactive research route browser tests. Inspect `/work`, both new routes and homepage research links on desktop and mobile, including keyboard/radio/table interactions, source links, browser history, and reduced motion. The `/work` screenshot baseline may intentionally change because the count and introductory text changed; review actual, expected and diff images before approving only the two work-index snapshots. Do not update selected-work or unrelated snapshots blindly. Full regression and browser visual acceptance remain local gates. Actual frame pacing and automatic 3D are not accepted here.

## Preparation verification record
- All 35 exact text replacement anchors in the eleven unchanged remote source files matched once at the checked feature commit. P08A-only source anchors were checked against the delivered P08A files. The actual local tree is rechecked by the installer.
- Strict TypeScript compilation of the two new records against a reproduced `ProjectRecord` interface passed; Node assertions checked derived metric values, evidence IDs, media indices and asset paths. All five new TS/TSX files passed syntax transpilation. This is not a repository-wide typecheck.
- Generated charts inspected visually; four WebP dimensions verified as 1440 × 900. Source values and operating thresholds checked against the P08A numeric module and repository artifacts.
- Installer dry run, write application, whitespace check and duplicate-application refusal tested on a disposable reconstructed Git fixture. Actual repository integration, full Zod collection parse, Playwright and screenshot acceptance remain pending until local verification.
