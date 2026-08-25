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
- Archive-project imagery was omitted in Phase 3. Phase 10B added the publication-safe sources documented below.

## Phase 10B archive media

Decision date: 2026-08-25

| Project | Production asset | Exact source | What it demonstrates | Publication decision |
| --- | --- | --- | --- | --- |
| Face-Based Anomaly Detection | `public/projects/face-based-anomaly-detection/model-comparison.webp` | `results/figures/figures/23_final_four_model_performance_comparison.png` in `abarman079/face-based-anomaly-detection` at `9bb3b6a0d880f12f4b3cba3623c4c5bf785ef487` | The repository's final four-model comparison | Repository research figure; no face samples are shown. |
| Retail Data Warehouse & BI | `public/projects/retail-data-warehouse-bi/sales-dashboard.webp` | `reports/screenshots/Power BI Report Screenshots/SMP Retail Sales Performance Dashboard.png` in `abarman079/data-warehousing` at `d19b9b4d4e6dca7ad2fef44107b0f2d058a39a94` | The documented Power BI sales-performance report | Repository-provided BI output; reviewed for publication and retained at readable resolution. |
| Wall Crack Detection | `public/projects/wall-crack-detection/model-tradeoff.webp` | `Phase-5 comapre/phase5_tradeoff_scatter.png` in `abarman079/wall-crack-detection` at `ece41b1f43082e2978fa9ba979909f660a090a35` | Model accuracy, speed, and parameter trade-offs | Repository research chart; no source-dataset imagery is shown. |
| TravelEase | `public/projects/travelease/public-home.webp` | Public capture of `https://travelease.infinityfree.me/index.php`, 2026-08-25, 1440×900 viewport; repository at `e6f3da20865e3b584d58925f1c0705e24dfe2b3a` | The public travel-planning interface | Captured from the owner repository's public deployment. Used as interface evidence, not as proof of production commerce. |
| RoleBoard RBAC | `public/projects/roleboard-rbac/permission-dashboard.webp` | Local capture of `abarman079/role-based-access-control` at `d15358f5c68376038266ed9fcb7156749de66e22`, seeded with repository-provided demo data, 2026-08-25 | Role and permission administration in the running application | Owner-authored UI run locally from the repository; no external media. |
| PulseFlow | `public/projects/pulseflow/public-home.webp` | Public capture of `https://pulseflow.great-site.net/index.php`, 2026-08-25, 1440×900 viewport; repository at `d430a1765ce3baeea2e73aa598e267a8e80210a1` | The public hospital-workflow landing interface | Captured from the owner repository's public deployment; no patient records are shown. |
| EWU FUB Energy Monitor | `public/projects/ewu-fub-energy-monitor/building-dashboard.webp` | Local capture of `abarman079/ewu-fub-energy-monitor` at `f4e38cfca9b15c3dc4ec717d8fdac132ac63ed5e`, using the repository's simulated telemetry path, 2026-08-25 | Building-level monitoring, energy totals, and simulated sensor state | The public PythonAnywhere URL was only a hosting placeholder, so the real repository application was run locally. Caption and alt text identify simulated telemetry. |
| EduConsult Pro | `public/projects/educonsult-pro/custom-plugin-source.webp` | Public GitHub source view of `plugin/educonsult-portal/educonsult-portal.php` in `abarman079/eduConsult-Pro` at `bc1523af26408330c114fe94137067d0edd7cba9`, 2026-08-25 | The custom WordPress plugin registration and content-model code | Source view chosen because no safe custom-UI screenshot exists. Vendored Astra media and theme artwork were excluded. |

All Phase 10B archive files are proportional WebP encodes of the cited source or capture. No stock, external, AI-generated, or fabricated project imagery was used. No custom technical cover was necessary.

## Still needed from the owner

- Permission/credit confirmation is still required before any Arctic Daze product/editorial photography is shown in later case studies.
- Dataset attribution/license confirmation is still required before any CCTV source frames are shown.
- Higher-resolution SlateDesk captures are optional only if future case-study layouts require crops beyond the current repository images.
- A custom EduConsult interface capture remains optional; the published source-code view is accurate and sufficient for the compact archive treatment.
