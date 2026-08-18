import {
  additionalArchiveProjects,
  featuredArchiveProjects,
} from "@/content/projects";

import { ActionLink } from "../ui/action-link";
import { SectionHeading } from "../ui/section-heading";

export function ArchiveFoundation() {
  const archiveProjects = [
    ...featuredArchiveProjects,
    ...additionalArchiveProjects,
  ];

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

        <ol className="archive-grid">
          {archiveProjects.map((project, index) => (
            <li key={project.slug}>
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.canonicalName} repository, opens in a new tab`}
              >
                <span className="archive-grid__index">
                  {String(index + 5).padStart(2, "0")}
                </span>
                <span>
                  <strong>{project.canonicalName}</strong>
                  <small>{project.shortSummary}</small>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ol>

        <div className="section-action">
          <ActionLink href="/work" variant="primary">
            Open work index
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
