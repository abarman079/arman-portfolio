import Image from "next/image";
import Link from "next/link";

import { CapabilityCardShell } from "@/components/motion/capability-card-shell";
import { capabilityDefinitions } from "@/content/capabilities";
import { projects } from "@/content/projects";

import { SectionHeading } from "../ui/section-heading";
import { CapabilityCanvasLoader } from "./capability-canvas-loader";
import styles from "./capability-gallery.module.css";

function findProject(slug: string) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`Capability references an unknown project: ${slug}`);
  }

  return project;
}

function CapabilityFallback({ variant }: { variant: string }) {
  return (
    <div className={`${styles.fallback} ${styles[`fallback-${variant}`]}`} aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

export function CapabilityGallery() {
  return (
    <section
      id="expertise"
      className={`section-block ${styles.section}`}
      aria-labelledby="expertise-title"
      data-motion-section="capabilities"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="02 / Engineering range"
          title="Four fields of engineering, connected."
          description="Each capability is anchored to verified project evidence. The dimensional layer is an enhancement; the projects, systems, and technical context remain complete without it."
          id="expertise-title"
        />

        <div className={styles.systemHeader} aria-hidden="true">
          <span>Capability gallery / CG—04</span>
          <span>Interface · system · model · data</span>
        </div>

        <div className={styles.cards} data-capability-gallery>
          {capabilityDefinitions.map((capability, capabilityIndex) => {
            const relatedProjects = capability.projectSlugs.map(findProject);
            const mediaProject = capability.media
              ? findProject(capability.media.projectSlug)
              : undefined;
            const media = capability.media
              ? mediaProject?.media?.[capability.media.mediaIndex]
              : undefined;
            const titleId = `capability-${capability.index}-title`;

            return (
              <CapabilityCardShell
                key={capability.index}
                index={capabilityIndex}
                labelledBy={titleId}
                className={`${styles.card} ${styles[`card-${capability.variant}`]}`}
              >
                {media ? (
                  <div className={styles.media} aria-hidden="true">
                    <Image
                      alt=""
                      fill
                      sizes={
                        capability.variant === "systems" || capability.variant === "data"
                          ? "(min-width: 64rem) 52vw, 100vw"
                          : "(min-width: 64rem) 38vw, 100vw"
                      }
                      src={media.src}
                    />
                  </div>
                ) : null}

                <CapabilityFallback variant={capability.variant} />

                <div className={styles.cardHeader}>
                  <p>{capability.index}</p>
                  <p>{String(relatedProjects.length).padStart(2, "0")} linked projects</p>
                </div>

                <div className={styles.cardBody} data-capability-body>
                  <p className={styles.domainLabel}>Engineering domain</p>
                  <h3 id={titleId}>{capability.title}</h3>
                  <p className={styles.description}>{capability.description}</p>

                  <ul className={styles.technologyList} aria-label="Relevant technologies">
                    {capability.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>

                  <nav className={styles.projectLinks} aria-label={`${capability.title} project evidence`}>
                    {relatedProjects.map((project) =>
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
                </div>
              </CapabilityCardShell>
            );
          })}

          <CapabilityCanvasLoader />
        </div>
      </div>
    </section>
  );
}
