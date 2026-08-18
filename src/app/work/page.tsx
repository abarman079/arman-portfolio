import { ProjectList } from "@/components/project/project-list";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  additionalArchiveProjects,
  featuredArchiveProjects,
  flagshipProjects,
} from "@/content/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Work",
  "A verified index of full-stack systems, frontend products, machine-learning research, and data work by Md. Akibul Hasan Arman.",
);

export default function WorkPage() {
  return (
    <main id="main-content" className="work-page">
      <section className="page-intro" aria-labelledby="work-page-title">
        <div className="site-container page-intro__grid">
          <p className="eyebrow">Work index / 12 projects</p>
          <div>
            <h1 id="work-page-title">
              Projects with evidence behind the interface.
            </h1>
            <p>
              The hierarchy reflects the strength and completeness of the source
              material. Unknown dates, roles, outcomes, and unverified deployments
              remain intentionally absent.
            </p>
          </div>
        </div>
      </section>

      <section
        className="section-block section-block--night work-group"
        aria-labelledby="flagship-title"
      >
        <div className="site-container">
          <SectionHeading
            eyebrow="01 / Flagship"
            title="The primary engineering record."
            id="flagship-title"
            tone="dark"
          />
          <ProjectList projects={flagshipProjects} />
        </div>
      </section>

      <section className="section-block work-group" aria-labelledby="featured-title">
        <div className="site-container">
          <SectionHeading
            eyebrow="02 / Featured archive"
            title="Research and data work with substantial supporting evidence."
            id="featured-title"
          />
          <ProjectList projects={featuredArchiveProjects} startIndex={5} compact />
        </div>
      </section>

      <section
        className="section-block section-block--surface work-group"
        aria-labelledby="additional-title"
      >
        <div className="site-container">
          <SectionHeading
            eyebrow="03 / Additional archive"
            title="Supporting systems, demonstrations, and local application work."
            id="additional-title"
          />
          <ProjectList projects={additionalArchiveProjects} startIndex={8} compact />
        </div>
      </section>
    </main>
  );
}
