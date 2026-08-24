import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components/project/case-study/case-study-page";
import { JsonLd } from "@/components/seo/json-ld";
import { flagshipProjects } from "@/content/projects";
import { createPageMetadata } from "@/lib/seo";
import { createProjectStructuredData } from "@/lib/structured-data";

interface FlagshipCaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return flagshipProjects.map((project) => ({ slug: project.slug }));
}

function getCaseStudyProject(slug: string) {
  return flagshipProjects.find(
    (project) => project.slug === slug && project.caseStudy,
  );
}

export async function generateMetadata({
  params,
}: FlagshipCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudyProject(slug);

  if (!project) notFound();

  const title = `${project.canonicalName} Case Study`;

  return createPageMetadata(title, project.shortSummary, {
    path: `/work/${project.slug}`,
    socialImagePath: `/social-card?project=${encodeURIComponent(project.slug)}`,
    socialImageAlt: `${project.canonicalName} portfolio case study`,
  });
}

export default async function FlagshipCaseStudyPage({
  params,
}: FlagshipCaseStudyPageProps) {
  const { slug } = await params;
  const projectIndex = flagshipProjects.findIndex(
    (project) => project.slug === slug && project.caseStudy,
  );

  if (projectIndex < 0) notFound();

  const project = flagshipProjects[projectIndex];
  const nextProject = flagshipProjects[(projectIndex + 1) % flagshipProjects.length];

  if (!project || !nextProject) notFound();

  return (
    <>
      <JsonLd data={createProjectStructuredData(project)} />
      <CaseStudyPage
        project={project}
        projectIndex={projectIndex + 1}
        nextProject={nextProject}
      />
    </>
  );
}
