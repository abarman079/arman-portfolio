import Image from "next/image";
import Link from "next/link";

import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

import { ActionLink } from "../ui/action-link";
import { SectionHeading } from "../ui/section-heading";
import styles from "./about-section.module.css";

const technologyGroups = [
  {
    index: "01",
    title: "Frontend and product UI",
    technologies: ["Next.js", "React", "TypeScript", "Motion", "TanStack Query"],
    projectSlugs: ["slatedesk", "framesignal", "arctic-daze"],
  },
  {
    index: "02",
    title: "Backend, APIs, and persistence",
    technologies: ["ASP.NET Core", "PostgreSQL", "Supabase", "PHP", "MySQL"],
    projectSlugs: ["slatedesk", "framesignal", "travelease"],
  },
  {
    index: "03",
    title: "Machine learning and computer vision",
    technologies: ["Python", "TensorFlow", "scikit-learn", "U-Net++", "MobileNetV2"],
    projectSlugs: [
      "cctv-violence-detection",
      "face-based-anomaly-detection",
      "wall-crack-detection",
    ],
  },
  {
    index: "04",
    title: "Data and business intelligence",
    technologies: ["SQL Server", "Power BI", "Power Query", "DAX"],
    projectSlugs: ["retail-data-warehouse-bi"],
  },
  {
    index: "05",
    title: "Testing and delivery",
    technologies: ["xUnit", "Vercel", "Jupyter Notebook", "Supabase Storage"],
    projectSlugs: ["slatedesk", "framesignal", "cctv-violence-detection"],
  },
] as const;

function findProject(slug: string) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`About section references an unknown project: ${slug}`);
  }

  return project;
}

function findMedia(slug: string, mediaIndex: number) {
  const project = findProject(slug);
  const media = project.media?.[mediaIndex];

  if (!media) {
    throw new Error(`About section references missing media: ${slug}/${mediaIndex}`);
  }

  return { media, project };
}

export function AboutSection() {
  const evidenceMedia = [
    findMedia("framesignal", 1),
    findMedia("arctic-daze", 1),
    findMedia("slatedesk", 1),
  ];

  return (
    <section
      id="about"
      className={`section-block ${styles.section}`}
      aria-labelledby="about-title"
      data-motion-section="about"
      data-about-scene
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="04 / Approach"
          title="The connecting layer between interface and infrastructure."
          description="The projects span product interfaces, backend rules, model evaluation, and analytical systems."
          id="about-title"
        />

        <div className={styles.narrative}>
          <div className={styles.leadBlock} data-about-lead>
            <p className={styles.kicker}>System thinking / product clarity</p>
            <p className={styles.lead}>
              I work across what a person sees and the rules that make the experience dependable.
            </p>
          </div>

          <div className={styles.body}>
            <p>
              The selected work covers role-aware application workflows, editorial product systems,
              responsive commerce interfaces, applied computer vision, and dimensional reporting.
            </p>
            <p>
              The common thread is practical engineering: clear interfaces, explicit system rules,
              and results that can be inspected in the source.
            </p>
          </div>

          <aside className={styles.profile} aria-label="Profile details">
            <dl>
              <div>
                <dt>Based in</dt>
                <dd>{siteConfig.location}</dd>
              </div>
              <div>
                <dt>Selected work</dt>
                <dd>{projects.length} projects</dd>
              </div>
            </dl>
            <div className={styles.profileLinks}>
              <ActionLink href={siteConfig.githubUrl} external variant="quiet">
                GitHub
              </ActionLink>
              <ActionLink href={siteConfig.linkedinUrl} external variant="quiet">
                LinkedIn
              </ActionLink>
              <ActionLink href={siteConfig.resumePageUrl} variant="quiet">
                Resume
              </ActionLink>
            </div>
          </aside>
        </div>

        <div
          className={styles.evidenceMosaic}
          aria-label="Selected project interfaces"
          data-about-mosaic
        >
          {evidenceMedia.map(({ media, project }, index) => (
            <figure
              className={styles[`evidence${index + 1}`]}
              key={media.src}
              data-about-figure
            >
              <div className={styles.imageFrame}>
                <Image
                  alt={media.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(min-width: 64rem) 48vw, (min-width: 48rem) 62vw, 100vw"
                      : "(min-width: 64rem) 24vw, (min-width: 48rem) 32vw, 50vw"
                  }
                  src={media.src}
                />
              </div>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Link href={`/work/${project.slug}`}>{project.canonicalName}</Link>
                <span>{media.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <section className={styles.ecosystem} aria-labelledby="ecosystem-title">
          <header className={styles.ecosystemHeader}>
            <p className="eyebrow">Technology ecosystem</p>
            <h3 id="ecosystem-title">Tools in context, not a badge wall.</h3>
            <p>
              Technologies are grouped by the work they support. Each project link leads to a case
              study or source repository.
            </p>
          </header>

          <ol className={styles.ecosystemList}>
            {technologyGroups.map((group) => (
              <li key={group.index}>
                <p className={styles.groupIndex}>{group.index}</p>
                <h4>{group.title}</h4>
                <p className={styles.technologies}>{group.technologies.join(" / ")}</p>
                <div className={styles.projectEvidence}>
                  {group.projectSlugs.map((slug) => {
                    const project = findProject(slug);

                    return project.tier === "flagship" ? (
                      <Link href={`/work/${project.slug}`} key={slug}>
                        {project.canonicalName}
                      </Link>
                    ) : (
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noreferrer"
                        key={slug}
                        aria-label={`${project.canonicalName} repository, opens in a new tab`}
                      >
                        {project.canonicalName}
                      </a>
                    );
                  })}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className={styles.handoff}>
          <p>Four engineering domains, shown through working projects.</p>
          <ActionLink href="#contact" variant="primary">
            Start a conversation
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
