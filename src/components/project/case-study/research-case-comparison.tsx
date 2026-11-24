import { CrackComparison, PhishingComparison } from "../../sections/research-comparison-controls";
import styles from "../../sections/research-scenes.module.css";
import { crackEvidence, phishingEvidence } from "../../../content/research-comparisons";

export function ResearchCaseComparison({ slug }: { slug: string }) {
  const isPhishing = slug === "phishing-website-detection";
  if (!isPhishing && slug !== "wall-crack-detection") return null;

  return (
    <section className={`${styles.scene} ${isPhishing ? "" : styles.crack} ${styles.caseComparison}`} aria-labelledby="case-research-comparison" data-case-research-comparison>
      <div className={styles.caseComparisonHeader}>
        <p className={styles.kicker}>Measured results / interactive comparison</p>
        <h2 id="case-research-comparison">{isPhishing ? "Compare the feature sets" : "Compare the operating policies"}</h2>
        <p>{isPhishing ? "Four non-dummy configurations on the same official test rows. Offline evaluation; the benign date boundary overlaps." : "Phase 8 validation only. The best-overlap and clean-image operating policies are distinct; neither is field certification."}</p>
      </div>
      {isPhishing ? <PhishingComparison /> : <CrackComparison />}
      <a className={styles.source} href={isPhishing ? phishingEvidence.source : crackEvidence.source}>Read the original result artifact <span aria-hidden="true">↗</span></a>
      {isPhishing ? <a className={styles.source} href={phishingEvidence.report}>Read the experimental report <span aria-hidden="true">↗</span></a> : null}
    </section>
  );
}
