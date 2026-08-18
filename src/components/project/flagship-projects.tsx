import type { ProjectRecord } from "@/types/project";
import { formatProjectTypes } from "@/lib/project-labels";

import { ActionLink } from "../ui/action-link";
import { ProjectMediaStage } from "./project-media-stage";
import styles from "./flagship-projects.module.css";

interface FlagshipProjectsProps {
  projects: readonly ProjectRecord[];
  startIndex?: number;
}

function FlagshipProject({
  project,
  index,
}: {
  project: ProjectRecord;
  index: number;
}) {
  if (!project.presentation || !project.media) {
    return null;
  }

  const headingId = `flagship-${project.slug}`;
  const primaryHref = project.liveUrl ?? project.repositoryUrl;
  const primaryLabel = project.liveUrl ? "Visit live site" : "View source";
  const metric = project.metrics?.[0];

  return (
    <li>
      <article
        className={`${styles.project} ${styles[project.presentation.variant]}`}
        aria-labelledby={headingId}
      >
        <div className={styles.topline}>
          <p className={styles.index} aria-label={`Project ${index}`}>
            {String(index).padStart(2, "0")}
          </p>
          <p className={styles.category}>
            {formatProjectTypes(project.projectTypes)}
          </p>
          <p className={styles.status}>
            {project.status === "live"
              ? "Verified deployment"
              : project.status === "research"
                ? "Offline research"
                : "Repository project"}
          </p>
        </div>

        <h3 className={styles.title} id={headingId}>
          {project.canonicalName}
        </h3>

        <div className={styles.composition}>
          <div className={styles.copy}>
            <p className={styles.summary}>{project.shortSummary}</p>

            <p className={styles.stack}>
              {project.technologies
                .slice(0, project.presentation.technologyLimit)
                .join(" / ")}
            </p>

            {metric ? (
              <div className={styles.metric}>
                <p className={styles.metricValue}>
                  {metric.value}
                  {metric.unit}
                </p>
                <p className={styles.metricLabel}>
                  {metric.label} · {metric.modelOrSubject}
                </p>
                <p className={styles.metricContext}>
                  Documented 750-image frozen test split. Offline experiment,
                  not a production CCTV result.
                </p>
              </div>
            ) : (
              <ul className={styles.facts} aria-label="Verified project details">
                {(project.architectureFacts ?? project.functionality)
                  .slice(0, 3)
                  .map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
              </ul>
            )}

            <div className={styles.actions}>
              {project.liveUrl ? (
                <ActionLink
                  href={project.liveUrl}
                  external
                  variant="secondary"
                  ariaLabel={`${project.canonicalName} live site, opens in a new tab`}
                >
                  Live site
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
          </div>

          <div className={styles.media}>
            <ProjectMediaStage
              actionLabel={primaryLabel}
              href={primaryHref}
              items={project.media}
              projectName={project.canonicalName}
              variant={project.presentation.variant}
            />
          </div>
        </div>
      </article>
    </li>
  );
}

export function FlagshipProjects({
  projects,
  startIndex = 1,
}: FlagshipProjectsProps) {
  return (
    <ol className={styles.list}>
      {projects.map((project, projectIndex) => (
        <FlagshipProject
          project={project}
          index={startIndex + projectIndex}
          key={project.slug}
        />
      ))}
    </ol>
  );
}
