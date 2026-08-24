import { ImageResponse } from "next/og";

import { flagshipProjects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { formatProjectTypes } from "@/lib/project-labels";

const size = { width: 1200, height: 630 } as const;

export function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("project");
  const project = flagshipProjects.find((item) => item.slug === slug);
  const title = project?.canonicalName ?? siteConfig.name;
  const label = project
    ? formatProjectTypes(project.projectTypes)
    : "Software engineering portfolio";
  const description = project?.shortSummary ?? siteConfig.positioning;
  const index = project
    ? String(flagshipProjects.indexOf(project) + 1).padStart(2, "0")
    : "V2";

  const response = new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#f3f0e8",
          color: "#111318",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px 72px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            borderBottom: "2px solid #111318",
            display: "flex",
            fontSize: 22,
            justifyContent: "space-between",
            letterSpacing: "0.08em",
            paddingBottom: 22,
            textTransform: "uppercase",
          }}
        >
          <span>Arman / Signal &amp; Structure</span>
          <span style={{ color: "#8a2413" }}>{index}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              color: "#8a2413",
              fontSize: 22,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontSize: project ? 84 : 70,
              fontWeight: 700,
              letterSpacing: "-0.055em",
              lineHeight: 0.94,
              maxWidth: 980,
            }}
          >
            {title}
          </span>
          <span
            style={{
              color: "#5e6269",
              fontSize: 25,
              lineHeight: 1.35,
              maxWidth: 920,
            }}
          >
            {description}
          </span>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 20,
            justifyContent: "space-between",
          }}
        >
          <span>Full-stack / backend / applied ML</span>
          <span
            style={{
              background: "#ff5a36",
              display: "flex",
              height: 22,
              width: 22,
            }}
          />
        </div>
      </div>
    ),
    size,
  );

  response.headers.set(
    "Cache-Control",
    "public, max-age=0, s-maxage=31536000, immutable",
  );

  return response;
}
