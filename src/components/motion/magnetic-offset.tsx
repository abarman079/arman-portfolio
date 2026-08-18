"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";

import { springResponsive } from "@/lib/motion";

import styles from "./magnetic-offset.module.css";

interface MagneticOffsetProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticOffset({
  children,
  className = "",
  strength = 4,
}: MagneticOffsetProps) {
  const prefersReducedMotion = useReducedMotion();
  const bounds = useRef<DOMRect | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springResponsive);
  const y = useSpring(rawY, springResponsive);

  function canEnhance() {
    return (
      !prefersReducedMotion &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }

  function handlePointerEnter(event: PointerEvent<HTMLSpanElement>) {
    if (!canEnhance()) return;
    bounds.current = event.currentTarget.getBoundingClientRect();
  }

  function handlePointerMove(event: PointerEvent<HTMLSpanElement>) {
    if (!canEnhance() || !bounds.current) return;

    const offsetX = event.clientX - (bounds.current.left + bounds.current.width / 2);
    const offsetY = event.clientY - (bounds.current.top + bounds.current.height / 2);

    rawX.set((offsetX / Math.max(bounds.current.width / 2, 1)) * strength);
    rawY.set((offsetY / Math.max(bounds.current.height / 2, 1)) * strength);
  }

  function reset() {
    bounds.current = null;
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.span
      className={`${styles.inner} ${className}`.trim()}
      style={{ x, y }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.span>
  );
}
