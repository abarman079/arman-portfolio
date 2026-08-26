import {
  additionalArchiveProjects,
  featuredArchiveProjects,
} from "@/content/projects";

import { ActionLink } from "../ui/action-link";
import { ProjectArchive } from "../project/project-archive";
import styles from "./archive-foundation.module.css";

export function ArchiveFoundation() {
  return (
    <section
      className={`section-block section-block--surface ${styles.section}`}
      aria-labelledby="archive-title"
      data-motion-section="archive"
      data-archive-scene
    >
      <div className="site-container">
        <div className={styles.intro}>
          <div>
            <p className="eyebrow">More work / 08</p>
            <h2 id="archive-title">More work.</h2>
          </div>
          <p>
            Supporting research, data, and application work—kept secondary to
            the four case studies above.
          </p>
        </div>

        <div className={styles.group}>
          <div className={styles.groupHeader}>
            <h3>Featured studies</h3>
            <p>Research and data systems / 03 projects</p>
          </div>
          <ProjectArchive
            projects={featuredArchiveProjects}
            startIndex={5}
            variant="featured"
          />
        </div>

        <div className={styles.group}>
          <div className={styles.groupHeader}>
            <h3>Additional systems</h3>
            <p>Web applications / 05 projects</p>
          </div>
          <ProjectArchive
            projects={additionalArchiveProjects}
            startIndex={8}
            variant="additional"
          />
        </div>

        <div className="section-action">
          <ActionLink href="/work" variant="primary">
            Open work index
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
