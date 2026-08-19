"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";

import { springResponsive } from "@/lib/motion";

interface PointerDetail {
  index: number;
  x: number;
  y: number;
}

interface CapabilityCardShellProps {
  children: ReactNode;
  className: string;
  index: number;
  labelledBy: string;
}

export function CapabilityCardShell({
  children,
  className,
  index,
  labelledBy,
}: CapabilityCardShellProps) {
  const prefersReducedMotion = useReducedMotion();
  const bounds = useRef<DOMRect | null>(null);

  function publishPointer(detail: PointerDetail) {
    window.dispatchEvent(
      new CustomEvent<PointerDetail>("capability:pointer", { detail }),
    );
  }

  function handlePointerEnter(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      prefersReducedMotion ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    bounds.current = event.currentTarget.getBoundingClientRect();
    publishPointer({ index, x: 0, y: 0 });
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!bounds.current || event.pointerType !== "mouse" || prefersReducedMotion) {
      return;
    }

    const x = ((event.clientX - bounds.current.left) / bounds.current.width) * 2 - 1;
    const y = -(((event.clientY - bounds.current.top) / bounds.current.height) * 2 - 1);
    event.currentTarget.style.setProperty("--pointer-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--pointer-y", y.toFixed(3));
    publishPointer({ index, x, y });
  }

  function handlePointerLeave(event: PointerEvent<HTMLElement>) {
    bounds.current = null;
    event.currentTarget.style.setProperty("--pointer-x", "0");
    event.currentTarget.style.setProperty("--pointer-y", "0");
    publishPointer({ index: -1, x: 0, y: 0 });
  }

  const restingStyle: CSSProperties & Record<"--pointer-x" | "--pointer-y", number> = {
    "--pointer-x": 0,
    "--pointer-y": 0,
  };

  return (
    <motion.article
      aria-labelledby={labelledBy}
      className={className}
      data-capability-card={index}
      style={restingStyle}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={prefersReducedMotion ? { duration: 0 } : springResponsive}
    >
      {children}
    </motion.article>
  );
}
