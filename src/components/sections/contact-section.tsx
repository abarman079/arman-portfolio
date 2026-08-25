import Link from "next/link";

import { ContactForm } from "@/components/contact/contact-form";
import { CopyEmail } from "@/components/contact/copy-email";
import { getContactEnvironment } from "@/lib/contact/environment";
import { siteConfig } from "@/content/site";

import styles from "./contact-section.module.css";

const contactLinks = [
  { label: "GitHub", href: siteConfig.githubUrl, external: true },
  { label: "LinkedIn", href: siteConfig.linkedinUrl, external: true },
  { label: "Resume", href: siteConfig.resumePageUrl, external: false },
] as const;

export function ContactSection() {
  const environment = getContactEnvironment();
  const hasContactForm = environment.mode === "configured";
  const turnstileSiteKey =
    hasContactForm
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
            Let&apos;s talk about <span>the work.</span>
          </h2>
          <p className={styles.introduction}>
            Share the role, project, or problem you have in mind. Include enough
            context for a useful reply.
          </p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.contactRail} data-contact-rail>
            <div className={styles.directBlock}>
              <p className={styles.railLabel}>Email</p>
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
                <dd>Direct email</dd>
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

          </div>

          {hasContactForm ? (
            <div className={styles.formColumn} data-contact-form-stage>
              <div className={styles.formHeader}>
                <p>Message form</p>
                <p>Four fields</p>
              </div>
              <ContactForm
                deliveryMode={environment.mode}
                turnstileSiteKey={turnstileSiteKey}
              />
            </div>
          ) : (
            <div className={styles.directPanel} data-contact-form-stage>
              <p className={styles.panelIndex}>Direct contact / 01</p>
              <h3>Email Arman directly.</h3>
              <p>
                Tell me what you are hiring for or building, and include any useful
                links or constraints.
              </p>
              <a className={styles.emailAction} href={siteConfig.emailHref}>
                <span>Write an email</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>

        <div className={styles.signalRoute} data-contact-route aria-hidden="true">
          <span>{hasContactForm ? "Message" : "Email"}</span>
          <i />
          <span>{hasContactForm ? "Verify" : "Direct"}</span>
          <i />
          <span>Reply</span>
        </div>
      </div>
    </section>
  );
}
