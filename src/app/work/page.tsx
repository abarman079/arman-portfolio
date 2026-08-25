import { FlagshipProjects } from "@/components/project/flagship-projects";
import { ProjectArchive } from "@/components/project/project-archive";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  additionalArchiveProjects,
  featuredArchiveProjects,
  flagshipProjects,
} from "@/content/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Work",
  "A curated index of full-stack systems, frontend products, machine-learning research, and data work by Md. Akibul Hasan Arman.",
  { path: "/work" },
);

export default function WorkPage() {
  return (
    <main id="main-content" className="work-page" tabIndex={-1}>
      <section className="page-intro" aria-labelledby="work-page-title">
        <div className="site-container page-intro__grid">
          <p className="eyebrow">Work index / 12 projects</p>
          <div>
            <h1 id="work-page-title">Projects across product, backend, research, and data.</h1>
            <p>
              Four flagship case studies lead the collection. Research and
              supporting application work follow in a compact index.
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
            title="Flagship case studies."
            id="flagship-title"
            tone="dark"
          />
          <FlagshipProjects projects={flagshipProjects} />
        </div>
      </section>

      <section className="section-block work-group" aria-labelledby="featured-title">
        <div className="site-container">
          <SectionHeading
            eyebrow="02 / Featured archive"
            title="Research and data projects."
            id="featured-title"
          />
          <ProjectArchive
            projects={featuredArchiveProjects}
            startIndex={5}
            variant="featured"
          />
        </div>
      </section>

      <section
        className="section-block section-block--surface work-group"
        aria-labelledby="additional-title"
      >
        <div className="site-container">
          <SectionHeading
            eyebrow="03 / Additional archive"
            title="Supporting web applications and demonstrations."
            id="additional-title"
          />
          <ProjectArchive
            projects={additionalArchiveProjects}
            startIndex={8}
            variant="additional"
          />
        </div>
      </section>
    </main>
  );
}
