export interface CapabilityDefinition {
  index: string;
  title: string;
  description: string;
  projectSlugs: readonly string[];
}

export const capabilityDefinitions: readonly CapabilityDefinition[] = [
  {
    index: "01",
    title: "Application systems",
    description:
      "Applications that connect role-aware interfaces to API rules, authorization, and stored data.",
    projectSlugs: ["slatedesk", "framesignal", "travelease"],
  },
  {
    index: "02",
    title: "Product interfaces",
    description:
      "Responsive interfaces that help people browse, compare, and complete an action across screen sizes.",
    projectSlugs: ["framesignal", "arctic-daze"],
  },
  {
    index: "03",
    title: "Applied ML and computer vision",
    description:
      "Research that compares models and reports evaluation context for classification, anomaly detection, and segmentation.",
    projectSlugs: [
      "cctv-violence-detection",
      "face-based-anomaly-detection",
      "wall-crack-detection",
    ],
  },
  {
    index: "04",
    title: "Data and reporting",
    description:
      "Warehouse design and Power BI reporting that turn cleaned retail data into an inspectable analytical model.",
    projectSlugs: ["retail-data-warehouse-bi"],
  },
] as const;
