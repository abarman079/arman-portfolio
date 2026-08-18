import Link from "next/link";

import { siteConfig } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__grid">
        <div>
          <p className="site-footer__name">{siteConfig.name}</p>
          <p className="site-footer__positioning">{siteConfig.positioning}</p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="site-footer__links">
            <li>
              <Link href="/work">Work</Link>
            </li>
            <li>
              <Link href="/resume">Resume</Link>
            </li>
            <li>
              <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </nav>

        <p className="site-footer__meta">
          <span>Portfolio V2</span>
          <span>© 2026</span>
        </p>
      </div>
    </footer>
  );
}
