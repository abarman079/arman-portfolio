"use client";

import Link from "next/link";

import { MagneticOffset } from "@/components/motion/magnetic-offset";

import styles from "./hero-foundation.module.css";

export function HeroActions() {
  return (
    <div className={styles.actions} aria-label="Primary action">
      <Link href="/#work" className="action-link action-link--primary">
        <MagneticOffset className={styles.actionInner}>
          <span>View selected work</span>
          <span className="action-link__mark" aria-hidden="true">↓</span>
        </MagneticOffset>
      </Link>
    </div>
  );
}
