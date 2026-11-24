import { describe, expect, it } from "vitest";

import { capabilityDefinitions } from "../content/capabilities";
import {
  additionalArchiveProjects,
  featuredArchiveProjects,
  flagshipProjects,
  projects,
} from "../content/projects";
import { findProjectBySlug, parseProjectRecords } from "./projects";

describe("verified project source", () => {
  it("preserves the approved hierarchy and flagship order", () => {
    expect(projects).toHaveLength(13);
    expect(flagshipProjects.map((project) => project.canonicalName)).toEqual([
      "SlateDesk",
      "FrameSignal",
      "Arctic Daze",
      "CCTV Violence Anomaly Detection",
      "Phishing Website Detection",
      "CrackSAFE-MRC",
    ]);
    expect(featuredArchiveProjects).toHaveLength(2);
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
    expect(cctv?.metrics?.map((metric) => metric.label)).toEqual([
      "Accuracy",
      "ROC-AUC",
    ]);
    for (const metric of cctv?.metrics ?? []) {
      expect(metric.datasetContext).toContain("5,000-image");
      expect(metric.splitOrEvaluationContext).toContain("750-image");
      expect(metric.limitations).toContain("Offline experiment");
    }
  });

  it("keeps verified media and presentation metadata on every flagship", () => {
    for (const project of flagshipProjects) {
      expect(project.media?.length).toBeGreaterThanOrEqual(2);
      expect(project.presentation).toBeDefined();
      expect(project.presentation?.homepageStory.steps.length).toBeGreaterThanOrEqual(3);
      expect(project.caseStudy?.blocks.length).toBeGreaterThan(0);

      for (const media of project.media ?? []) {
        expect(media.src).toMatch(/^\/projects\//);
        expect(media.privacyReviewed).toBe(true);
        expect(media.source).toBeTruthy();
      }
    }
  });

  it("keeps one publication-reviewed visual on every archive project", () => {
    for (const project of [...featuredArchiveProjects, ...additionalArchiveProjects]) {
      expect(project.media?.length).toBeGreaterThanOrEqual(1);

      for (const media of project.media ?? []) {
        expect(media.src).toMatch(/^\/projects\//);
        expect(media.privacyReviewed).toBe(true);
        expect(media.source).toBeTruthy();
      }
    }
  });

  it("keeps case studies exclusive to the six flagship projects", () => {
    expect(
      projects.filter((project) => project.caseStudy).map((project) => project.slug),
    ).toEqual([
      "slatedesk",
      "framesignal",
      "arctic-daze",
      "cctv-violence-detection",
      "phishing-website-detection",
      "wall-crack-detection",
    ]);
  });

  it("keeps capability groups attached to verified project evidence", () => {
    for (const capability of capabilityDefinitions) {
      capability.projectSlugs.forEach((slug) => {
        const project = findProjectBySlug(projects, slug);
        expect(project).toBeDefined();
      });
    }
  });

  it("keeps new research metrics linked to their actual evaluation conditions", () => {
    const phishing = findProjectBySlug(projects, "phishing-website-detection");
    const crack = findProjectBySlug(projects, "wall-crack-detection");
    expect(phishing?.metrics?.map((metric) => metric.value)).toEqual([97.8, 91.31, 2.55]);
    expect(phishing?.metrics?.every((metric) => metric.datasetContext.includes("168,060") && metric.limitations.includes("2025-09-08"))).toBe(true);
    expect(crack?.metrics?.map((metric) => metric.value)).toEqual([58.07, 0.46]);
    expect(crack?.metrics?.[0].splitOrEvaluationContext).toContain("0.40");
    expect(crack?.metrics?.[1].splitOrEvaluationContext).toContain("0.50");
    expect(crack?.metrics?.[0].modelOrSubject).not.toBe(crack?.metrics?.[1].modelOrSubject);
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

  it("rejects case-study claims tied to unknown evidence", () => {
    const invalid = structuredClone(projects);
    invalid[0].caseStudy?.evidenceIds.push("unsupported-claim");

    expect(() => parseProjectRecords(invalid)).toThrow(
      /Case study references unknown evidence id/,
    );
  });

  it("rejects case-study media references that do not exist", () => {
    const invalid = structuredClone(projects);
    const mediaBlock = invalid[0].caseStudy?.blocks.find(
      (block) => block.type === "media",
    );

    if (!mediaBlock || mediaBlock.type !== "media") {
      throw new Error("SlateDesk media block is required for this test.");
    }

    mediaBlock.mediaIndexes.push(99);

    expect(() => parseProjectRecords(invalid)).toThrow(
      /Case study references missing media index/,
    );
  });
});
