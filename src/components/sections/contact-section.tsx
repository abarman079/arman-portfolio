import { ContactForm } from "@/components/contact/contact-form";
import { CopyEmail } from "@/components/contact/copy-email";
import { siteConfig } from "@/content/site";
import { getContactEnvironment } from "@/lib/contact/environment";

import styles from "./contact-section.module.css";

export function ContactSection() {
  const environment = getContactEnvironment();
  const hasContactForm = environment.mode === "configured";
  const turnstileSiteKey = hasContactForm
    ? environment.values.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    : undefined;

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-title"
      data-contact-scene
    >
      <div className={`site-container ${styles.container}`}>
        <header className={styles.opening}>
          <p className={`eyebrow ${styles.eyebrow}`}>Contact</p>
          <h2 id="contact-title" data-contact-heading>
            Send a <span>useful note.</span>
          </h2>
          <p className={styles.introduction}>
            Share the role, project, or problem you have in mind. A little
            context makes the reply more useful.
          </p>
        </header>

        <div className={styles.workspace}>
          <aside className={styles.directBlock} data-contact-rail>
            <p className={styles.railLabel}>Direct email</p>
            <a className={styles.email} href={siteConfig.emailHref}>
              {siteConfig.email}
            </a>
            <CopyEmail email={siteConfig.email} />
          </aside>

          {hasContactForm ? (
            <div className={styles.formColumn} data-contact-form-stage>
              <ContactForm
                deliveryMode={environment.mode}
                turnstileSiteKey={turnstileSiteKey}
              />
            </div>
          ) : (
            <div className={styles.directPanel} data-contact-form-stage>
              <p className={styles.panelIndex}>Email is the active contact path</p>
              <h3>Write to Arman directly.</h3>
              <p>
                Tell me what you are hiring for or building, and include any
                useful links or constraints.
              </p>
              <a className={styles.emailAction} href={siteConfig.emailHref}>
                <span>Write an email</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
