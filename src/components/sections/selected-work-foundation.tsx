import { flagshipProjects } from "@/content/projects";

import { ProjectList } from "../project/project-list";
import { ActionLink } from "../ui/action-link";
import { SectionHeading } from "../ui/section-heading";

export function SelectedWorkFoundation() {
  return (
    <section
      id="work"
      className="section-block section-block--night"
      aria-labelledby="selected-work-title"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="01 / Selected work"
          title="Systems first. Presentation follows the evidence."
          description="Four projects lead the portfolio because they provide the clearest combination of engineering depth, product thinking, research discipline, and complete implementation."
          id="selected-work-title"
          tone="dark"
        />

        <ProjectList projects={flagshipProjects} />

        <div className="section-action">
          <ActionLink href="/work" variant="secondary">
            View the complete work index
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
