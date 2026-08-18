"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { durationStandard, easeEditorial } from "@/lib/motion";

interface HeroRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function HeroReveal({
  children,
  className,
  delay = 0,
}: HeroRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0.94, y: 10, clipPath: "inset(0 0 3% 0)" }
      }
      animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: durationStandard + 0.18, delay, ease: easeEditorial }
      }
    >
      {children}
    </motion.div>
  );
}
