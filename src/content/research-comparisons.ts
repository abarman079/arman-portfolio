/** Exact values transcribed from the source result artifacts reviewed 2026-11-24.
 * This data is not an inference service and contains no input examples or private data. */
export const phishingEvidence = {
  source: "https://github.com/abarman079/phishing-website-detection/blob/main/Results/Notebook%204/metrics/final_test_metrics.csv",
  report: "https://github.com/abarman079/phishing-website-detection/blob/main/Results/Notebook%204/reports/final_result_values_for_thesis.md",
  testCount: 168060,
  benignCount: 91260,
  phishingCount: 76800,
  rows: [
    { label: "Logistic regression · URL", ap: 0.8829377823293671, f1: 0.7939486989438018, mcc: 0.6260209611828113, fpr: 0.1569362261669954 },
    { label: "Logistic regression · URL + HTML", ap: 0.9323542906212164, f1: 0.8457434163607068, mcc: 0.7195473941308055, fpr: 0.11612973920666228 },
    { label: "Random forest · URL", ap: 0.9549107958225402, f1: 0.8600906126141942, mcc: 0.751806832813873, fpr: 0.0834100372561911 },
    { label: "Random forest · URL + HTML", ap: 0.9780161542394594, f1: 0.9130918531338855, mcc: 0.8510128987518932, fpr: 0.025509533201840896 },
  ],
} as const;

export const crackEvidence = {
  source: "https://github.com/abarman079/wallCrackWith2datasets/blob/main/Phase8_Threshold_Tuning_Operating_Point/phase8_threshold_policy.json",
  repository: "https://github.com/abarman079/wallCrackWith2datasets",
  trainCount: 9603,
  validationCount: 1695,
  crackCount: 1477,
  cleanCount: 218,
  rows: [
    { label: "U-Net", bestThreshold: .9, bestIou: .568641596904121, bestDice: .7104544583104387, riskThreshold: .9, riskIou: .568641596904121, riskFpr: .01834862385321101 },
    { label: "DeepLabV3+", bestThreshold: .4, bestIou: .5730325444459554, bestDice: .7142590736831291, riskThreshold: .5, riskIou: .572807884519724, riskFpr: .0045871559633027525 },
    { label: "U-Net++", bestThreshold: .4, bestIou: .580701103959335, bestDice: .7216068888173035, riskThreshold: .5, riskIou: .5806895364624721, riskFpr: .027522935779816515 },
  ],
} as const;

export function percent(value: number) { return `${(value * 100).toFixed(2)}%`; }
