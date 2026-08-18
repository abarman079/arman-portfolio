# Verified Portfolio V2 content model

This is the pre-TypeScript contract for Phase 1. It separates structural requirements from facts that may be absent.

## Evidence record

Every evidence-backed public claim must point to at least one evidence record.

| Field | Requirement | Rule |
| --- | --- | --- |
| `id` | Required | Stable internal identifier. |
| `sourceType` | Required | `repository`, `readme`, `source`, `result`, `deployment`, `owner`, or `license`. |
| `urlOrPath` | Required | Public URL or workspace path. Never store a secret URL/token. |
| `supports` | Required | Short description of the exact claim supported. |
| `checkedAt` | Required | ISO audit date. |
| `notes` | Optional | Qualification, limitation, or conflicting evidence. |

An owner statement becomes evidence only after it is explicitly confirmed and recorded; a legacy statement is not owner confirmation.

## Project record

| Field | Requirement | Evidence/confirmation policy |
| --- | --- | --- |
| `slug` | Required | Structural; derived from canonical name and kept stable. |
| `canonicalName` | Required | Evidence-backed by repository identity or owner confirmation. |
| `tier` | Required | Editorial decision: `flagship` or `archive`. |
| `projectTypes` | Required | Evidence-backed categories such as full-stack, frontend, backend, ML/CV, or data/BI. |
| `repositoryUrl` | Required for the audited 12 | Evidence-backed canonical public repository URL. |
| `status` | Required | `live`, `repository`, `research`, or `local`; evidence-backed. |
| `shortSummary` | Required | Plain factual synthesis of verified functionality; no unsupported outcome language. |
| `technologies` | Required | Evidence-backed by manifest/import/source/README. Preserve specific versions only when important and verified. |
| `functionality` | Required | Array of evidence-backed capabilities. |
| `architectureFacts` | Optional | Each item requires direct documentation or source evidence. |
| `liveUrl` | Optional | Publish only after repository/owner evidence and a current health/safety check. |
| `year` | Optional | Owner-confirmed or supported by authoritative project history; never inferred from “last updated.” |
| `role` | Optional | Owner-confirmed; repository ownership alone does not define personal role or team context. |
| `metrics` | Optional | Evidence-backed and inseparable from context. |
| `media` | Optional | Must pass source, license/permission, privacy, dimensions, and alt-text requirements. |
| `caseStudy` | Optional | Flagships require enough verified material before publication; individual empty sections are omitted. |
| `links` | Optional | Each link has a type and was checked before release. |
| `evidenceIds` | Required | References supporting the record’s important claims. |
| `ownerConfirmationIds` | Optional | References to confirmations for role, year, lessons, and other personal narrative. |

## Metric record

Metrics are primarily expected for research projects.

| Field | Requirement | Rule |
| --- | --- | --- |
| `label`, `value`, `unit` | Required | Exact source value; no rounding that changes meaning. |
| `modelOrSubject` | Required | Identifies what produced the value. |
| `datasetContext` | Required for ML/data | Dataset/subset and label construction. |
| `splitOrEvaluationContext` | Required | Test split, threshold, resolution, benchmark, or audit conditions. |
| `limitations` | Required | Prevents research metrics from being read as production performance. |
| `evidenceIds` | Required | Direct result table/report source. |

## Media record

| Field | Requirement | Rule |
| --- | --- | --- |
| `src`, `width`, `height` | Required | Approved local asset after later import. |
| `alt` | Required | Describes the information the media contributes; empty only when truly decorative. |
| `kind` | Required | `screenshot`, `diagram`, `chart`, `photo`, or `video`. |
| `source` | Required | Repository path, deployment capture record, or owner-provided source. |
| `credit` | Optional/conditional | Required when license or source calls for attribution. |
| `licenseOrPermission` | Required status | `owned`, `licensed`, `permission-confirmed`, `public-domain`, or `unresolved`. Unresolved media is not published. |
| `privacyReviewed` | Required | Must be true before publication. |
| `caption` | Optional | Factual context only. |

## Case-study record

Required when a flagship case study is published:

- Evidence-backed overview/value statement.
- Verified technologies and links.
- At least one meaningful functionality, architecture, decision, or research-method section.
- Approved cover media.
- Evidence references.

Optional and omitted when unknown:

- Problem/background.
- Personal role and team context.
- Year/timeline.
- Challenges and tradeoffs.
- Results/outcomes.
- Lessons/takeaways.
- Additional gallery, metrics, report, or live link.

Owner confirmation is required for first-person role, responsibility, challenge, decision rationale, lesson, and non-public result claims. Technical source can establish what the system does, but not automatically what Arman personally owned or learned.

## Site-level profile record

| Field | Requirement | Policy |
| --- | --- | --- |
| `name` | Required | Verified public identity: Md. Akibul Hasan Arman. |
| `positioning` | Required | Editorial, evidence-compatible statement; must not imply unverified seniority/employment. |
| `githubUrl` | Required | Verified public profile. |
| `linkedinUrl` | Optional | Owner confirms canonical URL before publication. |
| `contactEmail` | Optional until Contact phase | Owner confirms address and publication permission. |
| `location` | Optional | Publish only if owner confirms the desired granularity. |
| `availability` | Optional | Owner-confirmed exact wording and review date; otherwise hidden. |
| `resumeUrl` | Optional | Present only when a current redacted resume exists. |
| `productionUrl` | Optional until deployment | Required for canonical metadata at release. |

## Rendering rules

- Required structural data fails validation during development/build.
- Optional unknown data produces no label, empty shell, placeholder metric, or “coming soon” claim.
- `unresolved` evidence/media is retained in audit documents but excluded from public data.
- Marketing copy may improve clarity and rhythm only after its factual atoms are mapped to evidence.
- Case-study templates render only populated, verified sections.
