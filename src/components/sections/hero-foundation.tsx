import Image from "next/image";
import Link from "next/link";

import { flagshipProjects } from "@/content/projects";
import { siteConfig } from "@/content/site";

import { HeroReveal } from "../motion/hero-reveal";
import { HeroActions } from "./hero-actions";
import styles from "./hero-foundation.module.css";

const evidenceSpecs = [
  { slug: "framesignal", discipline: "Product", mediaIndex: 0 },
  { slug: "slatedesk", discipline: "Systems", mediaIndex: 0 },
  {
    slug: "cctv-violence-detection",
    discipline: "Applied ML",
    mediaIndex: 1,
  },
] as const;

const heroEvidence = evidenceSpecs.flatMap((spec) => {
  const project = flagshipProjects.find((item) => item.slug === spec.slug);
  const media = project?.media?.[spec.mediaIndex];

  return project && media ? [{ ...spec, project, media }] : [];
});

export function HeroFoundation() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-title"
      data-motion-section="hero"
    >
      <span className={styles.navSentinel} data-nav-sentinel aria-hidden="true" />

      <div className={`site-container ${styles.grid}`}>
        <div className={styles.copy} data-hero-copy>
          <HeroReveal delay={0.02}>
            <p className={`eyebrow ${styles.location}`}>
              Portfolio / {siteConfig.location}
            </p>
          </HeroReveal>

          <h1 id="hero-title" className={styles.title}>
            <span>Md. Akibul</span>
            <span>Hasan Arman.</span>
          </h1>

          <HeroReveal className={styles.identity} delay={0.13}>
            <p className={styles.role}>Software Engineer</p>
            <ul className={styles.scope} aria-label="Engineering focus">
              <li>Product &amp; full-stack applications</li>
              <li>Backend systems</li>
              <li>Applied machine learning</li>
            </ul>
          </HeroReveal>

          <HeroReveal delay={0.19}>
            <HeroActions />
          </HeroReveal>
        </div>

        <HeroReveal className={styles.evidence} delay={0.22}>
          <div className={styles.evidenceHeader}>
            <p>Work in view</p>
            <p>Real project evidence</p>
          </div>
          <ol className={styles.evidenceList} data-hero-evidence>
            {heroEvidence.map(({ discipline, media, project }) => (
              <li key={project.slug}>
                <Link
                  href={`/#project-${project.slug}`}
                  aria-label={`Jump to ${project.canonicalName} in selected work`}
                >
                  <figure>
                    <Image
                      src={media.src}
                      alt=""
                      fill
                      sizes="(max-width: 48rem) 44vw, (max-width: 72rem) 28vw, 13vw"
                    />
                    <figcaption>
                      <span>{discipline}</span>
                      <strong>{project.canonicalName}</strong>
                    </figcaption>
                  </figure>
                </Link>
              </li>
            ))}
          </ol>
        </HeroReveal>
      </div>
    </section>
  );
}
