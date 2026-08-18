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
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="03 / Additional work"
          title="A broader record, without flattening every project into a feature."
          id="archive-title"
        />

        <div className={styles.group}>
          <div className={styles.groupHeader}>
            <h3>Featured archive</h3>
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
            <h3>Additional archive</h3>
            <p>Supporting application work / 05 projects</p>
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
