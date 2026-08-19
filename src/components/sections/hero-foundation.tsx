import {
  additionalArchiveProjects,
  featuredArchiveProjects,
  flagshipProjects,
} from "@/content/projects";
import { siteConfig } from "@/lib/seo";

import { HeroReveal } from "../motion/hero-reveal";
import { HeroActions } from "./hero-actions";
import styles from "./hero-foundation.module.css";
import { SignalFieldLoader } from "./signal-field-loader";

const engineeringDomains = [
  { index: "01", label: "Product interfaces", className: styles.domainOne },
  { index: "02", label: "Backend systems", className: styles.domainTwo },
  { index: "03", label: "Applied ML / CV", className: styles.domainThree },
  { index: "04", label: "Data and BI", className: styles.domainFour },
] as const;

export function HeroFoundation() {
  const archiveCount =
    featuredArchiveProjects.length + additionalArchiveProjects.length;

  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-title"
      data-motion-section="hero"
    >
      <span className={styles.navSentinel} data-nav-sentinel aria-hidden="true" />

      <div className={`site-container ${styles.grid}`}>
        <div className={styles.copy} data-hero-copy>
          <HeroReveal delay={0.02}>
            <p className={`eyebrow ${styles.identity}`}>{siteConfig.name}</p>
          </HeroReveal>

          <HeroReveal delay={0.07}>
            <h1 id="hero-title" className={styles.title}>
              <span>Software Engineer</span>
              <span>building <em>full-stack</em></span>
              <span>products, backend systems</span>
              <span><em>&amp; applied ML.</em></span>
            </h1>
          </HeroReveal>

          <HeroReveal delay={0.13}>
            <p className={styles.lede}>
              A verified body of product, systems, research, and data work—organized
              around what was built, how it works, and the evidence behind it.
            </p>
          </HeroReveal>

          <HeroReveal delay={0.19}>
            <HeroActions />
          </HeroReveal>
        </div>

        <HeroReveal className={styles.fieldColumn} delay={0.24}>
          <aside
            className={styles.field}
            data-signal-field
            data-hero-field
            aria-label="Engineering domain map"
          >
            <div className={styles.fieldHeader}>
              <p>Signal architecture</p>
              <p><span>04</span> connected domains</p>
            </div>

            <div className={styles.fieldFrame}>
              <SignalFieldLoader />
              <ol className={styles.domainMap}>
                {engineeringDomains.map((domain) => (
                  <li className={domain.className} key={domain.index}>
                    <span>{domain.index}</span>
                    <strong>{domain.label}</strong>
                  </li>
                ))}
              </ol>
              <p className={styles.coordinate} aria-hidden="true">SYS / 04—12</p>
            </div>
          </aside>
        </HeroReveal>

        <HeroReveal className={styles.meta} delay={0.29}>
          <div>
            <span>Based in</span>
            <strong>{siteConfig.location}</strong>
          </div>
          <div>
            <span>Portfolio index</span>
            <strong>{String(flagshipProjects.length).padStart(2, "0")} flagship / {String(archiveCount).padStart(2, "0")} archive</strong>
          </div>
          <nav aria-label="Hero profile links">
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile, opens in a new tab"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a href={siteConfig.emailHref}>Email <span aria-hidden="true">↗</span></a>
          </nav>
        </HeroReveal>
      </div>
    </section>
  );
}
