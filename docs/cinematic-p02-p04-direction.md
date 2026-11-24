# Cinematic portfolio — P02–P04 design foundation

Date: 2026-11-24. Baseline: `9649756` on `feature/portfolio-v2-cinematic`. Companion to `cinematic-p01-project-inventory.md`. This package contains an offline HTML design reference and scoped CSS design tokens; it does not replace production routes or claim production motion/performance acceptance.

## Direction: Systems in Motion

The existing editorial identity is worth preserving, but the next release should feel like a carefully directed film. Keep warm paper, precise typography and graphite project stages. Add an architectural signature object built from stacked planes, an asymmetric grid, large readable project media and a controlled orange accent. No neon, artificial terminal rain, generic particles, glass-card grids or compulsory loading screens. The signature object is an abstract illustration of system layers, never a claim about a particular application.

Recruiters can immediately see the name, role, selected work and resume. The more cinematic experience is optional: scrolling through the story should never be required to access a project. Preserve existing URLs, keyboard navigation, contact, SEO, research context and media provenance.

## P02: editorial copy deck

Draft public copy; integrate into the existing typed content sources rather than duplicating project records. Personal responsibility, team structure, employment and lessons must not be inferred from repository ownership. Use first person for general positioning only; project descriptions describe what the system does. No claims of adoption, commercial impact or awards.

| Surface | Proposed text |
|---|---|
| Identity | Md. Akibul Hasan Arman |
| Role | Software engineer |
| Introduction | I work on web applications, backend systems and machine learning. This is a selection of my projects and research. |
| Primary action | View my work |
| Secondary action | Resume |
| Selected work | Selected projects |
| FrameSignal | Movie recommendations and analysis, with a clear line between spoiler-free advice and deeper discussion. |
| SlateDesk | An assignment and submission system for administrators, teachers and students. |
| Phishing Website Detection | A comparison of URL and HTML features for detecting phishing websites. |
| CrackSAFE-MRC | A study of pixel-level wall crack segmentation and how prediction thresholds affect model performance. |
| Arctic Daze | A fashion and lifestyle browsing experience for customers in Bangladesh. |
| Research intro | Experiments in classification, segmentation and model evaluation. The results are reported with their test conditions and limitations. |
| CCTV | An offline comparison of models for violence and non-violence image classification. |
| CrackSAFE-CP | Ongoing work on uncertainty, crack topology and selective prediction. Formal validation is still pending. |
| Rice classification | Comparing supervised and self-supervised approaches to classifying rice varieties. |
| Face-based anomaly detection | An experimental comparison of anomaly classifiers using FaceNet embeddings. Dataset labels are not evidence of wrongdoing. |
| Retail data warehouse | A dimensional retail data model and Power BI reports built from Online Retail II data. |
| Engineering capabilities | Web applications / APIs and databases / machine learning and computer vision / data and reporting |
| Archive | Earlier work and experiments |
| Contact | Have a project in mind? Get in touch. |

For the contact page, keep email and existing form controls accessible without animations. The resume PDF remains the source of truth for identity/history. Do not copy unverified dates or roles into the site. Use the P01 evidence and previous manifests for exact model results and context. Do not publish numeric rice results until the different protocols are reconciled. Keep the existing wall-crack-detection slug when promoted; add new routes only with validated records and tests.

## P03: desktop storyboard

| Scene | Composition and interaction | Exit / accessible alternative |
|---|---|---|
| Opening | Warm paper; asymmetric headline and signature stack of machined layers; immediate work/resume links. On capable desktop, the stack assembles from a still poster; headline is visible at first paint. | Native anchors; static SVG or still poster; never wait for WebGL. |
| System layers | Short optional scroll-linked separation of UI, API and data planes. Camera movement is shallow and physically coherent. | Visible text labels, no essential pinned content. |
| FrameSignal | Wide dark cinema stage, authentic interface capture; mask reveal and controlled pan, not a fabricated film poster. | Native link to existing case study. |
| SlateDesk | Light technical stage, authentic interface and explanatory architecture path. Emphasize authorization and workflow. | Readable image and diagram; no implied live backend. |
| Phishing | Deep petrol stage with URL/HTML comparison and source-linked F1/AP chart. | Static accessible table; no live scanner claim. |
| CrackSAFE-MRC | Mineral paper stage with chart, threshold comparison and optional licensed mask overlay. | Static chart/table; no unsafe image licensing or certification claim. |
| Arctic Daze | Warm monochrome commerce interface showcase, with authentic desktop/mobile crops. | Native case-study link; no unapproved photography. |
| Research and archive | Compact, searchable/filterable research and earlier work. Separate ongoing research from measured results. | Semantic list with links, all content accessible without JS. |
| About/contact | Quiet paper section, concise personal intro, resume/contact. Final recurrence of the architectural motif, if it adds value. | Standard form and links. |

No forced wait between scenes, scroll snapping across the whole page, or forced horizontal scrolling. Project-specific transitions should be interruptible and support history/back, modified clicks and native anchors. On mobile, art-direct one-column compositions, show the name and actions above heavy media, prefer native scroll and image/SVG fallbacks, and avoid pinning tall sections. At 200% zoom, use normal document flow.

## P04: design tokens

The companion `src/app/cinematic-tokens.css` is scoped to `.cinematic-v2` and intentionally not imported by production yet. Existing styles and tests remain untouched until a real component consumes the tokens.

| Role | Value |
|---|---|
| Warm paper | #F1EEE6 |
| Ink | #171A1E |
| Graphite | #151A20 |
| Night surface | #202831 |
| Rust accent on light | #9E3925 |
| Signal accent on dark | #FF8665 |
| Petrol | #233B46 |
| Mineral | #D7D0C0 |
| Type | Keep existing Geist and Instrument Serif; system mono for labels. No new font downloads. |
| Desktop layout | 12-column grid, max 1504px, variable gutter, 2-column hero. |
| Mobile layout | 4-column logical grid; 20px minimum gutter; 44px controls. |
| Type scale | Responsive headline, 40–132px; section title 36–80px; body 16–18px. |
| Motion | 160ms micro, 320ms component, 600ms scene reveal; no delay for essential content. |

Use warm and dark compositions in alternation, not a universal dark theme. Use accent color sparingly and never alone for state. Test text contrast and focus in actual components. Reuse the existing optimized project assets; never embed fabricated screenshots. New original diagrams are marked explanatory. All imagery has explicit aspect ratio and responsive sizing.

## Engineering handoff (P05 onward)

- Keep Next.js Server Components as the default and isolate animation islands. Read installed Next.js 16.4.6 guides before framework changes. No new dependency is required for the initial motion foundation.
- Audit current Lenis/GSAP runtime, ScrollTrigger lifecycles, route transition state and canvas scheduler before altering them. One owner per animated property. Use time-based updates and requestAnimationFrame/GSAP's clock without a 60 FPS cap; pause offscreen and background work. Retain native scroll for touch/reduced motion and fallbacks.
- Treat the HTML preview as a layout reference only, not a production route or substitute for React/Next components. Implement new hero and motion together, then add project scenes in batches with existing source records. Keep all previous case-study routes accessible. Update `AGENTS.md` direction only when introducing the actual new components.
- GPU-friendly transforms and opacity; avoid layout reads/writes in each frame, heavy full-viewport blur, persistent render loops and large unbounded DPR. Limit animation work to the active scene; use still visuals first. Dynamic quality reduction must not make text blurry or inaccessible.
- 60 Hz baseline frame interval 16.67ms; 120 Hz office panel 8.33ms. At each actual display, test slow and rapid scrolling, reverse motion, route entry/back, reduced motion, resize, focus, and offscreen work. Record actual frame timing/dropped frames with DevTools; Lighthouse is not a frame-rate test. Aim for consistent pacing, not a promise of 120 FPS on all devices.
- Clean Incognito Lighthouse baseline: desktop 100, mobile 92; desktop LCP ~0.69s, mobile ~3.33s; TBT 0/17.5ms. Aim desktop >=95, mobile >=90, mobile LCP <=2.5s, CLS <=0.05; separately check deployed SEO and actual interaction pacing. Use comparable repeat runs, not score gaming.
- Preserve unit/E2E gates and tests for route semantics, mobile reflow, reduced motion, keyboard, project transition and visual snapshots. Intentional visual snapshot changes require inspection, not blind updates. Production stays on main until final review.

## Acceptance and scope

P02–P04 deliver editorial/visual direction plus a reviewable static reference and initial tokens. Production content, routes and rendering are not changed here. P05–P07 will wire the first real homepage slice (motion runtime, signature visual and hero) and validate it locally. Project data expansion, research charts and case studies follow together in P08–P11. Finish with mobile/performance/accessibility/security review and deployment.
