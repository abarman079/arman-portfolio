import type { MetadataRoute } from "next";

import { flagshipProjects } from "@/content/projects";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  if (!siteUrl) return [];

  const route = (path: string) => new URL(path, siteUrl).toString();

  return [
    { url: route("/"), changeFrequency: "monthly", priority: 1 },
    { url: route("/work"), changeFrequency: "monthly", priority: 0.9 },
    ...flagshipProjects.map((project) => ({
      url: route(`/work/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: route("/resume"), changeFrequency: "monthly", priority: 0.6 },
  ];
}
