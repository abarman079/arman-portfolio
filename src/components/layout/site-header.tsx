import Link from "next/link";

import { siteConfig } from "@/lib/seo";

const primaryLinks = [
  { href: "/work", label: "Work" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link href="/" className="wordmark" aria-label="Arman portfolio home">
          <span className="wordmark__name">Arman</span>
          <span className="wordmark__role">Software Engineer</span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          <ul>
            {primaryLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
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
              <Link href={siteConfig.resumePageUrl}>Resume</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
