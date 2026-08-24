import "server-only";

import { siteConfig } from "@/content/site";
import { formatProjectTypes } from "@/lib/project-labels";
import type { ProjectRecord } from "@/types/project";

import { getSiteUrl } from "./seo";

export function createPersonStructuredData(): Record<string, unknown> {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Software Engineer",
    description: siteConfig.positioning,
    sameAs: [siteConfig.githubUrl, siteConfig.linkedinUrl],
    ...(siteUrl ? { url: siteUrl.toString() } : {}),
  };
}

export function createProjectStructuredData(
  project: ProjectRecord,
): Record<string, unknown> {
  const siteUrl = getSiteUrl();
  const caseStudyUrl = siteUrl
    ? new URL(`/work/${project.slug}`, siteUrl).toString()
    : undefined;
  const image = siteUrl && project.media?.[0]
    ? new URL(project.media[0].src, siteUrl).toString()
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.canonicalName,
    description: project.shortSummary,
    codeRepository: project.repositoryUrl,
    applicationCategory: formatProjectTypes(project.projectTypes),
    ...(project.liveUrl ? { url: project.liveUrl } : {}),
    ...(caseStudyUrl ? { mainEntityOfPage: caseStudyUrl } : {}),
    ...(image ? { image } : {}),
  };
}
