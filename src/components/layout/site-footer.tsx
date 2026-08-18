import Link from "next/link";

import { siteConfig } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__grid">
        <div>
          <p className="site-footer__name">{siteConfig.name}</p>
          <p className="site-footer__positioning">{siteConfig.positioning}</p>
          <p className="site-footer__location">{siteConfig.location}</p>
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
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile, opens in a new tab"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile, opens in a new tab"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a href={siteConfig.emailHref}>Email <span aria-hidden="true">↗</span></a>
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
