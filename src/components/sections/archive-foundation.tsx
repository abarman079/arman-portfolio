import {
  additionalArchiveProjects,
  featuredArchiveProjects,
} from "@/content/projects";

import { ActionLink } from "../ui/action-link";
import { ProjectArchive } from "../project/project-archive";
import { SectionHeading } from "../ui/section-heading";
import styles from "./archive-foundation.module.css";

export function ArchiveFoundation() {
  return (
    <section
      className="section-block section-block--surface"
      aria-labelledby="archive-title"
      data-motion-section="archive"
    >
      <div className="site-container">
        <div className={styles.intro}>
          <SectionHeading
            eyebrow="03 / More work"
            title="Research, systems, and working software."
            description="Three research and data projects lead into five supporting applications."
            id="archive-title"
          />
        </div>

        <div className={styles.group} data-archive-group>
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

        <div className={styles.group} data-archive-group>
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
