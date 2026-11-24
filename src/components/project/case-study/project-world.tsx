import Image from "next/image";
import type { ProjectRecord } from "@/types/project";
import styles from "./project-world.module.css";

/** Composes approved media without cropping or simulating product functionality. */
export function ProjectWorld({ project }: { project: ProjectRecord }) {
  const [primary, secondary] = project.media ?? [];
  if (!primary) return null;

  return (
    <section className={styles.world} data-project-world={project.slug} aria-label={`${project.canonicalName} project visuals`} data-case-hero-media>
      <div className={styles.strip}>
        <span>{project.presentation?.homepageStory.label ?? project.canonicalName}</span>
        <span>Project evidence / {secondary ? "02" : "01"} views</span>
      </div>
      <div className={styles.stage}>
        <span className={styles.light} data-case-world-light aria-hidden="true" />
        <div className={styles.composition}>
          <figure className={`${styles.frame} ${styles.primary}`} data-world-primary>
            <Image
              src={primary.src}
              width={primary.width}
              height={primary.height}
              alt={primary.alt}
              sizes="(max-width: 48rem) 88vw, (max-width: 90rem) 58vw, 58rem"
              preload
              data-project-transition-target={project.slug}
            />
            {primary.caption ? <figcaption>{primary.caption}</figcaption> : null}
          </figure>
          {secondary ? (
            <figure className={`${styles.frame} ${styles.secondary}`} data-case-world-secondary>
              <Image
                src={secondary.src}
                width={secondary.width}
                height={secondary.height}
                alt={secondary.alt}
                sizes="(max-width: 48rem) 88vw, (max-width: 90rem) 34vw, 34rem"
              />
              {secondary.caption ? <figcaption>{secondary.caption}</figcaption> : null}
            </figure>
          ) : null}
        </div>
      </div>
      <div className={styles.foot}>
        <span>{project.status === "research" ? "Offline research artifacts" : "Documented product interfaces"}</span>
        <span>Source-linked media</span>
      </div>
    </section>
  );
}

export function CaseChapterIndex({ project }: { project: ProjectRecord }) {
  const blocks = project.caseStudy?.blocks ?? [];
  return (
    <nav className={styles.chapters} aria-label="Case study chapters" data-case-chapters>
      <div className={styles.chapterLead}>
        <p>Contents</p>
        <span>Read in order, or go straight to the evidence.</span>
      </div>
      <ol>
        <li><a href="#overview-title"><span aria-hidden="true">00</span>Project overview</a></li>
        {project.slug === "phishing-website-detection" || project.slug === "wall-crack-detection" ? (
          <li><a href="#case-research-comparison"><span aria-hidden="true">↳</span>Compare measured results</a></li>
        ) : null}
        {blocks.map((block, index) => (
          <li key={`${block.type}-${block.heading}`}>
            <a href={`#case-chapter-${index + 1}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{block.heading}</a>
          </li>
        ))}
        <li><a href={`#case-chapter-${blocks.length + 1}`}><span aria-hidden="true">{String(blocks.length + 1).padStart(2, "0")}</span>Technical stack</a></li>
      </ol>
    </nav>
  );
}
