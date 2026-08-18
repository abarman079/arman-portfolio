# Portfolio V2 asset inventory

Audit date: 2026-08-18

This inventory distinguishes evidence/reference material from assets approved for a future public build. Nothing was copied into the V2 `public/` directory during Phase 0.

## Legacy assets

| Asset | Keep as reference? | Use in V2? | Reason |
| --- | --- | --- | --- |
| `reference/legacy/public/Arman -  CV.pdf` | Yes | **No** | One-page legacy resume; outdated “aspiring” positioning, omits current flagship work, and contains private phone/address details. A new redacted resume is required. |
| `reference/legacy/src/assets/hero.png` | Yes | **No** | Generic purple layered artwork; not project evidence and conflicts with the new identity. |
| `reference/legacy/src/assets/rice.jpg` | Yes | **No** | Generic contextual rice photograph rather than a real product or research result. Origin/republication rights are not documented. |
| `reference/legacy/public/favicon.svg` | Yes | **No** | Purple lightning mark is not an approved Arman/Portfolio V2 brand. |
| `reference/legacy/public/icons.svg` | Yes | **No** | Vite/starter-style sprite material; not Portfolio V2 branding. |
| `reference/legacy/src/assets/vite.svg` and `javascript.svg` | Yes | **No** | Starter assets. |
| Unsplash URLs embedded in legacy HTML | Link evidence only | **Never** | Generic stock imagery falsely implies project screenshots. |
| Legacy HTML/CSS/JS | Yes | **No direct reuse** | Useful for old links/content discovery only; architecture and visual patterns are obsolete. |

## Current tracked public assets

`public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, and `window.svg` are Create Next App assets. They are intentionally untouched in Phase 0 and should be removed when Phase 1 replaces the starter UI.

`src/app/favicon.ico` is the Create Next App favicon. No approved V2 favicon, wordmark, or symbol exists yet.

## Flagship project media

### SlateDesk

Available:

- `docs/screenshots/01-login.png`
- `docs/screenshots/02-admin-dashboard.png`
- `docs/screenshots/03-admin-academic-setup.png`
- `docs/screenshots/04-teacher-assignment-ledger.png`
- `docs/screenshots/05-teacher-review-stack.png`
- `docs/screenshots/06-student-assignment.png`
- `docs/screenshots/07-student-results.png`
- `docs/architecture.md`

Need later: inspect source dimensions at import time, remove/blur any private test data, and optionally create one clean architecture visual derived strictly from the documented system.

### FrameSignal

Available:

- Extensive documentation covering architecture, database, security/RLS, editorial workflows, SEO, media handling, performance, and QA.
- Public live deployment suitable for approved UI capture.

Missing:

- Curated desktop/mobile screenshots.
- Signal Card, spoiler-boundary, Watch Signal, and project-detail captures.
- Admin/CMS capture only if a safe demo or owner-approved authenticated session is available.

Licensing concern: movie posters, stills, provider marks, and editorial media may be copyrighted. UI captures must retain appropriate credits or use approved project-owned/test compositions.

### Arctic Daze

Available:

- Fifteen PNG assets under `public/editorial/`: hero, community, about, apparel, footwear, and fragrance imagery.
- Public live deployment suitable for UI capture.

Missing:

- Curated responsive screenshots and an approved interaction capture.
- Written provenance/permission for the committed photography.

Licensing concern: do not copy product/editorial images until ownership or republication permission is confirmed.

### CCTV Violence Detection

Available:

- Dataset distribution and sample figures.
- Classical/deep-model comparison charts.
- Training curves, confusion matrices, ROC and precision-recall curves.
- Alert prediction demonstration and system architecture figure.
- CSV result tables, notebook, report, and project summary.

No fabricated UI is needed. Prefer charts and architecture. Confirm dataset/sample-frame license and avoid graphic or identifiable imagery.

## Archive project media

| Project | Existing usable evidence | Missing or restricted |
| --- | --- | --- |
| Face-Based Anomaly Detection | 28+ figures for data, embeddings, thresholds, training, reconstruction, comparisons, and architecture; tables and report | Confirm LFW/face-sample display terms; prefer charts and anonymized/low-risk examples. |
| Retail Data Warehouse & BI | ERD/snowflake diagrams, Power Query steps, Power BI model and dashboard screenshots, PBIX, report | Attribute dataset; review screenshots for legibility and accidental personal data. |
| Wall Crack Detection | 70+ EDA, overlay, training, comparison, threshold, resolution, and diagnostic figures | Confirm source-dataset licenses and exact final figure/metric pairing. |
| TravelEase | Favicon-like image only | Needs safe live/local screenshots if it receives imagery; never substitute travel stock. |
| RoleBoard RBAC | Only starter SVGs | Needs safe local screenshots if it receives imagery. |
| PulseFlow | Project logos and hospital icons | Needs safe UI screenshots; confirm logo/icon ownership and remove any patient-like demo data. |
| EWU FUB Energy Monitor | No committed image assets | Needs live/local captures if it receives imagery; label simulated telemetry. |
| EduConsult Pro | Large vendored Astra asset tree | Needs owner-approved screenshots of custom work; do not use vendored theme assets as evidence of custom design. |

## Capture policy for later phases

- Capture only a verified live deployment or a locally running repository at a known commit.
- Record source URL/commit, capture date, viewport, visible data status, and any required credit.
- Never mock a product screenshot and present it as the real application.
- Never use stock photography as a replacement for missing application media.
- Blur or replace secrets, email addresses, account identifiers, personal data, and unsafe demo records before publication.
- Optimize/copy approved material only during the phase that implements its project presentation.

## Branding and resume status

- V2 has no approved favicon, wordmark asset, social image, or portrait.
- Phase 1 may create a restrained typographic identity and favicon after the design foundation is approved; the legacy lightning mark is excluded.
- The legacy resume is reference-only. Navigation must omit Resume until a current redacted PDF is supplied.
