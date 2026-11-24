import Link from "next/link";
import { crackEvidence, phishingEvidence } from "@/content/research-comparisons";
import { CrackComparison, PhishingComparison } from "./research-comparison-controls";
import styles from "./research-scenes.module.css";

export function ResearchScenes() {
  return (
    <section id="research" aria-labelledby="research-scenes-title" className={styles.section}>
      <header className={`site-container ${styles.opening}`}>
        <p className={styles.kicker}>Research / measured results</p>
        <h2 id="research-scenes-title">What changes<br />the result?</h2>
        <p>Two experiments with different questions. One compares the signals used to detect phishing; the other examines the trade-off between finding cracks and flagging clean images.</p>
      </header>
      <article id="research-phishing" aria-labelledby="phishing-scene-title" className={`${styles.scene} ${styles.phishing}`}>
        <div className={`site-container ${styles.sceneInner}`}>
          <div className={styles.copy}>
            <p className={styles.kicker}>01 / Classification</p>
            <h3 id="phishing-scene-title">Beyond the URL.</h3>
            <p>Does adding information from a webpage’s HTML improve phishing detection? The study compares URL-only features with a combined URL and HTML feature set, using logistic regression and random forests.</p>
            <dl className={styles.stat}><div><dt>Official test rows</dt><dd>{phishingEvidence.testCount.toLocaleString("en-US")}</dd></div><div><dt>Phishing rows</dt><dd>{phishingEvidence.phishingCount.toLocaleString("en-US")}</dd></div></dl>
            <p className={styles.note}>Frozen model predictions on the official holdout. The benign train and test sets share one calendar date; this is not a strictly date-separated evaluation. Offline research, not a live detection service.</p>
            <Link className={styles.source} href="/work/phishing-website-detection">Read the full case study <span aria-hidden="true">→</span></Link>
            <a className={styles.source} href={phishingEvidence.source}>Read the result table <span aria-hidden="true">↗</span></a>
            <a className={styles.source} href={phishingEvidence.report}>Read the experimental report <span aria-hidden="true">↗</span></a>
          </div>
          <PhishingComparison />
        </div>
      </article>
      <article id="research-cracks" aria-labelledby="crack-scene-title" className={`${styles.scene} ${styles.crack}`}>
        <div className={`site-container ${styles.sceneInner}`}>
          <div className={styles.copy}>
            <p className={styles.kicker}>02 / Segmentation</p>
            <h3 id="crack-scene-title">Finding the crack is only half the problem.</h3>
            <p>CrackSAFE-MRC compares U-Net, DeepLabV3+ and U-Net++ with EfficientNet-B3 encoders. A threshold that maximizes overlap is not necessarily the one that best avoids marking clean surfaces as cracked.</p>
            <dl className={styles.stat}><div><dt>Training images</dt><dd>{crackEvidence.trainCount.toLocaleString("en-US")}</dd></div><div><dt>Validation images</dt><dd>{crackEvidence.validationCount.toLocaleString("en-US")}</dd></div></dl>
            <p className={styles.note}>The clean-image policy selects the lowest false-positive rate among thresholds retaining at least 98% of each model’s best crack-only IoU. These are Phase 8 validation results, not independent test or structural-inspection certification.</p>
            <Link className={styles.source} href="/work/wall-crack-detection">Read the full case study <span aria-hidden="true">→</span></Link>
            <a className={styles.source} href={crackEvidence.source}>Read the threshold policy <span aria-hidden="true">↗</span></a>
            <a className={styles.source} href={crackEvidence.repository}>Explore the research repository <span aria-hidden="true">↗</span></a>
          </div>
          <CrackComparison />
        </div>
      </article>
      <div className={`site-container ${styles.ongoing}`}>
        <div><p className={styles.kicker}>In progress / 2026-11-11 status</p><h3>CrackSAFE-CP</h3></div>
        <p>Ongoing research on crack topology, uncertainty and selective prediction. The documented technical checks are not formal scientific certification; the certified full evaluation remains pending.</p>
        <a className={styles.source} href="https://github.com/abarman079/wallCrackDetection-CP/blob/main/docs/RESEARCH_STATUS.md">Research status <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
