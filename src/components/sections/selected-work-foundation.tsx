import { flagshipProjects } from "@/content/projects";

import { FlagshipProjects } from "../project/flagship-projects";
import { ActionLink } from "../ui/action-link";
import { SectionHeading } from "../ui/section-heading";
import styles from "./selected-work-foundation.module.css";

export function SelectedWorkFoundation() {
  return (
    <section
      id="work"
      className={`section-block section-block--night ${styles.section}`}
      aria-labelledby="selected-work-title"
      data-motion-section="work"
      data-work-scene
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="01 / Selected work"
          title="Four systems. Four engineering problems."
          description="Full-stack architecture, editorial product thinking, responsive commerce UI, and applied computer-vision research."
          id="selected-work-title"
          tone="dark"
        />

        <FlagshipProjects projects={flagshipProjects} />

        <div className="section-action">
          <ActionLink href="/work" variant="secondary">
            View the complete work index
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
