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
            The direct contact channel will be added after the public address is
            confirmed. Until then, the verified engineering record remains
            available on GitHub.
          </p>
          <ActionLink
            href={siteConfig.githubUrl}
            external
            variant="secondary"
            ariaLabel="GitHub profile, opens in a new tab"
          >
            View GitHub
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
