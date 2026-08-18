export type CapabilityVariant = "systems" | "interface" | "research" | "data";

export interface CapabilityDefinition {
  index: string;
  title: string;
  description: string;
  projectSlugs: readonly string[];
  technologies: readonly string[];
  variant: CapabilityVariant;
  media?: {
    projectSlug: string;
    mediaIndex: number;
  };
}

export const capabilityDefinitions: readonly CapabilityDefinition[] = [
  {
    index: "01",
    title: "Full-stack systems",
    description:
      "Role-aware workflows, server-rendered products, API boundaries, authorization, and relational persistence across complete application systems.",
    projectSlugs: ["slatedesk", "framesignal", "travelease"],
    technologies: ["Next.js", "ASP.NET Core", "PostgreSQL", "Supabase"],
    variant: "systems",
    media: { projectSlug: "slatedesk", mediaIndex: 0 },
  },
  {
    index: "02",
    title: "Frontend and product UI",
    description:
      "Responsive discovery, editorial information architecture, reusable product surfaces, and accessible interaction foundations.",
    projectSlugs: ["framesignal", "arctic-daze"],
    technologies: ["Next.js", "TypeScript", "Motion", "Supabase"],
    variant: "interface",
    media: { projectSlug: "arctic-daze", mediaIndex: 0 },
  },
  {
    index: "03",
    title: "Machine learning and computer vision",
    description:
      "Model comparison, reproducible evaluation, classification, anomaly detection, segmentation, and diagnostic analysis.",
    projectSlugs: [
      "cctv-violence-detection",
      "face-based-anomaly-detection",
      "wall-crack-detection",
    ],
    technologies: ["Python", "TensorFlow", "scikit-learn", "U-Net++"],
    variant: "research",
    media: { projectSlug: "cctv-violence-detection", mediaIndex: 0 },
  },
  {
    index: "04",
    title: "Data and business intelligence",
    description:
      "Data cleaning, dimensional warehouse structure, analytical measures, and decision-oriented Power BI reporting.",
    projectSlugs: ["retail-data-warehouse-bi"],
    technologies: ["SQL Server", "Power BI", "Power Query", "DAX"],
    variant: "data",
  },
] as const;
