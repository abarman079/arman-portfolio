import type { ProjectType } from "@/types/project";

const projectTypeLabels: Record<ProjectType, string> = {
  "full-stack": "Full-stack engineering",
  frontend: "Frontend / product UI",
  backend: "Backend / APIs",
  "ml-cv": "Machine learning / computer vision",
  "data-bi": "Data / business intelligence",
};

export function formatProjectTypes(types: readonly ProjectType[]) {
  return types.map((type) => projectTypeLabels[type]).join(" · ");
}
