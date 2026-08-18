import Link from "next/link";

import { siteConfig } from "@/lib/seo";

import styles from "./site-footer.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={`site-container ${styles.container}`}>
        <div className={styles.topline}>
          <p>End of transmission / Portfolio V2</p>
          <Link href="/#main-content">Back to top ↑</Link>
        </div>

        <p className={styles.wordmark} aria-label="Arman">
          ARMAN<span>.</span>
        </p>

        <div className={styles.footerGrid}>
          <div className={styles.identity}>
            <p>{siteConfig.positioning}</p>
            <p>{siteConfig.location}</p>
          </div>

          <nav className={styles.siteNavigation} aria-label="Footer site navigation">
            <p>Navigate</p>
            <ul>
              <li><Link href="/#work">Selected work</Link></li>
              <li><Link href="/#expertise">Expertise</Link></li>
              <li><Link href="/#about">About</Link></li>
              <li><Link href={siteConfig.resumePageUrl}>Resume</Link></li>
            </ul>
          </nav>

          <nav className={styles.socialNavigation} aria-label="Footer profile links">
            <p>Connect</p>
            <ul>
              <li>
                <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li><a href={siteConfig.emailHref}>Email <span aria-hidden="true">↗</span></a></li>
            </ul>
          </nav>

          <p className={styles.copyright}>© {year} {siteConfig.shortName}</p>
        </div>
      </div>
    </footer>
  );
}
