import type { Transition } from "motion/react";

export const durationFast = 0.16;
export const durationStandard = 0.3;

export const easeEditorial = [0.22, 1, 0.36, 1] as const;

export const springResponsive: Transition = {
  type: "spring",
  stiffness: 430,
  damping: 38,
  mass: 0.72,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 30,
  mass: 0.9,
};
