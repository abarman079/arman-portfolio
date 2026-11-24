import { crackEvidence, phishingEvidence } from "./research-comparisons";
import type { ProjectRecord } from "../types/project";

const checkedAt = "2026-11-24";
const rf = phishingEvidence.rows[3];
const uNetPlus = crackEvidence.rows[2];
const deepLab = crackEvidence.rows[1];
const roundPercent = (value: number) => Number((value * 100).toFixed(2));
const phishingDataset = "PhreshPhish v1.0.1; 168,060 official-test rows (91,260 benign, 76,800 phishing).";
const phishingEvaluation = "Unchanged frozen estimator predictions on the official test set after refit on official training data.";
const phishingLimit = "Offline research, not a live prevention service. Benign train and test observations share 2025-09-08; not globally strictly separated by date. AP depends on prevalence.";
const crackDataset = "Multidataset split: 9,603 training and 1,695 validation images; 1,477 crack-present and 218 clean validation images.";
const crackLimit = "Phase 8 validation sweep, not an independent test, later-phase benchmark, or field inspection certification.";

export const phishingResearchProject: ProjectRecord = {
  slug: "phishing-website-detection",
  canonicalName: "Phishing Website Detection",
  tier: "flagship",
  projectTypes: ["ml-cv"],
  repositoryUrl: "https://github.com/abarman079/phishing-website-detection",
  status: "research",
  shortSummary: "A controlled comparison of URL features and webpage HTML signals for detecting phishing websites.",
  technologies: ["Python", "Jupyter Notebook", "scikit-learn", "Logistic Regression", "Random Forest"],
  functionality: [
    "Offline URL and HTML registered-domain-consistency feature extraction",
    "Controlled URL-only versus combined-feature model comparisons",
    "Frozen official-test evaluation, paired statistical comparisons and interpretation",
  ],
  architectureFacts: [
    "Four notebooks separate audit, feature extraction, model selection and final evaluation",
    "Fifteen URL features versus twenty-five combined URL and HTML features",
    "Preprocessing and model parameters fitted before official-test exposure",
  ],
  metrics: [
    { label: "Average precision", value: roundPercent(rf.ap), unit: "%", modelOrSubject: "Random Forest / URL + HTML", datasetContext: phishingDataset, splitOrEvaluationContext: phishingEvaluation, limitations: phishingLimit, evidenceIds: ["phishing-final-results"] },
    { label: "F1", value: roundPercent(rf.f1), unit: "%", modelOrSubject: "Random Forest / URL + HTML", datasetContext: phishingDataset, splitOrEvaluationContext: phishingEvaluation, limitations: phishingLimit, evidenceIds: ["phishing-final-results"] },
    { label: "False-positive rate", value: roundPercent(rf.fpr), unit: "%", modelOrSubject: "Random Forest / URL + HTML", datasetContext: phishingDataset, splitOrEvaluationContext: phishingEvaluation, limitations: phishingLimit, evidenceIds: ["phishing-final-results"] },
  ],
  presentation: { variant: "research", technologyLimit: 5, homepageStory: { label: "Phishing classification research", thesis: "Compare the same model families with and without HTML consistency features.", steps: [
    { label: "Audit", detail: "Inspect the PhreshPhish dataset and extract URL features" },
    { label: "Enrich", detail: "Extract ten additional HTML registered-domain-consistency features from stored snapshots" },
    { label: "Freeze", detail: "Select settings on internal validation and refit on official training data" },
    { label: "Evaluate", detail: "Compare the unchanged models on 168,060 official-test rows" },
  ] } },
  media: [
    { src: "/projects/phishing-website-detection/f1-comparison.webp", width: 1440, height: 900, alt: "Official test F1: logistic regression URL 79.39%, URL plus HTML 84.57%; random forest URL 86.01%, URL plus HTML 91.31%.", kind: "chart", source: `Original portfolio chart derived from ${phishingEvidence.source}; 2026-11-24.`, licenseOrPermission: "owned", privacyReviewed: true, caption: "F1 on the official frozen test; four non-dummy configurations" },
    { src: "/projects/phishing-website-detection/fpr-comparison.webp", width: 1440, height: 900, alt: "Official test false-positive rate: logistic regression URL 15.69%, URL plus HTML 11.61%; random forest URL 8.34%, URL plus HTML 2.55%.", kind: "chart", source: `Original portfolio chart derived from ${phishingEvidence.source}; 2026-11-24.`, licenseOrPermission: "owned", privacyReviewed: true, caption: "False-positive rate on the same official test; lower is better" },
  ],
  evidence: [
    { id: "phishing-readme", sourceType: "readme", urlOrPath: "https://github.com/abarman079/phishing-website-detection#readme", supports: "Dataset, features, notebook workflow and experimental protocol", checkedAt },
    { id: "phishing-final-results", sourceType: "result", urlOrPath: phishingEvidence.source, supports: "Exact official-test model metrics and counts", checkedAt },
    { id: "phishing-report", sourceType: "result", urlOrPath: phishingEvidence.report, supports: "Frozen evaluation, paired differences and research limitations", checkedAt },
  ],
  caseStudy: {
    overview: "A webpage can have a convincing URL while its HTML references tell a different story. This experiment tests whether those extra signals improve lightweight classification, without turning the study into a competition between unrelated models.",
    evidenceIds: ["phishing-readme", "phishing-final-results", "phishing-report"],
    blocks: [
      { type: "architecture", heading: "From stored webpages to a frozen comparison", introduction: "Four notebooks separate development decisions from the final evaluation. HTML is parsed from stored snapshots, not live sites.", nodes: [
        { label: "Data audit", detail: "PhreshPhish v1.0.1 and fifteen URL features" },
        { label: "HTML enrichment", detail: "Ten additional registered-domain-consistency features" },
        { label: "Model selection", detail: "Internal chronological train/validation; average precision selects settings" },
        { label: "Freeze", detail: "Refit on 498,255 official training rows and serialize the model pipelines" },
        { label: "Official test", detail: "Evaluate unchanged predictions on 168,060 rows" },
      ], relationships: ["The URL-only and hybrid models use the same estimator families and evaluation rows.", "Training-fitted preprocessing stays frozen during final evaluation."], evidenceIds: ["phishing-readme", "phishing-report"] },
      { type: "metrics", heading: "What the additional features changed", introduction: "The hybrid random forest has the highest average precision and F1 among the documented configurations. Average precision is not accuracy.", metricIndexes: [0, 1, 2], evidenceIds: ["phishing-final-results", "phishing-report"] },
      { type: "media", heading: "False positives on benign examples", introduction: "The paired random-forest comparison reduces the measured false-positive rate from 8.34% to 2.55% on this test set. The majority baseline predicts benign for every row and has zero F1; it is not shown in these four-model charts.", mediaIndexes: [1], evidenceIds: ["phishing-final-results"] },
      { type: "limitations", heading: "What these results do not establish", items: ["The official train and test sets share benign observations dated 2025-09-08, so the split is not globally strictly later by date.", "Test phishing prevalence is different from development validation prevalence; average precision is prevalence-sensitive.", "Row-level bootstrap intervals may underrepresent dependence among related domains.", "These are offline measurements; no live protection, deployment threshold or external benchmark superiority is established."], evidenceIds: ["phishing-report"] },
    ],
  },
};

export const crackResearchProject: ProjectRecord = {
  slug: "wall-crack-detection",
  canonicalName: "CrackSAFE-MRC",
  tier: "flagship",
  projectTypes: ["ml-cv"],
  repositoryUrl: crackEvidence.repository,
  status: "research",
  shortSummary: "Pixel-level wall crack segmentation and the trade-off between overlap quality and false alarms on clean images.",
  technologies: ["Python", "U-Net", "DeepLabV3+", "U-Net++", "EfficientNet-B3"],
  functionality: ["Multidataset semantic segmentation", "Crack-only and empty-mask-aware evaluation", "Threshold sweeps and clean-image false-positive diagnostics"],
  architectureFacts: ["Three segmentation architectures with EfficientNet-B3 encoders", "Documented frozen train/validation split", "Separate overlap-maximizing and false-positive-minimizing threshold policies"],
  metrics: [
    { label: "Crack-only IoU", value: roundPercent(uNetPlus.bestIou), unit: "%", modelOrSubject: "U-Net++ / best overlap", datasetContext: crackDataset, splitOrEvaluationContext: "Phase 8 validation, threshold 0.40 (best crack-only IoU).", limitations: crackLimit, evidenceIds: ["crack-phase8"] },
    { label: "No-crack false-positive rate", value: roundPercent(deepLab.riskFpr), unit: "%", modelOrSubject: "DeepLabV3+ / clean-image policy", datasetContext: crackDataset, splitOrEvaluationContext: "Phase 8 validation, threshold 0.50; minimize clean-image false positives while retaining at least 98% of best crack-only IoU.", limitations: crackLimit, evidenceIds: ["crack-phase8"] },
  ],
  presentation: { variant: "research", technologyLimit: 5, homepageStory: { label: "Wall crack segmentation research", thesis: "Compare pixel overlap and the cost of marking a clean surface as cracked.", steps: [
    { label: "Prepare", detail: "Use the documented multidataset train and validation split" },
    { label: "Compare", detail: "U-Net, DeepLabV3+ and U-Net++ with EfficientNet-B3" },
    { label: "Sweep", detail: "Evaluate crack-only overlap and no-crack false positives across thresholds" },
    { label: "Select", detail: "Report the two operating policies separately" },
  ] } },
  media: [
    { src: "/projects/wall-crack-detection/phase8-iou.webp", width: 1440, height: 900, alt: "Phase 8 best crack-only IoU: U-Net 56.86% at threshold 0.90; DeepLabV3+ 57.30% at 0.40; U-Net++ 58.07% at 0.40.", kind: "chart", source: `Original portfolio chart derived from ${crackEvidence.source}; 2026-11-24.`, licenseOrPermission: "owned", privacyReviewed: true, caption: "Phase 8 best-overlap threshold comparison on validation data" },
    { src: "/projects/wall-crack-detection/phase8-fpr.webp", width: 1440, height: 900, alt: "Phase 8 clean-image policy false-positive rates: U-Net 1.83% at threshold 0.90; DeepLabV3+ 0.46% at 0.50; U-Net++ 2.75% at 0.50.", kind: "chart", source: `Original portfolio chart derived from ${crackEvidence.source}; 2026-11-24.`, licenseOrPermission: "owned", privacyReviewed: true, caption: "Phase 8 clean-image policy; different thresholds from the overlap chart" },
  ],
  evidence: [
    { id: "wall-readme", sourceType: "readme", urlOrPath: `${crackEvidence.repository}#readme`, supports: "Dataset counts, model families, evaluation and limitations", checkedAt },
    { id: "wall-results", sourceType: "result", urlOrPath: `${crackEvidence.repository}/tree/main/Phase-5%20comapre`, supports: "Earlier comparison artifacts, not the Phase 8 headline results", checkedAt },
    { id: "crack-phase8", sourceType: "result", urlOrPath: crackEvidence.source, supports: "Exact Phase 8 selected thresholds, overlap and false-positive rates", checkedAt },
  ],
  caseStudy: {
    overview: "Thin cracks can be difficult to segment, and a high overlap score does not necessarily mean the model handles clean images well. CrackSAFE-MRC examines both questions through a controlled comparison and threshold selection.",
    evidenceIds: ["wall-readme", "crack-phase8"],
    blocks: [
      { type: "architecture", heading: "Three model families, a common evaluation problem", introduction: "The documented experiment compares three EfficientNet-B3 encoder-based segmentation architectures on a multidataset split.", nodes: [
        { label: "Data", detail: "9,603 training images; 1,695 validation images" },
        { label: "Segmentation", detail: "U-Net, DeepLabV3+ and U-Net++" },
        { label: "Probability maps", detail: "Sweep candidate thresholds rather than assuming 0.50 is optimal" },
        { label: "Diagnostics", detail: "Crack-only overlap, empty-mask-aware measures and clean-image false positives" },
      ], relationships: ["Overlap and false-positive behavior answer different evaluation questions.", "Phase 8 selects an overlap-maximizing point and a separate false-positive-aware point for each model."], evidenceIds: ["wall-readme", "crack-phase8"] },
      { type: "metrics", heading: "Two different operating decisions", introduction: "U-Net++ has the highest documented crack-only IoU at the best-overlap threshold. DeepLabV3+ has the lowest false-positive rate among the clean-image-policy selections. These results use different models and operating points.", metricIndexes: [0, 1], evidenceIds: ["crack-phase8"] },
      { type: "media", heading: "Avoiding false alarms on clean images", introduction: "The Phase 8 clean-image policy minimizes the no-crack false-positive rate among thresholds retaining at least 98% of that model's best crack-only IoU. This is an experimental selection rule, not a formal risk certificate.", mediaIndexes: [1], evidenceIds: ["crack-phase8"] },
      { type: "limitations", heading: "Where the evidence stops", items: ["These values describe the Phase 8 validation sweep, not an independent test of generalization.", "Surface material, illumination, camera and dataset differences may change performance.", "Later ablation, calibration and domain-shift artifacts require their own documented protocols before comparison.", "The study is not a certified field inspection service; CrackSAFE-CP is separate ongoing research."], evidenceIds: ["wall-readme", "crack-phase8"] },
    ],
  },
};
