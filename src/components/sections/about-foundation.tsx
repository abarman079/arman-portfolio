import { SectionHeading } from "../ui/section-heading";

export function AboutFoundation() {
  return (
    <section
      id="about"
      className="section-block"
      aria-labelledby="about-title"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="04 / Approach"
          title="Engineering across the product boundary."
          id="about-title"
        />

        <div className="about-layout">
          <p className="about-layout__lead">
            The work spans interface decisions, backend rules, data structures,
            deployment boundaries, and model evaluation.
          </p>
          <div className="about-layout__body">
            <p>
              Portfolio V2 is structured around complete systems rather than a
              list of isolated tools. Public claims remain tied to source,
              documentation, deployments, and reproducible results.
            </p>
            <p>
              Case-study narrative such as personal role, timeline, challenges,
              and lessons will appear only after explicit confirmation. Unknown
              details stay absent instead of being polished into fiction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
