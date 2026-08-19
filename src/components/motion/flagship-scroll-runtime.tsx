"use client";

import { useCallback, useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { gsapEase, scrollMotion } from "@/lib/motion";

const variantMotion = {
  architecture: { mediaX: 0, mediaY: 24, copyX: -14, copyY: 0 },
  editorial: { mediaX: -22, mediaY: 0, copyX: 18, copyY: 0 },
  commerce: { mediaX: 18, mediaY: 20, copyX: 0, copyY: 16 },
  research: { mediaX: 0, mediaY: 28, copyX: -10, copyY: 10 },
} as const;

type ProjectVariant = keyof typeof variantMotion;

export function FlagshipScrollRuntime() {
  const scope = useRef<HTMLElement | null>(null);
  const setMarker = useCallback((node: HTMLSpanElement | null) => {
    scope.current = node?.closest<HTMLElement>("[data-flagship-scroll-root]") ?? null;
  }, []);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      root.dataset.cinematic = "true";
      const stages = gsap.utils.toArray<HTMLElement>("[data-project-stage]", root);
      const markers = gsap.utils.toArray<HTMLElement>("[data-flagship-marker]", root);
      const progress = root.querySelector<HTMLElement>("[data-flagship-progress]");

      function setActiveMarker(activeIndex: number) {
        markers.forEach((marker, markerIndex) => {
          marker.toggleAttribute("data-active", markerIndex === activeIndex);
        });
      }

      if (progress) {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: gsapEase.linear,
            scrollTrigger: {
              trigger: root,
              start: "top 58%",
              end: "bottom 42%",
              scrub: scrollMotion.scrubResponsive,
            },
          },
        );
      }

      stages.forEach((stage, index) => {
        const media = stage.querySelector<HTMLElement>("[data-project-media]");
        const copy = stage.querySelector<HTMLElement>("[data-project-copy]");
        const title = stage.querySelector<HTMLElement>("[data-project-title]");
        const handoff = stage.querySelector<HTMLElement>("[data-project-handoff]");
        const variant = stage.dataset.projectVariant as ProjectVariant | undefined;
        const values = variant ? variantMotion[variant] : variantMotion.architecture;

        if (media && copy && title) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: stage,
                start: "top 84%",
                end: "top 22%",
                scrub: scrollMotion.scrubSoft,
                onEnter: () => setActiveMarker(index),
                onEnterBack: () => setActiveMarker(index),
              },
            })
            .fromTo(
              title,
              { y: 24, autoAlpha: 0.78 },
              { y: 0, autoAlpha: 1, ease: gsapEase.linear },
              0,
            )
            .fromTo(
              copy,
              { x: values.copyX, y: values.copyY, autoAlpha: 0.82 },
              { x: 0, y: 0, autoAlpha: 1, ease: gsapEase.linear },
              0,
            )
            .fromTo(
              media,
              {
                x: values.mediaX,
                y: values.mediaY,
                clipPath: "inset(4% 0 0 0)",
              },
              {
                x: 0,
                y: 0,
                clipPath: "inset(0% 0 0 0)",
                ease: gsapEase.linear,
              },
              0,
            );
        }

        ScrollTrigger.create({
          trigger: stage,
          start: "top 5.75rem",
          end: () => `+=${Math.min(320, Math.max(220, window.innerHeight * 0.36))}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => setActiveMarker(index),
          onEnterBack: () => setActiveMarker(index),
        });

        if (handoff) {
          gsap.fromTo(
            handoff,
            { "--handoff-progress": 0 },
            {
              "--handoff-progress": 1,
              ease: gsapEase.linear,
              scrollTrigger: {
                trigger: handoff,
                start: "top 92%",
                end: "top 58%",
                scrub: scrollMotion.scrubResponsive,
              },
            },
          );
        }
      });

      setActiveMarker(0);

      return () => {
        delete root.dataset.cinematic;
        markers.forEach((marker) => marker.removeAttribute("data-active"));
      };
    },
    { scope },
  );

  return <span hidden aria-hidden="true" ref={setMarker} />;
}
