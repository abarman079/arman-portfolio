"use client";

import { useCallback, useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { gsapEase, scrollMotion } from "@/lib/motion";

export function CaseStudyMotionRuntime() {
  const scope = useRef<HTMLElement | null>(null);
  const setMarker = useCallback((node: HTMLSpanElement | null) => {
    scope.current = node?.closest<HTMLElement>("[data-case-motion-root]") ?? null;
  }, []);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const hero = root.querySelector<HTMLElement>("[data-case-hero]");
      const title = hero?.querySelector<HTMLElement>("[data-case-title]");
      const figure = hero?.querySelector<HTMLElement>("[data-case-hero-media]");

      if (hero && title && figure) {
        gsap
          .timeline({ defaults: { ease: gsapEase.reveal } })
          .from(title, {
            y: 24,
            autoAlpha: 0.84,
            clipPath: "inset(0 0 9% 0)",
            duration: 0.82,
            clearProps: "transform,opacity,visibility,clipPath",
          })
          .from(
            figure,
            {
              y: 20,
              clipPath: "inset(4% 0 0 0)",
              duration: 0.9,
              clearProps: "transform,clipPath",
            },
            "-=0.48",
          );
      }

      const headings = gsap.utils.toArray<HTMLElement>("[data-case-heading]", root);
      headings.forEach((heading) => {
        gsap.from(heading, {
          y: 22,
          autoAlpha: 0.8,
          duration: scrollMotion.revealDuration,
          ease: gsapEase.reveal,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: heading,
            start: "top 86%",
            once: true,
          },
        });
      });

      const diagrams = gsap.utils.toArray<HTMLElement>("[data-case-diagram]", root);
      diagrams.forEach((diagram) => {
        const nodes = gsap.utils.toArray<HTMLElement>("[data-diagram-node]", diagram);
        gsap.from(nodes, {
          y: 14,
          autoAlpha: 0.82,
          duration: 0.58,
          stagger: 0.07,
          ease: gsapEase.settle,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: diagram, start: "top 80%", once: true },
        });
      });

      const media = gsap.utils.toArray<HTMLElement>("[data-case-media]", root);
      media.forEach((item) => {
        gsap.from(item, {
          y: 20,
          clipPath: "inset(5% 0 0 0)",
          duration: 0.78,
          ease: gsapEase.reveal,
          clearProps: "transform,clipPath",
          scrollTrigger: { trigger: item, start: "top 84%", once: true },
        });
      });

      const metrics = gsap.utils.toArray<HTMLElement>("[data-case-metric]", root);
      metrics.forEach((metric, index) => {
        gsap.from(metric, {
          y: 16,
          autoAlpha: 0.84,
          duration: 0.65,
          delay: index * 0.05,
          ease: gsapEase.settle,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: metric, start: "top 84%", once: true },
        });
      });
    },
    { scope },
  );

  return <span hidden aria-hidden="true" ref={setMarker} />;
}
