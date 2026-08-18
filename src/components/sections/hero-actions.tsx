"use client";

import Link from "next/link";

import { MagneticOffset } from "@/components/motion/magnetic-offset";
import { siteConfig } from "@/lib/seo";

import styles from "./hero-foundation.module.css";

export function HeroActions() {
  return (
    <div className={styles.actions} aria-label="Primary actions">
      <Link href="/#work" className="action-link action-link--primary">
        <MagneticOffset className={styles.actionInner}>
          <span>Explore work</span>
          <span className="action-link__mark" aria-hidden="true">↓</span>
        </MagneticOffset>
      </Link>
      <a
        href={siteConfig.githubUrl}
        className="action-link action-link--secondary"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub profile, opens in a new tab"
      >
        <MagneticOffset className={styles.actionInner}>
          <span>GitHub</span>
          <span className="action-link__mark" aria-hidden="true">↗</span>
        </MagneticOffset>
      </a>
      <Link href={siteConfig.resumePageUrl} className="action-link action-link--quiet">
        <MagneticOffset className={styles.actionInner}>
          <span>Read resume</span>
          <span className="action-link__mark" aria-hidden="true">→</span>
        </MagneticOffset>
      </Link>
    </div>
  );
}
