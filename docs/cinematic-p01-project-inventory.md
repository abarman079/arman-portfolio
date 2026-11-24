# Cinematic portfolio — P01 project evidence and editorial inventory

Audit date: 2026-11-24. Portfolio baseline: `299f6a1a16002e28d0ce6a4e41fbf2223b573a80` (security hotfix merged). This is an editorial/evidence planning addendum, not a replacement for the existing project-evidence-manifest, verified-content-model, asset-inventory or media-provenance documents. It does not change published pages.

## Release direction

Show five primary projects on the homepage: FrameSignal, SlateDesk, Phishing Website Detection, CrackSAFE-MRC and Arctic Daze. Retain the existing CCTV case study, accessible from a research gallery and work index. Present CrackSAFE-CP as work in progress. Use a compact secondary project index and an earlier-work archive so that the homepage does not become an endless list of cards. Retain existing route slugs, including `wall-crack-detection`, unless an explicit redirect and regression test accompany a change. The existing four case-study routes remain available. Add new routes only after validated content and approved assets are ready.

## All 34 repositories — disposition

Repository owner: https://github.com/abarman079 . Inventory is based on the repository listing and previously inspected READMEs/file trees, with targeted primary-source rechecks for the new research projects in this phase. It is not a security/code audit of all repositories.

| Repository | Placement | Evidence-backed description / boundary |
|---|---|---|
| FrameSignal | Homepage flagship | Movie decision guidance with spoiler boundaries; Next.js, Supabase/PostgreSQL, protected editorial CMS. Published demo URL in repo; recheck before release. |
| slatedesk | Homepage flagship | Assignment and submission management across Admin, Teacher and Student workspaces; ASP.NET Core API, Next.js frontend and PostgreSQL; backend authorization and concurrency. No confirmed public deployment. |
| phishing-website-detection | Homepage flagship, new | Offline URL vs URL+HTML feature comparison on PhreshPhish v1.0.1; final frozen-model results. Not a deployed phishing prevention tool. |
| wallCrackWith2datasets | Homepage flagship, promoted | CrackSAFE-MRC; multidataset pixel segmentation, controlled model comparison and threshold trade-offs. Phase 8 results below are not field certification; later phase artifacts require separate qualification. |
| arctic-daze | Homepage flagship | Next.js fashion/lifestyle browsing experience; Supabase integration and account surfaces in source. No unverified transaction claims or unapproved photography. |
| cctv-violence-anomaly-detection | Research case study | Offline binary image classification; 5,000 balanced images, 3,500/750/750 splits. No production surveillance claims. |
| wallCrackDetection-CP | Research in progress, new | CrackSAFE-CP; topology, uncertainty, selective prediction and domain shift. No certified FULL benchmark or formal two-risk certificate established in status snapshot. |
| RiceVarietiesBangladesh_Classification_CSE475_Project | Research gallery, new | Supervised baselines and SimCLR, BYOL and DINO experiments; metrics from different protocols must not be directly conflated. |
| Face-based-anomaly-detection | Research gallery | LFW-based anomaly classification using FaceNet embeddings and four model families. Unknown identity is a dataset-defined label, not an indication of wrongdoing. No face gallery. |
| Data-Warehousing | Data showcase | Online Retail II dimensional warehouse, SQL Server, Power Query, DAX and Power BI. No client business outcome claims. |
| EWU_FUB_EnergyMonitor | Supporting | Flask/SQLite room and building energy dashboard with simulated telemetry. Not a physical sensor deployment. |
| roleboard-rbac-task | Supporting | Next.js/Prisma/SQLite permission demonstration. Role switching is a demo, not production authentication. |
| PulseFlow-emergency-hospital-management- | Supporting | PHP hospital-management workflows and SQL artifacts; no production emergency service claim or patient data. |
| travelease-webApp | Supporting | PHP/MySQL travel booking and multi-role itinerary workflows; payment is a demonstration. |
| EduConsult-Pro | Supporting | WordPress custom plugin/child theme and consultancy portal in local development; distinguish custom work from vendor theme. |
| arman-portfolio | Portfolio engineering note | Current and future creative frontend, motion and accessibility architecture; measured performance only with conditions. |
| shopping-for-us | Earlier frontend | HTML/CSS experiment; no invented functionality. |
| barn_house_design | Earlier frontend | HTML/Tailwind layout experiment. |
| fitness_site | Earlier frontend | Responsive HTML/CSS site. |
| flower-shopping | Earlier frontend | HTML/CSS flower-shopping interface. |
| bike_zone | Earlier frontend | HTML/Tailwind interface. |
| g8Gamer | Earlier frontend | HTML/CSS gaming landing page; Figma reference exists. |
| architect_g3 | Earlier frontend | HTML/CSS architecture landing page; Figma reference exists. |
| education_consultancy | Earlier frontend | React app; avoid claims beyond inspected implementation. |
| dev_portofolio | Earlier portfolio | HTML/CSS portfolio iteration. |
| dev_portfolio2024 | Earlier portfolio | HTML/CSS portfolio iteration. |
| developer_portfolio | Earlier portfolio | HTML/CSS portfolio iteration. |
| CSE366_Lab | Optional experiments | Python A* and IDA* lab implementations. |
| cse412 | Omit prominent placement | Small HTML/CSS repository. |
| test-item | Omit prominent placement | Small HTML/CSS test. |
| abarman079 | Profile infrastructure | GitHub profile README, not a product. |
| IOJH2.0 | Hold | Business-related project; scope intentionally excluded from the current creative direction. No public showcase without approval. |
| IOJH-ERP | Hold | Business-related project with non-production foundations; no confidential workflow details or production status claims. |
| From-Research-Ideas-to-Academic-Publication | Hold | Business-related registration/landing project; no public showcase without approval. |

## New research evidence

### Phishing Website Detection

Source: [README](https://github.com/abarman079/phishing-website-detection/blob/main/README.md), [final test metrics](https://github.com/abarman079/phishing-website-detection/blob/main/Results/Notebook%204/metrics/final_test_metrics.csv), [thesis result report](https://github.com/abarman079/phishing-website-detection/blob/main/Results/Notebook%204/reports/final_result_values_for_thesis.md). Inspected tree SHA: `fed5e77b75ef8672bfb44b35f568045474c6c3b8`.

Four notebooks compare 15 conventional URL features with 25 URL+HTML registered-domain-consistency features. Official test: 168,060 rows, 91,260 benign and 76,800 phishing. Frozen estimators; no refit or threshold retuning. AP is average precision, not accuracy. Values rounded below for readable display.

| Model | AP | F1 | MCC | FPR |
|---|---:|---:|---:|---:|
| M1 LR URL | .882938 | .793949 | .626021 | .156936 |
| M2 LR URL+HTML | .932354 | .845743 | .719547 | .116130 |
| M3 RF URL | .954911 | .860091 | .751807 | .083410 |
| M4 RF URL+HTML | .978016 | .913092 | .851013 | .025510 |

The benign calendar date 2025-09-08 overlaps train/test. Do not call the official split globally strictly later by date. AP depends on prevalence; bootstrap independence and related-domain dependence are limitations; no external baseline superiority or production protection claim. Use charts made from the CSV; optional repository figure `Results/Notebook 4/figures/F19_final_AP_F1_MCC_comparison.png` after visual/provenance check. A scroll-driven comparison of URL and HTML features is a proposed explanatory visualization, not a real phishing scanner.

### CrackSAFE-MRC

Source: [README](https://github.com/abarman079/wallCrackWith2datasets/blob/main/README.md), [Phase 8 threshold policy](https://github.com/abarman079/wallCrackWith2datasets/blob/main/Phase8_Threshold_Tuning_Operating_Point/phase8_threshold_policy.json). Inspected tree SHA: `ece41b1f43082e2978fa9ba979909f660a090a35`.

Documented training/validation counts: 9,603/1,695 images; validation includes 1,477 crack-present and 218 no-crack images. Three architectures with EfficientNet-B3 encoders. Phase 8 selected best crack-only IoU points:

| Model | Threshold | Crack-only IoU | Crack-only Dice |
|---|---:|---:|---:|
| U-Net | .90 | .5686416 | .7104545 |
| DeepLabV3+ | .40 | .5730325 | .7142591 |
| U-Net++ | .40 | .5807011 | .7216069 |

Separate Phase 8 risk-aware threshold rule: minimize no-crack FP rate subject to crack-only IoU >= 98% of best IoU. At the selected operating points, U-Net (.90) has .0183486 no-crack FP rate; DeepLabV3+ (.50) .0045872; U-Net++ (.50) .0275229. These are specific validation-sweep results, not an independent holdout certification or final later-stage comparison. The term risk-controlled here describes the repository threshold policy, not formal statistical risk certification. Later ablation/calibration/domain-shift artifacts exist; do not merge their metrics into this comparison without a separate protocol review. Keep current approved `model-tradeoff.webp`; consider a source-linked original chart from the JSON. Source-dataset images/overlays remain restricted until license/privacy review. Hugging Face demo listed in README; health and safety recheck required before linking.

### CrackSAFE-CP

Source: [research status](https://github.com/abarman079/wallCrackDetection-CP/blob/main/docs/RESEARCH_STATUS.md) (snapshot 2026-11-11), [repository](https://github.com/abarman079/wallCrackDetection-CP). Inspected tree SHA: `7a2396409fe4dff4b46bf89caf389c5c4440d4e2`.

Research direction: segmentation, component and branch topology, prediction-only uncertainty, selective prediction and risk control under distribution shift. Phase 01/02 technical audits complete, independent units/annotations/rights unresolved; Phase 03 development training underway per snapshot, not certified FULL. No nine-job completion, certified calibration or formal two-risk certificate established. Show a dated research-status timeline and methodology diagram, not a headline score. Avoid claims based on sealed tests or private artifacts.

### Rice varieties classification

Sources: [repository](https://github.com/abarman079/RiceVarietiesBangladesh_Classification_CSE475_Project), `Results/Task - 4(SimCLR)/simclr_results_summary.csv`, `Results/Task - 5 (BYOL)/byol_results_summary.csv`, `Results/Task - 6(SSL Dino)/classifier_comparison.csv`. Inspected tree SHA: `2d7fcb34114cb5dfb29d2425ee9e69a8a8af5d3e`.

Files establish supervised split experiments and SimCLR/BYOL/DINO comparison workflows. Example documented results: BYOL MLP accuracy 72.75%; SimCLR frozen-feature linear probe 50.93%; DINO MLP accuracy .358157895 in its own result table. Keep numeric results out of homepage until their datasets, split, preprocessing and comparability are reconciled. This research is useful because it includes weak as well as stronger results. Use an original method overview or approved figures, not generic rice photography.

## Existing flagship evidence and asset plan

- SlateDesk: [architecture](https://github.com/abarman079/slatedesk/blob/main/docs/architecture.md), [screenshots](https://github.com/abarman079/slatedesk/tree/main/docs/screenshots). Modular monolith, JWT + HttpOnly refresh cookies, resource-based authorization, deadlines checked at command time, PostgreSQL xmin and 409 conflicts. Existing two approved crops; design an interactive role/assignment lifecycle and architectural diagram from the documentation, explicitly explanatory rather than a running backend.
- FrameSignal: [case study](https://github.com/abarman079/FrameSignal/blob/master/docs/project-case-study.md). Decision-first movie guidance, spoiler labels, protected CMS and RLS. Use existing rights-safe UI crops; no film posters, studio logos or authenticated screenshots without authorization.
- Arctic Daze: [repository](https://github.com/abarman079/arctic-daze). Existing interface-only desktop/mobile images are available. Avoid unapproved editorial photography; use UI composition and original abstract fashion-inspired typography or materials.
- CCTV: [repository](https://github.com/abarman079/cctv-violence-anomaly-detection). 750-image documented test split, MLP F1 94.97% and accuracy 94.93% as reported; the existing MobileNetV2 confusion matrix is a different model and must stay labeled as such. Existing safe architecture and confusion-matrix assets retained. No violent/identifiable dataset images.
- Existing supporting projects: retain approved assets and boundaries in `docs/phase-3-media-provenance.md`; current site tree has sixteen project WebPs (eight flagship, eight archive). Verify current links and privacy before adding any new assets. No generated screenshot masquerading as a product.

## Content and motion handoff

Use plain, specific language; examples of neutral draft leads: “FrameSignal helps people decide what to watch without spoiling the movie.” “SlateDesk keeps assignment, submission and grading workflows in one place.” “This study compares URL features with signals from webpage HTML.” Avoid buzzwords, unverifiable personal roles, awards, impact claims and fake client outcomes. First-person individual responsibilities, team context, dates and lessons require owner confirmation or are omitted. Do not block design work on optional facts.

Homepage uses a short identity/opening, selected work, research, project index, about/resume/contact. Create different visual treatment for each flagship; maintain direct navigation and readable static fallbacks. Existing approved baseline (local Lighthouse Incognito): desktop performance 100, mobile 92, desktop LCP ~0.69s, mobile LCP ~3.33s, blocking time 0/17.5ms. SEO localhost noindex is intentional; production SEO still needs checking. Performance targets: desktop >=95 preferred, mobile >=90 preferred, mobile LCP <=2.5s; adaptive 60/120Hz motion, native touch scrolling, reduced motion, no forced loader. Actual animation frame pacing must be tested separately on home 60Hz and office 120Hz displays. Keep the existing accessibility/functional regression tests.

## P01 acceptance boundary

Editorial inventory and evidence prioritization complete. No application changes or asset imports in this phase. Pending release gates: owner confirmation of optional personal role/year/lessons, new asset approval and visual QA, current live-link health, exact metrics where evaluation context is incomplete, production SEO and physical-device frame pacing. Carry these forward to implementation, not as claims of completed verification.
