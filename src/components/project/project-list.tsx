import type { ProjectRecord } from "@/types/project";

import { ActionLink } from "../ui/action-link";

interface ProjectListProps {
  projects: readonly ProjectRecord[];
  startIndex?: number;
  compact?: boolean;
}

const typeLabels = {
  "full-stack": "Full-stack",
  frontend: "Frontend",
  backend: "Backend",
  "ml-cv": "ML / Computer Vision",
  "data-bi": "Data / BI",
} as const;

export function ProjectList({
  projects,
  startIndex = 1,
  compact = false,
}: ProjectListProps) {
  return (
    <ol className={`project-list ${compact ? "project-list--compact" : ""}`}>
      {projects.map((project, index) => (
        <li className="project-entry" key={project.slug}>
          <p className="project-entry__index" aria-hidden="true">
            {String(startIndex + index).padStart(2, "0")}
          </p>

          <div className="project-entry__content">
            <p className="project-entry__type">
              {project.projectTypes.map((type) => typeLabels[type]).join(" · ")}
            </p>
            <h3>{project.canonicalName}</h3>
            <p className="project-entry__summary">{project.shortSummary}</p>
            <p className="project-entry__stack">
              {project.technologies.slice(0, compact ? 4 : 6).join(" · ")}
            </p>
          </div>

          <div className="project-entry__actions">
            {project.liveUrl ? (
              <ActionLink
                href={project.liveUrl}
                external
                variant="quiet"
                ariaLabel={`${project.canonicalName} live site, opens in a new tab`}
              >
                Live
              </ActionLink>
            ) : null}
            <ActionLink
              href={project.repositoryUrl}
              external
              variant="quiet"
              ariaLabel={`${project.canonicalName} repository, opens in a new tab`}
            >
              Source
            </ActionLink>
          </div>
        </li>
      ))}
    </ol>
  );
}
