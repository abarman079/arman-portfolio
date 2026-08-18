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

  it("keeps verified media and presentation metadata on every flagship", () => {
    for (const project of flagshipProjects) {
      expect(project.media?.length).toBeGreaterThanOrEqual(2);
      expect(project.presentation).toBeDefined();
      expect(project.caseStudy?.blocks.length).toBeGreaterThan(0);

      for (const media of project.media ?? []) {
        expect(media.src).toMatch(/^\/projects\//);
        expect(media.privacyReviewed).toBe(true);
        expect(media.source).toBeTruthy();
      }
    }
  });

  it("keeps case studies exclusive to the four flagship projects", () => {
    expect(
      projects.filter((project) => project.caseStudy).map((project) => project.slug),
    ).toEqual([
      "slatedesk",
      "framesignal",
      "arctic-daze",
      "cctv-violence-detection",
    ]);
  });

  it("keeps capability groups attached to verified project evidence", () => {
    for (const capability of capabilityDefinitions) {
      const relatedProjects = capability.projectSlugs.map((slug) => {
        const project = findProjectBySlug(projects, slug);
        expect(project).toBeDefined();
        return project;
      });

      for (const technology of capability.technologies) {
        expect(
          relatedProjects.some((project) => project?.technologies.includes(technology)),
        ).toBe(true);
      }

      if (capability.media) {
        const mediaProject = findProjectBySlug(projects, capability.media.projectSlug);
        expect(capability.projectSlugs).toContain(capability.media.projectSlug);
        expect(mediaProject?.media?.[capability.media.mediaIndex]).toBeDefined();
      }
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
