import type { CaseStudyArchitectureNode } from "@/types/project";

import styles from "./architecture-diagram.module.css";

interface ArchitectureDiagramProps {
  label: string;
  nodes: readonly CaseStudyArchitectureNode[];
  relationships: readonly string[];
}

export function ArchitectureDiagram({
  label,
  nodes,
  relationships,
}: ArchitectureDiagramProps) {
  return (
    <figure className={styles.figure} aria-label={label}>
      <div className={styles.canvas}>
        {nodes.map((node, index) => (
          <div className={styles.node} key={node.label}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <strong>{node.label}</strong>
            <p>{node.detail}</p>
          </div>
        ))}
      </div>

      <figcaption className={styles.caption}>
        <p>Verified relationships</p>
        <ol>
          {relationships.map((relationship, index) => (
            <li key={relationship}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {relationship}
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
