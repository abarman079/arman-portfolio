import type { ProjectRecord } from "@/types/project";
import { formatProjectTypes } from "@/lib/project-labels";

import { ActionLink } from "../ui/action-link";
import styles from "./project-archive.module.css";

interface ProjectArchiveProps {
  projects: readonly ProjectRecord[];
  startIndex: number;
  variant: "featured" | "additional";
}

export function ProjectArchive({
  projects,
  startIndex,
  variant,
}: ProjectArchiveProps) {
  return (
    <ol className={`${styles.list} ${styles[variant]}`}>
      {projects.map((project, projectIndex) => {
        const index = String(startIndex + projectIndex).padStart(2, "0");

        return (
          <li className={styles.item} key={project.slug}>
            <p className={styles.index} aria-label={`Project ${index}`}>
              {index}
            </p>
            <div className={styles.identity}>
              <p className={styles.type}>
                {formatProjectTypes(project.projectTypes)}
              </p>
              <h3>{project.canonicalName}</h3>
              {variant === "featured" ? (
                <p className={styles.summary}>{project.shortSummary}</p>
              ) : null}
            </div>
            {variant === "featured" ? (
              <div className={styles.evidence}>
                <p className={styles.evidenceLabel}>Verified technical focus</p>
                <p>{project.architectureFacts?.[0] ?? project.functionality[0]}</p>
                <p className={styles.stack}>
                  {project.technologies.slice(0, 4).join(" / ")}
                </p>
              </div>
            ) : (
              <p className={styles.stack}>{project.technologies.slice(0, 2).join(" / ")}</p>
            )}
            <div className={styles.action}>
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
        );
      })}
    </ol>
  );
}
