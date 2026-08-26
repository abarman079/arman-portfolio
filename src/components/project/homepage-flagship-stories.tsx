import Image from "next/image";
import type { ReactNode } from "react";

import { FlagshipScrollShell } from "@/components/motion/flagship-scroll-shell";
import { ProjectTransitionLink } from "@/components/motion/project-transition-provider";
import type { ProjectRecord } from "@/types/project";

import { ActionLink } from "../ui/action-link";
import styles from "./homepage-flagship-stories.module.css";

interface HomepageFlagshipStoriesProps {
  projects: readonly ProjectRecord[];
}

interface StoryProps {
  index: number;
  project: ProjectRecord;
}

function StoryHeader({ index, project }: StoryProps) {
  const story = project.presentation?.homepageStory;
  if (!story) return null;

  return (
    <header className={styles.storyHeader} data-project-story-copy>
      <p className={styles.storyMeta}>
        <span>{String(index).padStart(2, "0")}</span>
        <span>{story.label}</span>
      </p>
      <h3 className={styles.storyTitle} data-project-title>
        {project.canonicalName}
      </h3>
      <p className={styles.storyThesis}>{story.thesis}</p>
    </header>
  );
}

function StoryLinks({ project }: { project: ProjectRecord }) {
  return (
    <div className={styles.storyLinks}>
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
        ariaLabel={`${project.canonicalName} source repository, opens in a new tab`}
      >
        Source
      </ActionLink>
    </div>
  );
}

function CaseStudyLink({
  children,
  className,
  project,
}: {
  children: ReactNode;
  className: string;
  project: ProjectRecord;
}) {
  if (!project.presentation) return null;

  return (
    <ProjectTransitionLink
      className={className}
      href={`/work/${project.slug}`}
      ariaLabel={`View ${project.canonicalName} case study`}
      projectSlug={project.slug}
      variant={project.presentation.variant}
    >
      <span className={styles.viewLabel} aria-hidden="true">
        View case study <span>→</span>
      </span>
      {children}
    </ProjectTransitionLink>
  );
}

function SlateDeskStory({ index, project }: StoryProps) {
  const story = project.presentation?.homepageStory;
  const [overview, assignment] = project.media ?? [];
  if (!story || !overview || !assignment) return null;

  return (
    <li>
      <article
        id={`project-${project.slug}`}
        className={`${styles.story} ${styles.slatedesk}`}
        data-project-stage
        data-project-variant="architecture"
      >
        <div className={`site-container ${styles.inner}`}>
          <StoryHeader index={index} project={project} />

          <div className={styles.slateBody}>
            <div className={styles.slateMedia} data-project-story-media>
              <CaseStudyLink className={styles.slateLink} project={project}>
                <figure className={styles.slateOverview}>
                  <Image
                    src={overview.src}
                    width={overview.width}
                    height={overview.height}
                    alt={overview.alt}
                    sizes="(max-width: 48rem) 92vw, 68vw"
                    data-project-transition-source={project.slug}
                  />
                  <figcaption>{overview.caption}</figcaption>
                </figure>
                <figure className={styles.slateAssignment}>
                  <Image
                    src={assignment.src}
                    width={assignment.width}
                    height={assignment.height}
                    alt={assignment.alt}
                    sizes="(max-width: 48rem) 48vw, 28vw"
                  />
                  <figcaption>{assignment.caption}</figcaption>
                </figure>
              </CaseStudyLink>
            </div>

            <aside className={styles.requestPath} data-project-story-evidence>
              <p>One request through the system</p>
              <ol>
                {story.steps.map((step) => (
                  <li key={step.label}>
                    <span>{step.label}</span>
                    <strong>{step.detail}</strong>
                  </li>
                ))}
              </ol>
            </aside>
          </div>

          <StoryLinks project={project} />
        </div>
      </article>
    </li>
  );
}

function FrameSignalStory({ index, project }: StoryProps) {
  const story = project.presentation?.homepageStory;
  const [decision, publicHome] = project.media ?? [];
  if (!story || !decision || !publicHome) return null;

  return (
    <li>
      <article
        id={`project-${project.slug}`}
        className={`${styles.story} ${styles.framesignal}`}
        data-project-stage
        data-project-variant="editorial"
      >
        <div className={`site-container ${styles.inner}`}>
          <StoryHeader index={index} project={project} />

          <div className={styles.frameMedia} data-project-story-media>
            <CaseStudyLink className={styles.frameLink} project={project}>
              <figure className={styles.frameDecision}>
                <Image
                  src={decision.src}
                  width={decision.width}
                  height={decision.height}
                  alt={decision.alt}
                  sizes="(max-width: 48rem) 92vw, 61vw"
                  data-project-transition-source={project.slug}
                />
                <figcaption>{story.steps[0].label}</figcaption>
              </figure>

              <div className={styles.spoilerBoundary} aria-hidden="true">
                <span>{story.steps[1].label}</span>
                <i />
                <span>Spoiler-safe</span>
              </div>

              <figure className={styles.frameHome}>
                <Image
                  src={publicHome.src}
                  width={publicHome.width}
                  height={publicHome.height}
                  alt={publicHome.alt}
                  sizes="(max-width: 48rem) 86vw, 32vw"
                />
                <figcaption>{story.steps[2].label}</figcaption>
              </figure>
            </CaseStudyLink>
          </div>

          <ol className={styles.decisionSequence} data-project-story-evidence>
            {story.steps.map((step, stepIndex) => (
              <li key={step.label}>
                <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                <strong>{step.label}</strong>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>

          <StoryLinks project={project} />
        </div>
      </article>
    </li>
  );
}

function ArcticDazeStory({ index, project }: StoryProps) {
  const story = project.presentation?.homepageStory;
  const [desktop, mobile] = project.media ?? [];
  if (!story || !desktop || !mobile) return null;

  return (
    <li>
      <article
        id={`project-${project.slug}`}
        className={`${styles.story} ${styles.arctic}`}
        data-project-stage
        data-project-variant="commerce"
      >
        <div className={`site-container ${styles.inner}`}>
          <StoryHeader index={index} project={project} />

          <div className={styles.arcticMedia} data-project-story-media>
            <CaseStudyLink className={styles.arcticLink} project={project}>
              <figure className={styles.arcticDesktop}>
                <Image
                  src={desktop.src}
                  width={desktop.width}
                  height={desktop.height}
                  alt={desktop.alt}
                  sizes="(max-width: 48rem) 64vw, 38vw"
                  data-project-transition-source={project.slug}
                />
                <figcaption>{desktop.caption}</figcaption>
              </figure>
              <p className={styles.arcticRoute} aria-hidden="true">
                Malaysia <span>→</span> Bangladesh
              </p>
              <figure className={styles.arcticMobile}>
                <Image
                  src={mobile.src}
                  width={mobile.width}
                  height={mobile.height}
                  alt={mobile.alt}
                  sizes="(max-width: 48rem) 35vw, 18vw"
                />
                <figcaption>{mobile.caption}</figcaption>
              </figure>
            </CaseStudyLink>
          </div>

          <ol className={styles.commerceSequence} data-project-story-evidence>
            {story.steps.map((step) => (
              <li key={step.label}>
                <strong>{step.label}</strong>
                <span>{step.detail}</span>
              </li>
            ))}
          </ol>

          <StoryLinks project={project} />
        </div>
      </article>
    </li>
  );
}

function CctvStory({ index, project }: StoryProps) {
  const story = project.presentation?.homepageStory;
  const [architecture, evaluation] = project.media ?? [];
  if (!story || !architecture || !evaluation || !project.metrics) return null;

  return (
    <li>
      <article
        id={`project-${project.slug}`}
        className={`${styles.story} ${styles.cctv}`}
        data-project-stage
        data-project-variant="research"
      >
        <div className={`site-container ${styles.inner}`}>
          <StoryHeader index={index} project={project} />

          <ol className={styles.researchFlow} data-project-story-evidence>
            {story.steps.map((step, stepIndex) => (
              <li key={step.label}>
                <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                <strong>{step.label}</strong>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>

          <div className={styles.cctvMedia} data-project-story-media>
            <CaseStudyLink className={styles.cctvLink} project={project}>
              <figure className={styles.pipelineFigure}>
                <Image
                  src={architecture.src}
                  width={architecture.width}
                  height={architecture.height}
                  alt={architecture.alt}
                  sizes="(max-width: 48rem) 92vw, 72vw"
                  data-project-transition-source={project.slug}
                />
                <figcaption>{architecture.caption}</figcaption>
              </figure>
              <figure className={styles.matrixFigure}>
                <Image
                  src={evaluation.src}
                  width={evaluation.width}
                  height={evaluation.height}
                  alt={evaluation.alt}
                  sizes="(max-width: 48rem) 78vw, 24vw"
                />
                <figcaption>
                  Evaluation example: MobileNetV2 on the frozen test split
                </figcaption>
              </figure>
            </CaseStudyLink>
          </div>

          <div className={styles.metricEvidence}>
            <div>
              <p>Best documented comparison</p>
              <strong>Multilayer perceptron</strong>
            </div>
            {project.metrics.map((metric) => (
              <div className={styles.metric} key={metric.label}>
                <p>{metric.value.toFixed(2)}{metric.unit}</p>
                <span>{metric.label}</span>
              </div>
            ))}
            <p className={styles.metricContext}>
              Balanced 5,000-image working subset · frozen 750-image test split ·
              offline experiment, not production CCTV performance.
            </p>
          </div>

          <StoryLinks project={project} />
        </div>
      </article>
    </li>
  );
}

function HomepageFlagshipStory({ index, project }: StoryProps) {
  switch (project.presentation?.variant) {
    case "architecture":
      return <SlateDeskStory index={index} project={project} />;
    case "editorial":
      return <FrameSignalStory index={index} project={project} />;
    case "commerce":
      return <ArcticDazeStory index={index} project={project} />;
    case "research":
      return <CctvStory index={index} project={project} />;
    default:
      return null;
  }
}

export function HomepageFlagshipStories({
  projects,
}: HomepageFlagshipStoriesProps) {
  return (
    <FlagshipScrollShell
      listClassName={styles.list}
      mode="story"
      projectCount={projects.length}
    >
      {projects.map((project, projectIndex) => (
        <HomepageFlagshipStory
          index={projectIndex + 1}
          key={project.slug}
          project={project}
        />
      ))}
    </FlagshipScrollShell>
  );
}
