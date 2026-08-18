# Portfolio V2 project evidence manifest

Audit date: 2026-08-18

This manifest records what may be represented as fact in Portfolio V2. A repository README, source/configuration file, committed result artifact, verified deployment, or later owner confirmation must support every public claim. Repository metadata alone is sufficient for identity and canonical links, but not for outcomes, roles, dates, or production status.

Status vocabulary:

- **Verified:** supported by a linked public source or inspected repository artifact.
- **Owner confirmation required:** plausible or present in legacy material, but not safe to publish yet.
- **Omit:** no reliable source currently exists.

## Flagship projects

### SlateDesk

| Field | Evidence status |
| --- | --- |
| Canonical name | **Verified:** SlateDesk |
| Repository | **Verified:** <https://github.com/abarman079/slatedesk> |
| Live URL | **Omit:** the repository does not publish one. |
| Tier / type | **Verified:** flagship; full-stack web application / backend systems |
| Technologies | **Verified:** Next.js, React, TypeScript, TanStack Query, React Hook Form, Zod, Lucide, Recharts, .NET 10, ASP.NET Core, PostgreSQL, and xUnit. |
| Functionality | **Verified:** assignment/submission management for Admin, Teacher, and Student roles; academic setup; assignment lifecycle; submission/review/grading flows; results views. |
| Architecture | **Verified:** modular monolith with a Next.js web application and Domain/Application/Infrastructure/API backend separation; versioned API; backend authorization; short-lived JWT plus HttpOnly refresh-token rotation; deadline background processing; PostgreSQL optimistic concurrency using `xmin`; targeted automated tests. |
| Metrics | **Omit:** no product/adoption/performance metric is published. |
| Reusable assets | Seven committed UI screenshots under `docs/screenshots/`; `docs/architecture.md`. |
| Missing material | Optional polished architecture export and any additional responsive screenshots. Existing screenshots are sufficient for an initial case study if their resolution passes visual QA. |
| Owner confirmation | Personal role wording, project timeline/year, recruitment context wording, challenges, results, and lessons. |
| Media/licensing | Screens appear project-owned; confirm they contain no private test data before republication. |

Primary evidence:

- [Repository README](https://github.com/abarman079/slatedesk#readme)
- [Architecture documentation](https://github.com/abarman079/slatedesk/blob/main/docs/architecture.md)
- [Committed screenshots](https://github.com/abarman079/slatedesk/tree/main/docs/screenshots)
- Backend and frontend manifests/source in the repository

### FrameSignal

| Field | Evidence status |
| --- | --- |
| Canonical name | **Verified:** FrameSignal |
| Repository | **Verified:** <https://github.com/abarman079/FrameSignal> |
| Live URL | **Verified:** <https://frame-signal.vercel.app/> returned HTTP 200 during the audit and matches repository metadata. |
| Tier / type | **Verified:** flagship; full-stack editorial/product platform |
| Technologies | **Verified:** Next.js, React, TypeScript, PostgreSQL through Supabase, Supabase Auth/RLS/Storage, and Vercel. |
| Functionality | **Verified:** verdict-first movie guidance, explicit spoiler boundaries, ending guides, evidence-aware theories, mood discovery, Watch Signal Generator, legal viewing guidance, and a protected editorial/admin surface. |
| Architecture | **Verified:** public and admin route groups; primarily server-rendered public content; protected CMS workflows; server-side form handling; database authorization through RLS; managed media workflow with alt/credit/license metadata; local fallback content. |
| Metrics | **Omit:** internal Lighthouse or QA records are not product outcome claims and should not become marketing metrics without a fresh controlled audit. |
| Reusable assets | Extensive architecture, security, editorial, SEO, media, and QA documentation. No curated repository screenshot set was found. |
| Missing material | New desktop/mobile captures of the live homepage, Signal Card, spoiler boundary, Watch Signal, and protected CMS only if a safe demo/admin account is available. |
| Owner confirmation | Personal role, timeline/year, challenges, results, lessons, and whether admin imagery may be shown. |
| Media/licensing | Movie posters/stills and provider art may be copyrighted. Capture UI structure with approved/credited media or use project-owned compositions; preserve stored credits and licenses. |

Primary evidence:

- [Repository README](https://github.com/abarman079/FrameSignal#readme)
- [Project case study](https://github.com/abarman079/FrameSignal/blob/master/docs/project-case-study.md)
- [Security architecture checkpoint](https://github.com/abarman079/FrameSignal/blob/master/docs/pre-main-design-security-architecture-checkpoint.md)
- [Media workflow documentation](https://github.com/abarman079/FrameSignal/blob/master/docs/media-assets-storage-implementation.md)
- [Verified deployment](https://frame-signal.vercel.app/)

### Arctic Daze

| Field | Evidence status |
| --- | --- |
| Canonical name | **Verified:** Arctic Daze |
| Repository | **Verified:** <https://github.com/abarman079/arctic-daze> |
| Live URL | **Verified:** <https://arctic-daze-kappa.vercel.app/> returned HTTP 200 during the audit and matches repository metadata. |
| Tier / type | **Verified:** flagship; frontend/product commerce experience |
| Technologies | **Verified:** Next.js, React, TypeScript, Motion, GSAP, Lenis, Supabase, and Lucide React, based on the package manifest. |
| Functionality | **Verified:** presents men’s fashion/lifestyle products sourced from Malaysian stores for customers in Bangladesh; product browsing, category/editorial presentation, account/saved-product surfaces in source, and Facebook-guided ordering. |
| Architecture | **Verified only at a high level:** Next.js App Router application with reusable components, Supabase integration, and motion libraries. Deeper architecture claims require source-specific evidence before publication. |
| Metrics | **Omit:** no sales, users, conversion, catalog-size, or performance outcome is published. |
| Reusable assets | Fifteen PNG files under `public/editorial/`, including hero, category, apparel, shoe, and fragrance imagery. |
| Missing material | New desktop/mobile UI captures; documented product flow; optional short interaction capture. |
| Owner confirmation | Personal role, timeline/year, business relationship, production status, challenges, results, lessons, and which account/saved-product features are complete. |
| Media/licensing | Rights for all product/editorial photography must be confirmed before copying it into Portfolio V2. A public deployment does not establish republication rights. |

Primary evidence:

- [Repository](https://github.com/abarman079/arctic-daze)
- [Package manifest](https://github.com/abarman079/arctic-daze/blob/main/package.json)
- [Editorial asset directory](https://github.com/abarman079/arctic-daze/tree/main/public/editorial)
- [Verified deployment](https://arctic-daze-kappa.vercel.app/)

### CCTV Violence Detection

| Field | Evidence status |
| --- | --- |
| Canonical name | **Verified:** CCTV Violence Anomaly Detection |
| Repository | **Verified:** <https://github.com/abarman079/cctv-violence-anomaly-detection> |
| Live URL | **Omit:** none published. |
| Tier / type | **Verified:** flagship; machine learning / computer vision research |
| Technologies | **Verified:** Python, Jupyter Notebook, TensorFlow/Keras, MobileNetV2 transfer learning, and scikit-learn models. |
| Functionality | **Verified:** binary violence/non-violence image classification; comparison of MLP, MobileNetV2, KNN, Random Forest, Logistic Regression, Linear SVM, small CNN, and Isolation Forest; prediction/alert demonstration artifacts. |
| Architecture | **Verified:** balanced working subset of 5,000 images (2,500 per class), 160×160 processing, frozen train/validation/test split of 3,500/750/750, reproducible result tables and figures. This is an offline research pipeline, not a production CCTV service. |
| Metrics | **Verified with required context:** the repository reports the MLP as strongest on the documented test split: 94.93% accuracy, 94.23% precision, 95.73% recall, 94.97% F1, 99.10% ROC-AUC, 99.14% average precision, and 3.26 s reported training time. These values must never appear without the dataset/split/model context. |
| Reusable assets | Class distribution, samples, comparison plots, curves, confusion matrices, alert predictions, architecture figure, CSV result tables, notebook, and final report. |
| Missing material | No new screenshot is required; select a small readable set of existing research figures. |
| Owner confirmation | Personal role, academic context, timeline/year, exact data-source attribution, challenges, results interpretation, and lessons. |
| Media/licensing | Confirm the violence dataset’s license permits public display of sample frames. Prefer charts/architecture and non-graphic samples; avoid identifiable or disturbing imagery. |

Primary evidence:

- [Repository README](https://github.com/abarman079/cctv-violence-anomaly-detection#readme)
- [Final comparison table](https://github.com/abarman079/cctv-violence-anomaly-detection/blob/main/results/tables/final_model_comparison.csv)
- [Split summary](https://github.com/abarman079/cctv-violence-anomaly-detection/blob/main/results/tables/split_summary.csv)
- [Research figures](https://github.com/abarman079/cctv-violence-anomaly-detection/tree/main/results/figures)

## Featured archive

### Face-Based Anomaly Detection

- **Repository:** <https://github.com/abarman079/Face-based-anomaly-detection>
- **Tier / type:** archive; machine learning / computer vision research.
- **Verified technologies:** Python, Jupyter, LFW, FaceNet embeddings, KNN, Isolation Forest, MLP, and convolutional autoencoder.
- **Verified functionality/architecture:** 512-dimensional FaceNet embeddings from preprocessed face images; supervised and anomaly-detection model comparison; threshold selection, PCA visualization, reconstruction analysis, and reproducible tables/figures.
- **Verified metrics with context:** the repository reports the MLP at 98.82% accuracy/precision/recall/F1 and 99.38% ROC-AUC in its documented experimental setup. Do not publish the numbers without the label construction, split, and research-only limitation.
- **Reusable assets:** 28+ evaluation/architecture figures, tables, notebook, and final report.
- **Missing/confirmation:** role, academic context, timeline, exact dataset-label methodology summary, and lessons. Ethical/biometric limitations must accompany any public presentation.
- **Sources:** [README](https://github.com/abarman079/Face-based-anomaly-detection#readme), [final results](https://github.com/abarman079/Face-based-anomaly-detection/blob/main/results/tables/tables/24_final_all_four_model_results.csv), and [figures](https://github.com/abarman079/Face-based-anomaly-detection/tree/main/results/figures/figures).

### Retail Data Warehouse & BI

- **Repository:** <https://github.com/abarman079/Data-Warehousing>
- **Tier / type:** archive; data engineering / business intelligence.
- **Verified technologies:** SQL Server/SSMS, Power BI, Power Query, and DAX.
- **Verified functionality/architecture:** Online Retail II analysis, cleaning/transformation, dimensional warehouse with a sales fact and date/time/customer/product/category/invoice/country dimensions, KPI dashboards, and report pages.
- **Metrics:** omit business outcomes; dashboard values describe the dataset, not a real client result.
- **Reusable assets:** ERD/snowflake diagrams, Power Query screenshots, Power BI report pages, a PBIX file, and report document.
- **Missing/confirmation:** role, academic context, timeline, specific engineering decisions, and lessons. No published Power BI Service URL was found.
- **Media/licensing:** dataset attribution/license must be shown when dataset-derived values are presented.
- **Sources:** [README](https://github.com/abarman079/Data-Warehousing#readme), [data-model figures](https://github.com/abarman079/Data-Warehousing/tree/main/docs/figures), and [report screenshots](https://github.com/abarman079/Data-Warehousing/tree/main/reports/screenshots/Power%20BI%20Report%20Screenshots).

### Wall Crack Detection

- **Repository:** <https://github.com/abarman079/wallCrackWith2datasets>
- **Verified live demo:** <https://huggingface.co/spaces/abArman6979/Wallcrack> is published in repository metadata; its health and final behavior must be rechecked before V2 links to it.
- **Tier / type:** archive; machine learning / semantic segmentation research.
- **Verified technologies/models:** U-Net, DeepLabV3+, and U-Net++ with EfficientNet-B3 encoders.
- **Verified functionality/architecture:** multidataset crack segmentation, frozen split evaluation, empty-mask-aware metrics, crack-only overlap, false-positive diagnostics, threshold tuning, resolution sensitivity, and qualitative overlay/worst-case analysis.
- **Metrics:** do not publish a headline value until the final comparison table and evaluation resolution/threshold are bound to the exact number. It is verified only that the repository compares the three model families and identifies U-Net++ as strongest in its final crack-only overlap analysis.
- **Reusable assets:** 70+ EDA, training, comparison, threshold, overlay, and diagnostic figures.
- **Missing/confirmation:** role, academic context, timeline, exact final metric selection, dataset licenses, deployment scope, and lessons.
- **Sources:** [README](https://github.com/abarman079/wallCrackWith2datasets#readme), [final comparison figures](https://github.com/abarman079/wallCrackWith2datasets/tree/main/Phase-5%20comapre), and [threshold-tuning figures](https://github.com/abarman079/wallCrackWith2datasets/tree/main/Phase8_Threshold_Tuning_Operating_Point).

## Additional archive

### TravelEase

- **Repository:** <https://github.com/abarman079/travelease-webApp>
- **Live URL:** repository metadata publishes <https://travelease.infinityfree.me/index.php>; health, HTTPS behavior, and content must be rechecked before publication.
- **Verified type/technologies:** archive; PHP, MySQL, PDO, Bootstrap, JavaScript, PHPMailer, and server-rendered role-based web application.
- **Verified functionality:** Traveler, Agent, and Admin workflows; trip discovery, booking, **mock/demo payment**, itinerary, notifications, support, and SMTP email.
- **Architecture:** traditional PHP/server-rendered application with session authentication and role-specific areas. Do not describe it as a real payment integration.
- **Assets:** no reusable UI screenshot set; only a favicon-like image was found.
- **Missing/confirmation:** safe current screenshots, role, timeline, demo-data/privacy status, deployment health, challenges, and lessons.
- **Sources:** [README](https://github.com/abarman079/travelease-webApp#readme), [repository](https://github.com/abarman079/travelease-webApp), and repository metadata.

### RoleBoard RBAC

- **Repository:** <https://github.com/abarman079/roleboard-rbac-task>
- **Live URL:** omit; none published.
- **Verified type/technologies:** archive; Next.js, React, JavaScript, Prisma, SQLite, and Tabler Icons.
- **Verified functionality/architecture:** post/comment management with Super Admin, Moderator, Regular User, and Guest permission demonstrations; API routes enforce permissions. The role switcher is a demo and **is not real authentication**.
- **Metrics:** omit.
- **Assets:** no project screenshots; only starter public SVGs were found.
- **Missing/confirmation:** screenshots, role/task context suitable for publication, timeline, decisions, and lessons.
- **Sources:** [README](https://github.com/abarman079/roleboard-rbac-task#readme) and [repository](https://github.com/abarman079/roleboard-rbac-task).

### PulseFlow

- **Canonical name:** **Verified:** PulseFlow — Emergency Hospital Management.
- **Repository:** <https://github.com/abarman079/PulseFlow-emergency-hospital-management->
- **Live URL:** repository metadata publishes `http://pulseflow.great-site.net/index.php`; do not publish until reachability, HTTPS/security, and demo-data safety are rechecked.
- **Verified type/technologies:** archive; PHP application with HTML/CSS/JavaScript assets. Do not add a database technology to public copy until its configuration/schema is separately verified.
- **Verified functionality/architecture:** repository modules exist for patient, nurse, doctor, admin, authentication, dashboards, database, and AJAX; committed hospital icons and brand marks exist.
- **Metrics:** omit.
- **Assets:** PulseFlow logos and domain icons are reusable only if owner-created/licensed; no curated UI screenshot set.
- **Missing/confirmation:** safe screenshots, database/runtime description, feature completeness, role, timeline, deployment health, data/privacy status, challenges, and lessons.
- **Sources:** [repository](https://github.com/abarman079/PulseFlow-emergency-hospital-management-) and its committed directory/source tree. The repository currently has no sufficient README for deeper claims.

### EWU FUB Energy Monitor

- **Repository:** <https://github.com/abarman079/EWU_FUB_EnergyMonitor>
- **Live URL:** repository metadata publishes <https://abarman123.pythonanywhere.com/>; recheck before publication.
- **Verified type/technologies:** archive; Flask, SQLite, APScheduler, HTML/CSS/JavaScript, and Chart.js.
- **Verified functionality/architecture:** schedule-aware **simulated** building-energy telemetry, persistent monitoring controls, room/status views, API endpoints, dashboards, and background collection. It is not verified as a physical IoT deployment.
- **Metrics:** omit.
- **Assets:** no committed image/chart assets were found; the live UI must be captured if a visual is required.
- **Missing/confirmation:** role, academic context, timeline, deployment health, intended simulation framing, challenges, and lessons.
- **Sources:** [README](https://github.com/abarman079/EWU_FUB_EnergyMonitor#readme), [repository](https://github.com/abarman079/EWU_FUB_EnergyMonitor), and repository metadata.

### EduConsult Pro

- **Repository:** <https://github.com/abarman079/EduConsult-Pro>
- **Live URL:** omit; none published.
- **Verified type/technologies:** archive; local WordPress/PHP project using an Astra child theme and custom plugin code. WooCommerce/Astra compatibility files exist, but their presence alone is not proof of a completed commerce workflow.
- **Verified functionality/architecture:** custom theme/plugin structure and education-consultancy-specific WordPress development can be stated only at the level demonstrated by the custom source. Avoid attributing vendored Astra capabilities as personally built features.
- **Metrics:** omit.
- **Assets:** the repository contains a large amount of vendored Astra theme material but no approved curated product screenshot set.
- **Missing/confirmation:** exact custom features, screenshots, role, timeline, local/demo status, plugin ownership, challenges, and lessons.
- **Media/licensing:** Astra/vendor assets retain third-party licenses and must not be repurposed as Portfolio V2 project imagery.
- **Sources:** [repository](https://github.com/abarman079/EduConsult-Pro) and its `theme/educonsult-child` custom/vendored source tree.

## Claims explicitly withheld

The audit did not establish the following as publishable facts:

- Exact project years or timelines.
- “My role” descriptions for any flagship.
- Employment, clients, awards, user counts, revenue, conversion, adoption, or business results.
- Current availability wording.
- Production readiness of SlateDesk, CCTV, Face Anomaly, Retail BI, RoleBoard, PulseFlow, Energy Monitor, or EduConsult Pro.
- A safe public admin account for FrameSignal.
- Rights to republish Arctic Daze product photography or FrameSignal movie media.
- The legacy claim of “20 GitHub repos” or any fixed repository count.
- Legacy project summaries and live URLs unless independently listed above.
