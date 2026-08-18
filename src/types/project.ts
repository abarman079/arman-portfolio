export const projectTiers = ["flagship", "archive"] as const;
export const archiveGroups = ["featured", "additional"] as const;
export const projectTypes = [
  "full-stack",
  "frontend",
  "backend",
  "ml-cv",
  "data-bi",
] as const;
export const projectStatuses = [
  "live",
  "repository",
  "research",
  "local",
] as const;
export const evidenceSourceTypes = [
  "repository",
  "readme",
  "source",
  "result",
  "deployment",
  "owner",
  "license",
] as const;

export type ProjectTier = (typeof projectTiers)[number];
export type ArchiveGroup = (typeof archiveGroups)[number];
export type ProjectType = (typeof projectTypes)[number];
export type ProjectStatus = (typeof projectStatuses)[number];
export type EvidenceSourceType = (typeof evidenceSourceTypes)[number];

export interface EvidenceSource {
  id: string;
  sourceType: EvidenceSourceType;
  urlOrPath: string;
  supports: string;
  checkedAt: string;
  notes?: string;
}

export interface ProjectMetric {
  label: string;
  value: number;
  unit: string;
  modelOrSubject: string;
  datasetContext: string;
  splitOrEvaluationContext: string;
  limitations: string;
  evidenceIds: string[];
}

export interface ProjectMedia {
  src: string;
  width: number;
  height: number;
  alt: string;
  kind: "screenshot" | "diagram" | "chart" | "photo" | "video";
  source: string;
  licenseOrPermission:
    | "owned"
    | "licensed"
    | "permission-confirmed"
    | "public-domain";
  privacyReviewed: true;
  credit?: string;
  caption?: string;
}

export interface ProjectPresentation {
  variant: "architecture" | "editorial" | "commerce" | "research";
  technologyLimit: number;
}

export type CaseStudyBlock =
  | {
      type: "prose";
      heading: string;
      paragraphs: string[];
      evidenceIds: string[];
    }
  | {
      type: "decisions";
      heading: string;
      items: string[];
      evidenceIds: string[];
    }
  | {
      type: "metrics";
      heading: string;
      metrics: ProjectMetric[];
    }
  | {
      type: "media";
      heading?: string;
      items: ProjectMedia[];
    };

export interface ProjectCaseStudy {
  overview: string;
  blocks: CaseStudyBlock[];
  evidenceIds: string[];
}

export interface ProjectRecord {
  slug: string;
  canonicalName: string;
  tier: ProjectTier;
  archiveGroup?: ArchiveGroup;
  projectTypes: ProjectType[];
  repositoryUrl: string;
  status: ProjectStatus;
  shortSummary: string;
  technologies: string[];
  functionality: string[];
  architectureFacts?: string[];
  liveUrl?: string;
  year?: string;
  role?: string;
  metrics?: ProjectMetric[];
  media?: ProjectMedia[];
  presentation?: ProjectPresentation;
  caseStudy?: ProjectCaseStudy;
  evidence: EvidenceSource[];
}
