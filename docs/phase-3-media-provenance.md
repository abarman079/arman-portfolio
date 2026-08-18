# Phase 3 media provenance

Production decision date: 2026-08-18

All retained assets are local WebP files rendered through `next/image`. Processing was limited to privacy/licensing crops, proportional resize, and WebP encoding; no content was generated or composited into a fake product screen.

| Project | Production asset | Exact source | What it demonstrates | Publication decision |
| --- | --- | --- | --- | --- |
| SlateDesk | `public/projects/slatedesk/admin-operations-overview.webp` | `docs/screenshots/02-admin-dashboard.png` in `abarman079/slatedesk` at `296cd7a` | Admin workspace and the breadth of the academic operations model | Repository-provided, owner-created UI. The left demo-identity sidebar was cropped out before publication. |
| SlateDesk | `public/projects/slatedesk/teacher-assignment-ledger.webp` | `docs/screenshots/04-teacher-assignment-ledger.png` in `abarman079/slatedesk` at `296cd7a` | Teacher assignment state, submission count, and workflow controls | Repository-provided, owner-created UI. The left demo-identity sidebar was cropped out before publication. |
| FrameSignal | `public/projects/framesignal/signal-card-decision-anatomy.webp` | Public capture of `https://frame-signal.vercel.app/`, 2026-08-18, 1440Ã—900 viewport | The Signal Card and decision-first product anatomy | Captured from the verified deployment. The retained frame contains no movie poster, still, provider logo, or third-party editorial artwork. |
| FrameSignal | `public/projects/framesignal/decision-first-home.webp` | Public capture of `https://frame-signal.vercel.app/`, 2026-08-18, 1440Ã—900 viewport | Verdict-first framing, spoiler boundaries, and public information architecture | Captured from the verified deployment. The retained frame contains interface typography and project-authored content only. |
| Arctic Daze | `public/projects/arctic-daze/editorial-home-desktop.webp` | Interface crop captured from `https://arctic-daze-kappa.vercel.app/`, 2026-08-18, 1440Ã—900 viewport | Editorial navigation, type hierarchy, and desktop product positioning | The crop stops before the hero photograph; no product/editorial photography is retained. |
| Arctic Daze | `public/projects/arctic-daze/editorial-home-mobile.webp` | Public capture of `https://arctic-daze-kappa.vercel.app/`, 2026-08-18, 390Ã—844 viewport | Responsive navigation, mobile type scale, and product actions | No third-party photography is visible in the retained viewport. |
| CCTV Violence Anomaly Detection | `public/projects/cctv-violence-detection/research-system-architecture.webp` | `results/figures/figure_14_system_architecture.png` in `abarman079/cctv-violence-anomaly-detection` at `b8df1af` | The documented offline input, preprocessing, model, evaluation, and alert pipeline | Repository-provided research figure; no sample CCTV frame is shown. |
| CCTV Violence Anomaly Detection | `public/projects/cctv-violence-detection/mobilenetv2-test-confusion-matrix.webp` | `results/figures/mobilenetv2_transfer_confusion_matrix.png` in the same repository/commit | Test-split class outcomes for one documented transfer-learning model | Repository-provided research chart; caption and alt text retain the frozen 750-image test context. |

## Intentionally rejected

- SlateDesk login and full-sidebar screenshots: redundant and contain unnecessary demo identity/email details.
- FrameSignal movie posters, stills, provider marks, and authenticated CMS screens: copyright or access-context risk; not needed to explain the product UI.
- Arctic Daze committed editorial/product photography and the uncropped desktop hero: republication rights are not confirmed.
- CCTV sample-image and alert-prediction figures: potentially graphic/source-dataset media; the research can be explained with architecture and evaluation material.
- Archive-project imagery: omitted in Phase 3 because no image was both necessary and clearly safer than the evidence-backed text presentation.

## Still needed from the owner

- Permission/credit confirmation is still required before any Arctic Daze product/editorial photography is shown in later case studies.
- Dataset attribution/license confirmation is still required before any CCTV source frames are shown.
- Higher-resolution SlateDesk captures are optional only if future case-study layouts require crops beyond the current repository images.
