import Image from "next/image";

import type { ProjectRecord } from "@/types/project";

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
        const media = project.media?.[0];

        if (!media) {
          throw new Error(`Archive project is missing media: ${project.slug}`);
        }

        if (variant === "featured") {
          return (
            <li className={styles.item} key={project.slug}>
              <figure className={styles.featuredMedia}>
                <div className={styles.featuredFrame}>
                  <Image
                    alt={media.alt}
                    fill
                    sizes="(min-width: 64rem) 48vw, (min-width: 48rem) 46vw, 100vw"
                    src={media.src}
                  />
                </div>
                <figcaption>
                  <span aria-label={`Project ${index}`}>{index}</span>
                </figcaption>
              </figure>

              <div className={styles.featuredCopy}>
                <h3>{project.canonicalName}</h3>
                <p className={styles.summary}>{project.shortSummary}</p>
                <div className={styles.action}>
                  <ActionLink
                    href={project.repositoryUrl}
                    external
                    variant="quiet"
                    ariaLabel={`Source — ${project.canonicalName} repository, opens in a new tab`}
                  >
                    Source
                  </ActionLink>
                </div>
              </div>
            </li>
          );
        }

        return (
          <li className={styles.item} key={project.slug}>
            <p className={styles.index} aria-label={`Project ${index}`}>
              {index}
            </p>
            <figure className={styles.thumbnail}>
              <Image
                alt={media.alt}
                fill
                sizes="(min-width: 48rem) 140px, 34vw"
                src={media.src}
              />
            </figure>
            <div className={styles.identity}>
              <h3>{project.canonicalName}</h3>
              <p className={styles.summary}>{project.shortSummary}</p>
            </div>
            <div className={styles.action}>
              <ActionLink
                href={project.repositoryUrl}
                external
                variant="quiet"
                ariaLabel={`Source — ${project.canonicalName} repository, opens in a new tab`}
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
