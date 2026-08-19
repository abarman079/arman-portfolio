import Image from "next/image";
import Link from "next/link";

import { ContactForm } from "@/components/contact/contact-form";
import { CopyEmail } from "@/components/contact/copy-email";
import { getContactEnvironment } from "@/lib/contact/environment";
import { siteConfig } from "@/lib/seo";

import styles from "./contact-section.module.css";

const contactLinks = [
  { label: "GitHub", href: siteConfig.githubUrl, external: true },
  { label: "LinkedIn", href: siteConfig.linkedinUrl, external: true },
  { label: "Resume", href: siteConfig.resumePageUrl, external: false },
] as const;

export function ContactSection() {
  const environment = getContactEnvironment();
  const turnstileSiteKey =
    environment.mode === "configured"
      ? environment.values.NEXT_PUBLIC_TURNSTILE_SITE_KEY
      : undefined;

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-title"
      data-contact-scene
    >
      <div className={styles.gridField} aria-hidden="true" />
      <div className={`site-container ${styles.container}`}>
        <header className={styles.opening}>
          <p className={`eyebrow ${styles.eyebrow}`}>05 / Contact</p>
          <p className={styles.coordinates} aria-hidden="true">
            Aftabnagar / Dhaka
          </p>
          <h2 id="contact-title" data-contact-heading>
            Let&apos;s build something <span>worth shipping.</span>
          </h2>
          <p className={styles.introduction}>
            For engineering roles, collaboration, or a focused project conversation,
            send a note with enough context to start well.
          </p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.contactRail} data-contact-rail>
            <div className={styles.directBlock}>
              <p className={styles.railLabel}>Direct channel</p>
              <a className={styles.email} href={siteConfig.emailHref}>
                {siteConfig.email}
              </a>
              <CopyEmail email={siteConfig.email} />
            </div>

            <dl className={styles.metadata}>
              <div>
                <dt>Location</dt>
                <dd>{siteConfig.location}</dd>
              </div>
              <div>
                <dt>Response path</dt>
                <dd>Email / reply-to</dd>
              </div>
            </dl>

            <nav className={styles.contactLinks} aria-label="Contact and profile links">
              {contactLinks.map((link) =>
                link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    key={link.label}
                    aria-label={`${link.label}, opens in a new tab`}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link href={link.href} key={link.label}>
                    <span>{link.label}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ),
              )}
            </nav>

            <figure className={styles.evidenceStrip}>
              <div className={styles.evidenceImage}>
                <Image
                  alt=""
                  fill
                  sizes="(min-width: 64rem) 32vw, (min-width: 48rem) 44vw, 100vw"
                  src="/projects/slatedesk/admin-operations-overview.webp"
                />
              </div>
              <figcaption>
                <span>Verified interface field</span>
                <Link href="/work/slatedesk">SlateDesk / case study →</Link>
              </figcaption>
            </figure>
          </div>

          <div className={styles.formColumn} data-contact-form-stage>
            <div className={styles.formHeader}>
              <p>Secure message route</p>
              <p>Form 01 / 01</p>
            </div>
            <ContactForm
              deliveryMode={environment.mode}
              turnstileSiteKey={turnstileSiteKey}
            />
          </div>
        </div>

        <div className={styles.signalRoute} data-contact-route aria-hidden="true">
          <span>Signal in</span>
          <i />
          <span>Validate</span>
          <i />
          <span>Deliver</span>
        </div>
      </div>
    </section>
  );
}
