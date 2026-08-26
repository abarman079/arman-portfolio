import Link from "next/link";

import { capabilityDefinitions } from "@/content/capabilities";
import { projects } from "@/content/projects";

import styles from "./capability-gallery.module.css";

function findProject(slug: string) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`Capability references an unknown project: ${slug}`);
  }

  return project;
}

export function CapabilityGallery() {
  return (
    <section
      id="expertise"
      className={`section-block ${styles.section}`}
      aria-labelledby="expertise-title"
      data-motion-section="capabilities"
      data-capabilities-scene
    >
      <div className={`site-container ${styles.container}`}>
        <header className={styles.intro} data-capability-intro>
          <p className="eyebrow">Capabilities / Evidence</p>
          <h2 id="expertise-title">What the work proves.</h2>
          <p>
            Each area below points to a project that can be inspected in detail.
          </p>
        </header>

        <ol className={styles.register} aria-label="Engineering capability evidence">
          {capabilityDefinitions.map((capability) => {
            const relatedProjects = capability.projectSlugs.map(findProject);

            return (
              <li key={capability.index} data-capability-row>
                <p className={styles.index}>{capability.index}</p>
                <div className={styles.capability}>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </div>
                <nav
                  className={styles.evidence}
                  aria-label={`${capability.title} evidence`}
                >
                  <span>Evidence</span>
                  {relatedProjects.slice(0, 2).map((project) =>
                    project.tier === "flagship" ? (
                      <Link href={`/work/${project.slug}`} key={project.slug}>
                        {project.canonicalName} <span aria-hidden="true">→</span>
                      </Link>
                    ) : (
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.canonicalName} repository, opens in a new tab`}
                        key={project.slug}
                      >
                        {project.canonicalName} <span aria-hidden="true">↗</span>
                      </a>
                    ),
                  )}
                </nav>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
