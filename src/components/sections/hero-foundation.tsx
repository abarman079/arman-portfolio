import {
  additionalArchiveProjects,
  featuredArchiveProjects,
  flagshipProjects,
} from "@/content/projects";
import { siteConfig } from "@/lib/seo";

import { ActionLink } from "../ui/action-link";

const engineeringDomains = [
  "Product interfaces",
  "Backend systems",
  "Applied ML / CV",
  "Data and BI",
] as const;

export function HeroFoundation() {
  const archiveCount =
    featuredArchiveProjects.length + additionalArchiveProjects.length;

  return (
    <section className="hero-foundation" aria-labelledby="hero-title">
      <div className="site-container hero-foundation__grid">
        <div className="hero-foundation__copy">
          <p className="eyebrow">Md. Akibul Hasan Arman</p>
          <h1 id="hero-title">
            Software Engineer building{" "}
            <span className="editorial-text">full-stack products</span>, backend
            systems, and applied ML.
          </h1>
          <p className="hero-foundation__lede">
            A verified body of product, systems, research, and data work—organized
            around what was built, how it works, and the evidence behind it.
          </p>
          <div className="action-group" aria-label="Primary actions">
            <ActionLink href="/work" variant="primary">
              Explore work
            </ActionLink>
            <ActionLink
              href={siteConfig.githubUrl}
              external
              variant="secondary"
              ariaLabel="GitHub profile, opens in a new tab"
            >
              GitHub
            </ActionLink>
            <ActionLink href="/resume" variant="quiet">
              Read resume
            </ActionLink>
          </div>
        </div>

        <aside className="hero-index" aria-label="Portfolio scope">
          <div className="hero-index__header">
            <p className="eyebrow">System index</p>
            <p>Evidence-backed foundation</p>
          </div>

          <dl className="scope-stats">
            <div>
              <dt>Flagship work</dt>
              <dd>{String(flagshipProjects.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>Project archive</dt>
              <dd>{String(archiveCount).padStart(2, "0")}</dd>
            </div>
          </dl>

          <ol className="domain-index">
            {engineeringDomains.map((domain, index) => (
              <li key={domain}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {domain}
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
