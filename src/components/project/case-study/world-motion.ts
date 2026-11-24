import { gsap } from "@/lib/gsap";
import { gsapEase } from "@/lib/motion";

/** Owned by the existing desktop case-study GSAP context; no new clock. */
export function choreographProjectWorld(root: HTMLElement) {
  const world = root.querySelector<HTMLElement>("[data-project-world]");
  const light = world?.querySelector<HTMLElement>("[data-case-world-light]");
  const secondary = world?.querySelector<HTMLElement>("[data-case-world-secondary]");
  if (!world || !light) return;

  const timeline = gsap.timeline({
    defaults: { ease: gsapEase.linear },
    scrollTrigger: {
      trigger: world,
      start: "top 95%",
      end: "bottom 15%",
      scrub: 0.3,
    },
  });
  timeline.fromTo(light, { xPercent: -4, yPercent: -5 }, { xPercent: 8, yPercent: 9 }, 0);
  if (secondary) {
    timeline.fromTo(secondary, { y: 16 }, { y: 0 }, 0);
  }
}
