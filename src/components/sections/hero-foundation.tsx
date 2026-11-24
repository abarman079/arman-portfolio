import Link from "next/link";

import { siteConfig } from "@/content/site";

import { SignatureScene } from "./signature-scene";
import { SignatureEnhancement } from "./signature-enhancement";
import styles from "./hero-foundation.module.css";
import "@/app/cinematic-tokens.css";

const evidenceLinks = [
  { slug: "framesignal", label: "FrameSignal", category: "Product" },
  { slug: "slatedesk", label: "SlateDesk", category: "Backend" },
  { slug: "cctv-violence-detection", label: "CCTV Violence Detection", category: "Research" },
] as const;

export function HeroFoundation() {
  return (
    <section className={`cinematic-v2 ${styles.hero}`} aria-labelledby="hero-title" data-motion-section="hero">
      <span className={styles.navSentinel} data-nav-sentinel aria-hidden="true" />
      <div className={`site-container ${styles.grid}`}>
        <div className={styles.copy} data-hero-copy>
          <div className={styles.kicker}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>Portfolio / {siteConfig.location}</span>
          </div>
          <h1 id="hero-title" className={styles.title}>
            <span>Md. Akibul</span>{" "}<span>Hasan Arman.</span>
          </h1>
          <div className={styles.identity}>
            <p className={styles.role}>Software Engineer</p>
            <p className={styles.intro}>I work on web applications, backend systems and machine learning. This is a selection of my projects and research.</p>
          </div>
          <div className={styles.actions}>
            <Link href="/#work" className="action-link action-link--primary">
              <span>View selected work</span><span aria-hidden="true">↓</span>
            </Link>
            <Link href={siteConfig.resumePageUrl} className={`action-link ${styles.resume}`}>
              <span>Resume</span><span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className={styles.stage}>
          <div className={styles.stageHeader}><span>Systems in motion</span><span aria-hidden="true">01 — 03</span></div>
          <SignatureEnhancement>
            <SignatureScene />
          </SignatureEnhancement>
          <div className={styles.stageFooter}><span>Interface / Logic / Data</span><span>System study 01</span></div>
        </div>
        <div className={styles.workStrip}>
          <p className={styles.workLabel}>Selected work <span aria-hidden="true">↘</span></p>
          <ul className={styles.evidenceList} data-hero-evidence>
            {evidenceLinks.map(({ slug, label, category }) => (
              <li key={slug}>
                <Link href={`/#project-${slug}`}>
                  <span className={styles.category}>{category}</span>
                  <span className={styles.projectName}>{label}</span>
                  <span className={styles.linkArrow} aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
