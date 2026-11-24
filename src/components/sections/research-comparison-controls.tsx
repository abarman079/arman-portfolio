"use client";

import { useId, useState } from "react";
import { crackEvidence, percent, phishingEvidence } from "@/content/research-comparisons";
import styles from "./research-scenes.module.css";

const metrics = [
  { key: "ap", label: "Average precision", direction: "Higher is better" },
  { key: "f1", label: "F1", direction: "Higher is better" },
  { key: "mcc", label: "MCC", direction: "Higher is better" },
  { key: "fpr", label: "False-positive rate", direction: "Lower is better" },
] as const;
type MetricKey = (typeof metrics)[number]["key"];

function formatValue(value: number, metric: MetricKey) {
  return metric === "mcc" ? value.toFixed(3) : percent(value);
}

export function PhishingComparison() {
  const groupName = useId();
  const [metric, setMetric] = useState<MetricKey>("f1");
  const selection = metrics.find((entry) => entry.key === metric) ?? metrics[1];
  const values = phishingEvidence.rows.map((row) => row[metric]);
  const best = metric === "fpr" ? Math.min(...values) : Math.max(...values);
  const axisMax = metric === "fpr" ? .2 : 1;
  const axisLabel = metric === "mcc" ? "0–1 (positive values)" : metric === "fpr" ? "0–20%" : "0–100%";
  return (
    <div className={styles.comparison}>
      <fieldset className={styles.options}>
        <legend>Compare models by</legend>
        {metrics.map((item) => (
          <label key={item.key} className={styles.option}>
            <input type="radio" name={groupName} value={item.key} checked={metric === item.key} onChange={() => setMetric(item.key)} />
            <span>{item.label}</span>
          </label>
        ))}
      </fieldset>
      <p className={styles.chartDescription} aria-live="polite">{selection.label} · {selection.direction} · official frozen test · axis {axisLabel}</p>
      <ul className={styles.chart} aria-label={`${selection.label} comparison`}>
        {phishingEvidence.rows.map((row) => (
          <li key={row.label}>
            <div className={styles.barLabel}><span>{row.label}</span><strong>{formatValue(row[metric],metric)}{row[metric] === best ? <span className={styles.bestText}> {metric === "fpr" ? "Lowest" : "Highest"}</span> : null}</strong></div>
            <div className={styles.barTrack} aria-hidden="true"><span data-best={row[metric] === best ? "true" : undefined} style={{ width: `${row[metric] / axisMax * 100}%` }} /></div>
          </li>
        ))}
      </ul>
      <details className={styles.details}>
        <summary>All measured values</summary>
        <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="All phishing model metrics">
          <table><caption>Official test, 168,060 rows</caption><thead><tr><th scope="col">Model</th><th scope="col">AP</th><th scope="col">F1</th><th scope="col">MCC</th><th scope="col">FPR</th></tr></thead>
            <tbody>{phishingEvidence.rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{percent(row.ap)}</td><td>{percent(row.f1)}</td><td>{row.mcc.toFixed(3)}</td><td>{percent(row.fpr)}</td></tr>)}</tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

export function CrackComparison() {
  const groupName = useId();
  const [policy, setPolicy] = useState<"overlap" | "clean">("overlap");
  return (
    <div className={styles.comparison}>
      <fieldset className={styles.options}>
        <legend>Choose a documented operating policy</legend>
        <label className={styles.option}><input type="radio" name={groupName} value="overlap" checked={policy === "overlap"} onChange={() => setPolicy("overlap")} /><span>Best crack overlap</span></label>
        <label className={styles.option}><input type="radio" name={groupName} value="clean" checked={policy === "clean"} onChange={() => setPolicy("clean")} /><span>Limit clean-image false positives</span></label>
      </fieldset>
      <p className={styles.chartDescription} aria-live="polite">{policy === "overlap" ? "Crack-only IoU · higher is better" : "No-crack false-positive rate · lower is better"} · Phase 8 validation · axis {policy === "overlap" ? "0–100%" : "0–5%"}</p>
      <ul className={styles.chart} aria-label={policy === "overlap" ? "Crack-only intersection over union" : "False-positive rate on clean images"}>
        {crackEvidence.rows.map((row) => {
          const value = policy === "overlap" ? row.bestIou : row.riskFpr;
          const threshold = policy === "overlap" ? row.bestThreshold : row.riskThreshold;
          const best = policy === "overlap" ? row.label === "U-Net++" : row.label === "DeepLabV3+";
          return <li key={row.label}><div className={styles.barLabel}><span>{row.label}</span><strong>{percent(value)}{best ? <span className={styles.bestText}> {policy === "overlap" ? "Highest" : "Lowest"}</span> : null}</strong></div><div className={styles.barTrack} aria-hidden="true"><span style={{ width: `${value / (policy === "overlap" ? 1 : .05) * 100}%` }} data-best={best ? "true" : undefined} /></div><p className={styles.threshold}>Threshold {threshold.toFixed(2)}{policy === "clean" ? ` · Crack-only IoU ${percent(row.riskIou)}` : ` · Dice ${percent(row.bestDice)}`}</p></li>;
        })}
      </ul>
      <details className={styles.details}>
        <summary>Both operating policies</summary>
        <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="All crack segmentation operating points">
          <table><caption>Phase 8 validation threshold selection</caption><thead><tr><th scope="col">Model</th><th scope="col">Best threshold</th><th scope="col">Best IoU</th><th scope="col">Best Dice</th><th scope="col">Clean-image policy threshold</th><th scope="col">Policy IoU</th><th scope="col">Policy FPR</th></tr></thead>
            <tbody>{crackEvidence.rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.bestThreshold.toFixed(2)}</td><td>{percent(row.bestIou)}</td><td>{percent(row.bestDice)}</td><td>{row.riskThreshold.toFixed(2)}</td><td>{percent(row.riskIou)}</td><td>{percent(row.riskFpr)}</td></tr>)}</tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
