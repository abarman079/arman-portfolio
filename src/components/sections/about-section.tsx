import { siteConfig } from "@/content/site";

import { ActionLink } from "../ui/action-link";
import styles from "./about-section.module.css";

export function AboutSection() {
  return (
    <section
      id="about"
      className={`section-block ${styles.section}`}
      aria-labelledby="about-title"
      data-motion-section="about"
      data-about-scene
    >
      <div className={`site-container ${styles.container}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>About</p>

        <div className={styles.statement} data-about-lead>
          <h2 id="about-title">
            I work across what a person sees and the rules that make it dependable.
          </h2>
        </div>

        <div className={styles.details}>
          <p>
            The common thread is practical engineering: clear interfaces,
            explicit system rules, and results that can be inspected in the source.
          </p>

          <dl>
            <div>
              <dt>Based in</dt>
              <dd>{siteConfig.location}</dd>
            </div>
          </dl>

          <ActionLink href={siteConfig.resumePageUrl} variant="quiet">
            Read the resume
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
