import { z } from "zod";

import {
  archiveGroups,
  evidenceSourceTypes,
  projectStatuses,
  projectTiers,
  projectTypes,
  type ProjectRecord,
} from "../types/project";

const nonEmptyText = z.string().trim().min(1);
const evidenceId = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const evidenceSourceSchema = z
  .object({
    id: evidenceId,
    sourceType: z.enum(evidenceSourceTypes),
    urlOrPath: nonEmptyText,
    supports: nonEmptyText,
    checkedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    notes: nonEmptyText.optional(),
  })
  .strict();

const metricSchema = z
  .object({
    label: nonEmptyText,
    value: z.number().finite(),
    unit: nonEmptyText,
    modelOrSubject: nonEmptyText,
    datasetContext: nonEmptyText,
    splitOrEvaluationContext: nonEmptyText,
    limitations: nonEmptyText,
    evidenceIds: z.array(evidenceId).min(1),
  })
  .strict();

const mediaSchema = z
  .object({
    src: z.string().startsWith("/"),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    alt: z.string(),
    kind: z.enum(["screenshot", "diagram", "chart", "photo", "video"]),
    source: nonEmptyText,
    licenseOrPermission: z.enum([
      "owned",
      "licensed",
      "permission-confirmed",
      "public-domain",
    ]),
    privacyReviewed: z.literal(true),
    credit: nonEmptyText.optional(),
    caption: nonEmptyText.optional(),
  })
  .strict();

const presentationSchema = z
  .object({
    variant: z.enum(["architecture", "editorial", "commerce", "research"]),
    technologyLimit: z.number().int().positive().max(8),
  })
  .strict();

const caseStudyFeatureSchema = z
  .object({
    title: nonEmptyText,
    description: nonEmptyText,
  })
  .strict();

const architectureNodeSchema = z
  .object({
    label: nonEmptyText,
    detail: nonEmptyText,
  })
  .strict();

const caseStudyBlockSchema = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal("prose"),
      heading: nonEmptyText,
      paragraphs: z.array(nonEmptyText).min(1),
      evidenceIds: z.array(evidenceId).min(1),
    })
    .strict(),
  z
    .object({
      type: z.literal("features"),
      heading: nonEmptyText,
      introduction: nonEmptyText.optional(),
      items: z.array(caseStudyFeatureSchema).min(1),
      evidenceIds: z.array(evidenceId).min(1),
    })
    .strict(),
  z
    .object({
      type: z.literal("architecture"),
      heading: nonEmptyText,
      introduction: nonEmptyText,
      nodes: z.array(architectureNodeSchema).min(2),
      relationships: z.array(nonEmptyText).min(1),
      evidenceIds: z.array(evidenceId).min(1),
    })
    .strict(),
  z
    .object({
      type: z.literal("decisions"),
      heading: nonEmptyText,
      items: z.array(nonEmptyText).min(1),
      evidenceIds: z.array(evidenceId).min(1),
    })
    .strict(),
  z
    .object({
      type: z.literal("metrics"),
      heading: nonEmptyText,
      introduction: nonEmptyText,
      metricIndexes: z.array(z.number().int().nonnegative()).min(1),
      evidenceIds: z.array(evidenceId).min(1),
    })
    .strict(),
  z
    .object({
      type: z.literal("media"),
      heading: nonEmptyText,
      introduction: nonEmptyText.optional(),
      mediaIndexes: z.array(z.number().int().nonnegative()).min(1),
      evidenceIds: z.array(evidenceId).min(1),
    })
    .strict(),
  z
    .object({
      type: z.literal("limitations"),
      heading: nonEmptyText,
      items: z.array(nonEmptyText).min(1),
      evidenceIds: z.array(evidenceId).min(1),
    })
    .strict(),
]);

const caseStudySchema = z
  .object({
    overview: nonEmptyText,
    blocks: z.array(caseStudyBlockSchema).min(1),
    evidenceIds: z.array(evidenceId).min(1),
  })
  .strict();

export const projectSchema: z.ZodType<ProjectRecord> = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    canonicalName: nonEmptyText,
    tier: z.enum(projectTiers),
    archiveGroup: z.enum(archiveGroups).optional(),
    projectTypes: z.array(z.enum(projectTypes)).min(1),
    repositoryUrl: z.string().url(),
    status: z.enum(projectStatuses),
    shortSummary: nonEmptyText,
    technologies: z.array(nonEmptyText).min(1),
    functionality: z.array(nonEmptyText).min(1),
    architectureFacts: z.array(nonEmptyText).min(1).optional(),
    liveUrl: z.string().url().optional(),
    year: nonEmptyText.optional(),
    role: nonEmptyText.optional(),
    metrics: z.array(metricSchema).min(1).optional(),
    media: z.array(mediaSchema).min(1).optional(),
    presentation: presentationSchema.optional(),
    caseStudy: caseStudySchema.optional(),
    evidence: z.array(evidenceSourceSchema).min(1),
  })
  .strict()
  .superRefine((project, context) => {
    if (project.tier === "flagship" && project.archiveGroup) {
      context.addIssue({
        code: "custom",
        path: ["archiveGroup"],
        message: "Flagship projects cannot have an archive group.",
      });
    }

    if (project.tier === "archive" && !project.archiveGroup) {
      context.addIssue({
        code: "custom",
        path: ["archiveGroup"],
        message: "Archive projects require an archive group.",
      });
    }

    if (project.status === "live" && !project.liveUrl) {
      context.addIssue({
        code: "custom",
        path: ["liveUrl"],
        message: "Live projects require a verified live URL.",
      });
    }

    if (project.tier === "flagship" && !project.presentation) {
      context.addIssue({
        code: "custom",
        path: ["presentation"],
        message: "Flagship projects require presentation metadata.",
      });
    }

    if (project.tier === "flagship" && !project.media) {
      context.addIssue({
        code: "custom",
        path: ["media"],
        message: "Flagship projects require verified production media.",
      });
    }

    if (project.tier === "flagship" && !project.caseStudy) {
      context.addIssue({
        code: "custom",
        path: ["caseStudy"],
        message: "Flagship projects require an evidence-backed case study.",
      });
    }

    if (project.tier === "archive" && project.caseStudy) {
      context.addIssue({
        code: "custom",
        path: ["caseStudy"],
        message: "Archive projects cannot publish flagship case studies.",
      });
    }

    const evidenceIds = new Set(project.evidence.map((item) => item.id));
    for (const metric of project.metrics ?? []) {
      for (const id of metric.evidenceIds) {
        if (!evidenceIds.has(id)) {
          context.addIssue({
            code: "custom",
            path: ["metrics"],
            message: `Metric references unknown evidence id: ${id}`,
          });
        }
      }
    }

    if (project.caseStudy) {
      const referencedEvidenceIds = [
        ...project.caseStudy.evidenceIds,
        ...project.caseStudy.blocks.flatMap((block) => block.evidenceIds),
      ];

      for (const id of referencedEvidenceIds) {
        if (!evidenceIds.has(id)) {
          context.addIssue({
            code: "custom",
            path: ["caseStudy"],
            message: `Case study references unknown evidence id: ${id}`,
          });
        }
      }

      for (const block of project.caseStudy.blocks) {
        if (block.type === "media") {
          for (const mediaIndex of block.mediaIndexes) {
            if (!project.media?.[mediaIndex]) {
              context.addIssue({
                code: "custom",
                path: ["caseStudy", "blocks"],
                message: `Case study references missing media index: ${mediaIndex}`,
              });
            }
          }
        }

        if (block.type === "metrics") {
          for (const metricIndex of block.metricIndexes) {
            if (!project.metrics?.[metricIndex]) {
              context.addIssue({
                code: "custom",
                path: ["caseStudy", "blocks"],
                message: `Case study references missing metric index: ${metricIndex}`,
              });
            }
          }
        }
      }
    }
  });

const projectCollectionSchema = z
  .array(projectSchema)
  .length(12)
  .superRefine((projects, context) => {
    const slugs = new Set<string>();
    const evidenceIds = new Set<string>();

    projects.forEach((project, projectIndex) => {
      if (slugs.has(project.slug)) {
        context.addIssue({
          code: "custom",
          path: [projectIndex, "slug"],
          message: `Duplicate project slug: ${project.slug}`,
        });
      }
      slugs.add(project.slug);

      project.evidence.forEach((evidence, evidenceIndex) => {
        if (evidenceIds.has(evidence.id)) {
          context.addIssue({
            code: "custom",
            path: [projectIndex, "evidence", evidenceIndex, "id"],
            message: `Duplicate evidence id: ${evidence.id}`,
          });
        }
        evidenceIds.add(evidence.id);
      });
    });

    const counts = {
      flagship: projects.filter((project) => project.tier === "flagship").length,
      featured: projects.filter(
        (project) => project.archiveGroup === "featured",
      ).length,
      additional: projects.filter(
        (project) => project.archiveGroup === "additional",
      ).length,
    };

    if (counts.flagship !== 4 || counts.featured !== 3 || counts.additional !== 5) {
      context.addIssue({
        code: "custom",
        message:
          "The portfolio hierarchy requires 4 flagship, 3 featured archive, and 5 additional archive projects.",
      });
    }
  });

export function parseProjectRecords(input: unknown): readonly ProjectRecord[] {
  return Object.freeze(projectCollectionSchema.parse(input));
}

export function findProjectBySlug(
  projects: readonly ProjectRecord[],
  slug: string,
): ProjectRecord | undefined {
  return projects.find((project) => project.slug === slug);
}
