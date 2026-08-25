import Image from "next/image";
import Link from "next/link";

import { projects } from "@/content/projects";

import { InteractiveLabCanvasLoader } from "./interactive-lab-canvas-loader";
import styles from "./interactive-lab-section.module.css";

const relatedProjectSlugs = [
  "cctv-violence-detection",
  "face-based-anomaly-detection",
  "wall-crack-detection",
] as const;

function findProject(slug: (typeof relatedProjectSlugs)[number]) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`Interactive Lab references an unknown project: ${slug}`);
  }

  return project;
}

export function InteractiveLabSection() {
  const relatedProjects = relatedProjectSlugs.map(findProject);
  const researchProject = relatedProjects[0];
  const fallbackMedia = researchProject.media?.[0];

  if (!fallbackMedia) {
    throw new Error("Interactive Lab requires the verified CCTV research diagram.");
  }

  return (
    <section
      className={`section-block section-block--night ${styles.section}`}
      aria-labelledby="interactive-lab-title"
      data-ml-lab
      data-signal-phase="features"
    >
      <div className="site-container">
        <header className={styles.intro}>
          <p className={`eyebrow ${styles.eyebrow}`}>Interactive Lab / 01</p>
          <div className={styles.introBody}>
            <p className={styles.kicker}>Pixel field · GLSL—01</p>
            <h2 id="interactive-lab-title" data-motion-heading>
              From pixels to <em>signal.</em>
            </h2>
            <p className={styles.description}>
              A visual study inspired by classification, anomaly detection,
              and segmentation. The shader turns a procedural input field into
              features and threshold signals; it does not run the trained project models.
            </p>
          </div>
        </header>

        <div className={styles.labStage} data-ml-lab-stage>
          <div className={styles.stageHeader} aria-hidden="true">
            <span>Signal field / SF—01</span>
            <span>GPU study · custom vertex + fragment program</span>
          </div>

          <figure className={styles.visual}>
            <div className={styles.fallbackMedia}>
              <Image
                src={fallbackMedia.src}
                alt={fallbackMedia.alt}
                fill
                sizes="(min-width: 64rem) 72vw, 100vw"
              />
            </div>

            <div className={styles.staticSignal} aria-hidden="true">
              <span className={styles.scanLine} />
              <span className={styles.focusArea} />
              <span className={styles.coordinate}>X 042 / Y 018</span>
            </div>

            <InteractiveLabCanvasLoader />

            <div className={styles.visualLegend} aria-hidden="true">
              <span>Input field / sampled</span>
              <span>Threshold field / procedural</span>
            </div>
          </figure>

          <ol className={styles.signalSteps} aria-label="Visual processing sequence">
            <li data-ml-lab-step="input">
              <span>01</span>
              <div>
                <strong>Input</strong>
                <p>Spatial samples enter the field.</p>
              </div>
            </li>
            <li data-ml-lab-step="features">
              <span>02</span>
              <div>
                <strong>Features</strong>
                <p>Edges and local structure are emphasized.</p>
              </div>
            </li>
            <li data-ml-lab-step="signal">
              <span>03</span>
              <div>
                <strong>Signal</strong>
                <p>Threshold regions resolve into a decision surface.</p>
              </div>
            </li>
          </ol>
        </div>

        <div className={styles.related}>
          <div className={styles.relatedIntro}>
            <p className="eyebrow">Related research</p>
            <p>
              Three verified projects behind the visual language—one detailed
              case study and two source repositories.
            </p>
          </div>

          <nav className={styles.projectLinks} aria-label="Interactive Lab related projects">
            {relatedProjects.map((project, index) => {
              const isCaseStudy = project.slug === "cctv-violence-detection";
              const content = (
                <>
                  <span className={styles.projectIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.projectName}>{project.canonicalName}</span>
                  <span className={styles.projectAction}>
                    {isCaseStudy ? "Case study" : "Source"} {isCaseStudy ? "→" : "↗"}
                  </span>
                </>
              );

              return isCaseStudy ? (
                <Link href={`/work/${project.slug}`} key={project.slug}>
                  {content}
                </Link>
              ) : (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.canonicalName} source repository, opens in a new tab`}
                  key={project.slug}
                >
                  {content}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
