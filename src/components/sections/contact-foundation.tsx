import { siteConfig } from "@/lib/seo";

import { ActionLink } from "../ui/action-link";

export function ContactFoundation() {
  return (
    <section
      id="contact"
      className="contact-foundation"
      aria-labelledby="contact-title"
    >
      <div className="site-container contact-foundation__grid">
        <div>
          <p className="eyebrow">05 / Contact</p>
          <h2 id="contact-title">
            Let’s build something{" "}
            <span className="editorial-text">worth shipping.</span>
          </h2>
        </div>
        <div className="contact-foundation__body">
          <p>
            Based in {siteConfig.location}. For project conversations or
            engineering collaboration, email is the clearest direct channel.
          </p>
          <div className="action-group">
            <ActionLink href={siteConfig.emailHref} native variant="primary">
              Send email
            </ActionLink>
            <ActionLink
              href={siteConfig.linkedinUrl}
              external
              variant="secondary"
              ariaLabel="LinkedIn profile, opens in a new tab"
            >
              LinkedIn
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
