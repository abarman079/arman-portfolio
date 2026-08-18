import { SectionHeading } from "../ui/section-heading";

const capabilities = [
  {
    index: "01",
    title: "Full-stack systems",
    body: "Role-aware workflows, relational data, server-rendered products, administration surfaces, and complete application boundaries.",
    evidence: "SlateDesk · FrameSignal · TravelEase",
  },
  {
    index: "02",
    title: "Frontend and product UI",
    body: "Responsive discovery, editorial information architecture, accessible interaction foundations, and product-focused presentation.",
    evidence: "FrameSignal · Arctic Daze",
  },
  {
    index: "03",
    title: "Machine learning and CV",
    body: "Model comparison, reproducible evaluation, classification, anomaly detection, segmentation, and diagnostic analysis.",
    evidence: "CCTV · Face Anomaly · Wall Crack",
  },
  {
    index: "04",
    title: "Data and business intelligence",
    body: "Data cleaning, dimensional modeling, warehouse structure, DAX measures, and decision-oriented reporting.",
    evidence: "Retail Data Warehouse & BI",
  },
] as const;

export function ExpertiseFoundation() {
  return (
    <section
      id="expertise"
      className="section-block"
      aria-labelledby="expertise-title"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="02 / Engineering range"
          title="Capability is organized by what the work demonstrates."
          description="Technologies support the story; they are not the story. Each domain below is anchored to projects in the verified source."
          id="expertise-title"
        />

        <div className="capability-grid">
          {capabilities.map((capability) => (
            <article className="capability" key={capability.index}>
              <p className="capability__index">{capability.index}</p>
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
              <p className="capability__evidence">{capability.evidence}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
