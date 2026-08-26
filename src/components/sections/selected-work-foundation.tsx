import { flagshipProjects } from "@/content/projects";

import { HomepageFlagshipStories } from "../project/homepage-flagship-stories";
import { ActionLink } from "../ui/action-link";
import styles from "./selected-work-foundation.module.css";

export function SelectedWorkFoundation() {
  return (
    <section
      id="work"
      className={styles.section}
      aria-labelledby="selected-work-title"
      data-motion-section="work"
      data-work-scene
    >
      <div className={`site-container ${styles.intro}`}>
        <h2 id="selected-work-title">Selected work</h2>
        <span aria-hidden="true">01—04</span>
      </div>

      <HomepageFlagshipStories projects={flagshipProjects} />

      <div className={styles.outro}>
        <div className="site-container">
          <ActionLink href="/work" variant="secondary">
            View the complete work index
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
