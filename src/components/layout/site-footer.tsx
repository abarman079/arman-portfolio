import Link from "next/link";

import { siteConfig } from "@/content/site";

import styles from "./site-footer.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={`site-container ${styles.container}`}>
        <p className={styles.identity}>
          <strong>Arman.</strong>
          <span>© {year}</span>
        </p>

        <nav className={styles.navigation} aria-label="Footer navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <Link href={siteConfig.resumePageUrl}>Resume</Link>
        </nav>

        <Link className={styles.backToTop} href="/#main-content">
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
