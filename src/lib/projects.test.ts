import { describe, expect, it } from "vitest";

import {
  additionalArchiveProjects,
  featuredArchiveProjects,
  flagshipProjects,
  projects,
} from "../content/projects";
import { findProjectBySlug, parseProjectRecords } from "./projects";

describe("verified project source", () => {
  it("preserves the approved hierarchy and flagship order", () => {
    expect(projects).toHaveLength(12);
    expect(flagshipProjects.map((project) => project.canonicalName)).toEqual([
      "SlateDesk",
      "FrameSignal",
      "Arctic Daze",
      "CCTV Violence Anomaly Detection",
    ]);
    expect(featuredArchiveProjects).toHaveLength(3);
    expect(additionalArchiveProjects).toHaveLength(5);
  });

  it("keeps every project tied to evidence and a canonical repository", () => {
    for (const project of projects) {
      expect(project.repositoryUrl).toMatch(
        /^https:\/\/github\.com\/abarman079\//,
      );
      expect(project.evidence.length).toBeGreaterThan(0);
    }
  });

  it("publishes only the two deployments verified in Phase 0", () => {
    expect(
      projects
        .filter((project) => project.liveUrl)
        .map((project) => project.liveUrl),
    ).toEqual([
      "https://frame-signal.vercel.app/",
      "https://arctic-daze-kappa.vercel.app/",
    ]);
  });

  it("keeps research metrics attached to evaluation context", () => {
    const cctv = findProjectBySlug(projects, "cctv-violence-detection");

    expect(cctv?.metrics).toHaveLength(2);
    for (const metric of cctv?.metrics ?? []) {
      expect(metric.datasetContext).toContain("5,000-image");
      expect(metric.splitOrEvaluationContext).toContain("750-image");
      expect(metric.limitations).toContain("Offline experiment");
    }
  });

  it("rejects duplicate slugs", () => {
    const duplicate = structuredClone(projects);
    duplicate[1].slug = duplicate[0].slug;

    expect(() => parseProjectRecords(duplicate)).toThrow(/Duplicate project slug/);
  });

  it("rejects archive records without an archive group", () => {
    const invalid = structuredClone(projects);
    delete invalid[4].archiveGroup;

    expect(() => parseProjectRecords(invalid)).toThrow(
      /Archive projects require an archive group/,
    );
  });
});
