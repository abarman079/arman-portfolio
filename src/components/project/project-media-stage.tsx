"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Image from "next/image";
import { useRef, type PointerEvent } from "react";

import { ProjectTransitionLink } from "@/components/motion/project-transition-provider";
import { springSoft } from "@/lib/motion";
import type { ProjectMedia, ProjectPresentation } from "@/types/project";

import styles from "./project-media-stage.module.css";

interface ProjectMediaStageProps {
  actionLabel: string;
  href: string;
  items: readonly ProjectMedia[];
  projectName: string;
  projectSlug: string;
  variant: ProjectPresentation["variant"];
}

const responsiveSizes =
  "(max-width: 48rem) 92vw, (max-width: 64rem) 72vw, 62vw";

export function ProjectMediaStage({
  actionLabel,
  href,
  items,
  projectName,
  projectSlug,
  variant,
}: ProjectMediaStageProps) {
  const prefersReducedMotion = useReducedMotion();
  const bounds = useRef<DOMRect | null>(null);
  const tiltXTarget = useMotionValue(0);
  const tiltYTarget = useMotionValue(0);
  const tiltX = useSpring(tiltXTarget, {
    stiffness: 170,
    damping: 25,
    mass: 0.82,
  });
  const tiltY = useSpring(tiltYTarget, {
    stiffness: 170,
    damping: 25,
    mass: 0.82,
  });
  const visibleCaptions = items
    .flatMap((item) => (item.caption ? [item.caption] : []))
    .join("; ");
  const accessibleLabel = `${actionLabel} for ${projectName}${
    visibleCaptions ? `: ${visibleCaptions}` : ""
  }`;

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      prefersReducedMotion ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    bounds.current = event.currentTarget.getBoundingClientRect();
    event.currentTarget.dataset.depthActive = "true";
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!bounds.current || event.pointerType !== "mouse" || prefersReducedMotion) {
      return;
    }

    const x = ((event.clientX - bounds.current.left) / bounds.current.width) * 2 - 1;
    const y = ((event.clientY - bounds.current.top) / bounds.current.height) * 2 - 1;
    tiltXTarget.set(y * -0.5);
    tiltYTarget.set(x * 0.58);
  }

  function resetDepth(event: PointerEvent<HTMLDivElement>) {
    bounds.current = null;
    tiltXTarget.set(0);
    tiltYTarget.set(0);
    delete event.currentTarget.dataset.depthActive;
  }

  return (
    <motion.div
      className={styles.motionStage}
      style={{
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1400,
      }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetDepth}
      onPointerCancel={resetDepth}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.996 }}
      transition={springSoft}
    >
      <ProjectTransitionLink
        className={`${styles.stage} ${styles[variant]}`}
        href={href}
        ariaLabel={accessibleLabel}
        projectSlug={projectSlug}
        variant={variant}
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
              data-project-transition-source={
                index === 0 ? projectSlug : undefined
              }
            />
            {media.caption ? (
              <figcaption className={styles.caption}>{media.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </ProjectTransitionLink>
    </motion.div>
  );
}
