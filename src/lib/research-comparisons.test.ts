import { describe, expect, it } from "vitest";
import { crackEvidence, percent, phishingEvidence } from "../content/research-comparisons";

describe("research evidence shown in the cinematic scenes", () => {
  it("retains the exact official-test counts and frozen RF hybrid scores", () => {
    expect(phishingEvidence.benignCount + phishingEvidence.phishingCount).toBe(phishingEvidence.testCount);
    const rf = phishingEvidence.rows[3];
    expect(rf.ap).toBeCloseTo(.9780161542394594, 12);
    expect(rf.f1).toBeCloseTo(.9130918531338855, 12);
    expect(rf.mcc).toBeCloseTo(.8510128987518932, 12);
    expect(percent(rf.fpr)).toBe("2.55%");
    expect(rf.f1).toBe(Math.max(...phishingEvidence.rows.map((row) => row.f1)));
  });
  it("preserves the distinction between overlap and clean-image threshold policies", () => {
    expect(crackEvidence.crackCount + crackEvidence.cleanCount).toBe(crackEvidence.validationCount);
    for (const row of crackEvidence.rows) {
      expect(row.riskIou).toBeGreaterThanOrEqual(.98 * row.bestIou);
    }
    expect(crackEvidence.rows[2].bestIou).toBe(Math.max(...crackEvidence.rows.map((row) => row.bestIou)));
    expect(crackEvidence.rows[1].riskFpr).toBe(Math.min(...crackEvidence.rows.map((row) => row.riskFpr)));
    expect(percent(crackEvidence.rows[1].riskFpr)).toBe("0.46%");
  });
});
