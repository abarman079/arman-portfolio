import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components/project/case-study/case-study-page";
import { flagshipProjects } from "@/content/projects";

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

  return {
    title,
    description: project.shortSummary,
    openGraph: {
      type: "website",
      title,
      description: project.shortSummary,
    },
    twitter: {
      card: "summary",
      title,
      description: project.shortSummary,
    },
  };
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
    <CaseStudyPage
      project={project}
      projectIndex={projectIndex + 1}
      nextProject={nextProject}
    />
  );
}
