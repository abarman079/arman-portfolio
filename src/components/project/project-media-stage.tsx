"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { springSoft } from "@/lib/motion";
import type { ProjectMedia, ProjectPresentation } from "@/types/project";

import styles from "./project-media-stage.module.css";

interface ProjectMediaStageProps {
  actionLabel: string;
  href: string;
  items: readonly ProjectMedia[];
  projectName: string;
  variant: ProjectPresentation["variant"];
}

const responsiveSizes =
  "(max-width: 48rem) 92vw, (max-width: 64rem) 72vw, 62vw";

export function ProjectMediaStage({
  actionLabel,
  href,
  items,
  projectName,
  variant,
}: ProjectMediaStageProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.motionStage}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.996 }}
      transition={springSoft}
    >
      <Link
        className={`${styles.stage} ${styles[variant]}`}
        href={href}
        aria-label={`${actionLabel} for ${projectName}`}
      >
        <span className={styles.action} aria-hidden="true">
          {actionLabel} <span>→</span>
        </span>

        {items.map((media, index) => (
          <figure
            className={`${styles.figure} ${styles[`figure${index + 1}`] ?? ""}`}
            key={media.src}
          >
            <Image
              className={styles.image}
              src={media.src}
              width={media.width}
              height={media.height}
              alt={media.alt}
              sizes={responsiveSizes}
            />
            {media.caption ? (
              <figcaption className={styles.caption}>{media.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </Link>
    </motion.div>
  );
}
