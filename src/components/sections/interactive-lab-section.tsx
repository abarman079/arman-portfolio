import Link from "next/link";

import { InteractiveLabCanvasLoader } from "./interactive-lab-canvas-loader";
import styles from "./interactive-lab-section.module.css";

export function InteractiveLabSection() {
  return (
    <section
      className={`section-block section-block--night ${styles.section}`}
      aria-labelledby="interactive-lab-title"
      data-ml-lab
      data-signal-phase="features"
      data-motion-section="lab"
    >
      <div className={`site-container ${styles.container}`}>
        <header className={styles.intro}>
          <p className={`eyebrow ${styles.eyebrow}`}>Graphics experiment / GLSL</p>
          <div className={styles.introBody}>
            <h2 id="interactive-lab-title" data-motion-heading>
              A shader, <em>explained plainly.</em>
            </h2>
            <p className={styles.description}>
              This custom GPU program distorts a procedural pattern, emphasizes
              its edges, and applies a color threshold. It is a graphics study—not
              a trained model or an ML prediction.
            </p>
          </div>
        </header>

        <div className={styles.labStage} data-ml-lab-stage>
          <div className={styles.stageHeader}>
            <span>Custom vertex + fragment shader</span>
            <span>Move a pointer to shift the transformation</span>
          </div>

          <figure className={styles.visual}>
            <div className={styles.staticSignal} aria-hidden="true">
              <span className={styles.staticSource} />
              <span className={styles.staticEdge} />
              <span className={styles.staticThreshold} />
            </div>

            <InteractiveLabCanvasLoader />

            <figcaption>
              A procedural image transformed in three visible steps. The animated
              version loads only on eligible desktop devices.
            </figcaption>
          </figure>

          <ol className={styles.signalSteps} aria-label="Shader transformation sequence">
            <li data-ml-lab-step="input">
              <span>01</span>
              <div>
                <strong>Source pattern</strong>
                <p>A generated monochrome surface enters the shader.</p>
              </div>
            </li>
            <li data-ml-lab-step="features">
              <span>02</span>
              <div>
                <strong>Edge emphasis</strong>
                <p>Distortion and contrast make local structure more visible.</p>
              </div>
            </li>
            <li data-ml-lab-step="signal">
              <span>03</span>
              <div>
                <strong>Color threshold</strong>
                <p>Selected values resolve into the orange signal layer.</p>
              </div>
            </li>
          </ol>
        </div>

        <p className={styles.researchNote}>
          Looking for the real model and evaluation?{" "}
          <Link href="/work/cctv-violence-detection">Read the CCTV case study</Link>.
        </p>
      </div>
    </section>
  );
}
