import Image from "next/image";
import Link from "next/link";

import { formatProjectTypes } from "@/lib/project-labels";
import type { CaseStudyBlock, ProjectRecord } from "@/types/project";
import { CaseStudyMotionShell } from "@/components/motion/case-study-motion-shell";

import { ActionLink } from "../../ui/action-link";
import { ArchitectureDiagram } from "./architecture-diagram";
import styles from "./case-study-page.module.css";

interface CaseStudyPageProps {
  project: ProjectRecord;
  projectIndex: number;
  nextProject: ProjectRecord;
}

function getStatusLabel(status: ProjectRecord["status"]) {
  if (status === "live") return "Verified deployment";
  if (status === "research") return "Offline research";
  if (status === "local") return "Local application";
  return "Repository project";
}

function DisplayProjectTitle({ name }: { name: string }) {
  const parts = name.replace(/([a-z])([A-Z])/g, "$1|$2").split("|");

  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {index > 0 ? <wbr /> : null}
      {part}
    </span>
  ));
}

function BlockHeading({
  heading,
  index,
}: {
  heading: string;
  index: number;
}) {
  return (
    <header className={styles.blockHeading}>
      <p>{String(index).padStart(2, "0")}</p>
      <h2 data-case-heading>{heading}</h2>
    </header>
  );
}

function CaseStudyContentBlock({
  block,
  index,
  project,
}: {
  block: CaseStudyBlock;
  index: number;
  project: ProjectRecord;
}) {
  if (block.type === "prose") {
    return (
      <section className={`${styles.block} ${styles.prose}`} data-case-block>
        <BlockHeading heading={block.heading} index={index} />
        <div className={styles.proseBody}>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "features") {
    return (
      <section className={`${styles.block} ${styles.features}`} data-case-block>
        <BlockHeading heading={block.heading} index={index} />
        {block.introduction ? (
          <p className={styles.introduction}>{block.introduction}</p>
        ) : null}
        <dl className={styles.featureList}>
          {block.items.map((item, itemIndex) => (
            <div key={item.title}>
              <dt>
                <span aria-hidden="true">
                  {String(itemIndex + 1).padStart(2, "0")}
                </span>
                {item.title}
              </dt>
              <dd>{item.description}</dd>
            </div>
          ))}
        </dl>
      </section>
    );
  }

  if (block.type === "architecture") {
    return (
      <section className={`${styles.block} ${styles.architectureBlock}`} data-case-block>
        <BlockHeading heading={block.heading} index={index} />
        <p className={styles.introduction}>{block.introduction}</p>
        <ArchitectureDiagram
          label={`${project.canonicalName} architecture diagram`}
          nodes={block.nodes}
          relationships={block.relationships}
        />
      </section>
    );
  }

  if (block.type === "decisions") {
    return (
      <section className={`${styles.block} ${styles.decisions}`} data-case-block>
        <BlockHeading heading={block.heading} index={index} />
        <ol className={styles.decisionList}>
          {block.items.map((item, itemIndex) => (
            <li key={item}>
              <span aria-hidden="true">
                {String(itemIndex + 1).padStart(2, "0")}
              </span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  if (block.type === "metrics") {
    const metrics = block.metricIndexes.flatMap((metricIndex) => {
      const metric = project.metrics?.[metricIndex];
      return metric ? [metric] : [];
    });

    return (
      <section className={`${styles.block} ${styles.metrics}`} data-case-block>
        <BlockHeading heading={block.heading} index={index} />
        <p className={styles.introduction}>{block.introduction}</p>
        <div className={styles.metricGrid}>
          {metrics.map((metric) => (
            <article key={metric.label} data-case-metric>
              <p className={styles.metricValue}>
                {metric.value}
                {metric.unit}
              </p>
              <h3>
                {metric.label} / {metric.modelOrSubject}
              </h3>
              <dl>
                <div>
                  <dt>Dataset</dt>
                  <dd>{metric.datasetContext}</dd>
                </div>
                <div>
                  <dt>Evaluation</dt>
                  <dd>{metric.splitOrEvaluationContext}</dd>
                </div>
                <div>
                  <dt>Limit</dt>
                  <dd>{metric.limitations}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "media") {
    const mediaItems = block.mediaIndexes.flatMap((mediaIndex) => {
      const media = project.media?.[mediaIndex];
      return media ? [media] : [];
    });

    return (
      <section className={`${styles.block} ${styles.mediaBlock}`} data-case-block>
        <BlockHeading heading={block.heading} index={index} />
        {block.introduction ? (
          <p className={styles.introduction}>{block.introduction}</p>
        ) : null}
        <div className={styles.mediaGrid}>
          {mediaItems.map((media) => (
            <figure className={styles.figure} key={media.src} data-case-media>
              <div className={styles.figureImage}>
                <Image
                  src={media.src}
                  width={media.width}
                  height={media.height}
                  alt={media.alt}
                  sizes="(max-width: 48rem) 92vw, (max-width: 90rem) 82vw, 76rem"
                />
              </div>
              {media.caption ? <figcaption>{media.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.block} ${styles.limitations}`} data-case-block>
      <BlockHeading heading={block.heading} index={index} />
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function CaseStudyPage({
  project,
  projectIndex,
  nextProject,
}: CaseStudyPageProps) {
  const caseStudy = project.caseStudy;
  const presentation = project.presentation;
  const heroMedia = project.media?.[0];

  if (!caseStudy || !presentation || !heroMedia) return null;

  const indexLabel = String(projectIndex).padStart(2, "0");

  return (
    <CaseStudyMotionShell className={styles.main}>
      <article
        className={`${styles.article} ${styles[presentation.variant]}`}
        aria-labelledby="case-study-title"
        data-case-study
      >
        <header className={styles.hero} data-case-hero>
          <div className="site-container">
            <Link className={styles.backLink} href="/work">
              <span aria-hidden="true">←</span> All work
            </Link>

            <div className={styles.heroMeta}>
              <p>{indexLabel} / Flagship case study</p>
              <p>{formatProjectTypes(project.projectTypes)}</p>
            </div>

            <h1 id="case-study-title" data-case-title>
              <DisplayProjectTitle name={project.canonicalName} />
            </h1>

            <div className={styles.heroLead}>
              <p>{project.shortSummary}</p>
              <div className={styles.heroActions}>
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
                  Repository
                </ActionLink>
              </div>
            </div>

            <figure className={styles.heroFigure} data-case-hero-media>
              <Image
                className={styles.heroImage}
                src={heroMedia.src}
                width={heroMedia.width}
                height={heroMedia.height}
                alt={heroMedia.alt}
                sizes="(max-width: 48rem) 92vw, (max-width: 96rem) 92vw, 88rem"
                preload
              />
              {heroMedia.caption ? (
                <figcaption>{heroMedia.caption}</figcaption>
              ) : null}
            </figure>

            <dl className={styles.factStrip}>
              <div>
                <dt>Type</dt>
                <dd>{formatProjectTypes(project.projectTypes)}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{getStatusLabel(project.status)}</dd>
              </div>
              <div>
                <dt>Core stack</dt>
                <dd>{project.technologies.slice(0, 5).join(" / ")}</dd>
              </div>
              <div>
                <dt>Primary record</dt>
                <dd>Public repository</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="site-container">
          <section className={styles.overview} aria-labelledby="overview-title" data-case-block>
            <p>Project overview</p>
            <h2 id="overview-title">{caseStudy.overview}</h2>
          </section>

          {caseStudy.blocks.map((block, blockIndex) => (
            <CaseStudyContentBlock
              block={block}
              index={blockIndex + 1}
              project={project}
              key={`${block.type}-${block.heading}`}
            />
          ))}

          <section className={`${styles.block} ${styles.stackBlock}`} data-case-block>
            <BlockHeading
              heading="Technical stack in the verified repository"
              index={caseStudy.blocks.length + 1}
            />
            <ul>
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <div className={styles.projectLinks}>
              {project.liveUrl ? (
                <ActionLink
                  href={project.liveUrl}
                  external
                  variant="secondary"
                  ariaLabel={`${project.canonicalName} live site, opens in a new tab`}
                >
                  Open live site
                </ActionLink>
              ) : null}
              <ActionLink
                href={project.repositoryUrl}
                external
                variant="primary"
                ariaLabel={`${project.canonicalName} repository, opens in a new tab`}
              >
                Inspect repository
              </ActionLink>
            </div>
          </section>
        </div>

        <nav className={styles.nextProject} aria-label="Case study navigation">
          <Link href={`/work/${nextProject.slug}`}>
            <span>Next flagship project</span>
            <strong>{nextProject.canonicalName}</strong>
            <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </article>
    </CaseStudyMotionShell>
  );
}
