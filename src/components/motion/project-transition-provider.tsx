"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";

import type { ProjectPresentation } from "@/types/project";

import styles from "./project-transition.module.css";

type ProjectVariant = ProjectPresentation["variant"];
type TransitionMode = "desktop" | "compact";

interface ProjectTransitionRequest {
  href: string;
  projectSlug: string;
  source: HTMLElement;
  variant: ProjectVariant;
}

interface ProjectTransitionContextValue {
  canTransition: () => boolean;
  prefetch: (href: string) => void;
  start: (request: ProjectTransitionRequest) => void;
}

interface ActiveTransition extends ProjectTransitionRequest {
  backdrop: HTMLDivElement;
  mode: TransitionMode;
  overlay: HTMLDivElement;
  overlayImage: HTMLImageElement;
  restoreSource: () => void;
  timeoutId: number;
}

interface ProjectTransitionLinkProps {
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  href: string;
  projectSlug: string;
  variant: ProjectVariant;
}

const ProjectTransitionContext = createContext<ProjectTransitionContextValue | null>(null);

const DESKTOP_TRANSITION_QUERY =
  "(min-width: 64.01rem) and (min-height: 40rem) and (hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const departureClip: Record<ProjectVariant, string> = {
  architecture: "inset(2% 0 2% 0)",
  editorial: "inset(0 2.5% 0 2.5%)",
  commerce: "inset(1% 1.5% 2% 1.5%)",
  research: "inset(1.5%)",
};

const departureOffset: Record<ProjectVariant, { x: number; y: number }> = {
  architecture: { x: 0, y: -8 },
  editorial: { x: -8, y: 0 },
  commerce: { x: 5, y: -4 },
  research: { x: 0, y: -6 },
};

function getPathname(href: string) {
  return new URL(href, window.location.origin).pathname;
}

function getTransitionMode(): TransitionMode {
  return window.matchMedia(DESKTOP_TRANSITION_QUERY).matches
    ? "desktop"
    : "compact";
}

function findTransitionSource(anchor: HTMLAnchorElement, projectSlug: string) {
  const selector = `[data-project-transition-source="${projectSlug}"]`;
  const localSource = anchor.querySelector<HTMLElement>(selector);
  if (localSource) return localSource;

  return anchor
    .closest<HTMLElement>("[data-project-stage], [data-next-project]")
    ?.querySelector<HTMLElement>(selector) ?? null;
}

function createTransitionElements(
  source: HTMLElement,
  projectSlug: string,
  variant: ProjectVariant,
) {
  const sourceImage =
    source instanceof HTMLImageElement ? source : source.querySelector("img");
  if (!sourceImage) return null;

  const rect = source.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return null;

  const backdrop = document.createElement("div");
  backdrop.className = styles.backdrop;
  backdrop.setAttribute("aria-hidden", "true");

  const overlay = document.createElement("div");
  overlay.className = styles.overlay;
  overlay.dataset.project = projectSlug;
  overlay.dataset.variant = variant;
  overlay.setAttribute("aria-hidden", "true");
  Object.assign(overlay.style, {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  });

  const overlayImage = document.createElement("img");
  overlayImage.src = sourceImage.currentSrc || sourceImage.src;
  overlayImage.alt = "";
  overlayImage.decoding = "async";
  overlayImage.draggable = false;

  const sourceStyle = getComputedStyle(sourceImage);
  overlayImage.style.objectFit = sourceStyle.objectFit;
  overlayImage.style.objectPosition = sourceStyle.objectPosition;

  const rule = document.createElement("i");
  rule.className = styles.rule;
  rule.setAttribute("aria-hidden", "true");

  overlay.append(overlayImage, rule);
  document.body.append(backdrop, overlay);

  const previousOpacity = source.style.opacity;
  source.style.opacity = "0";

  return {
    backdrop,
    overlay,
    overlayImage,
    restoreSource: () => {
      source.style.opacity = previousOpacity;
    },
  };
}

export function ProjectTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const activeRef = useRef<ActiveTransition | null>(null);

  const prefetch = useCallback(
    (href: string) => {
      router.prefetch(href);
    },
    [router],
  );

  const canTransition = useCallback(() => {
    return (
      activeRef.current === null &&
      !window.matchMedia(REDUCED_MOTION_QUERY).matches
    );
  }, []);

  const finish = useCallback((focusDestination = true) => {
    const active = activeRef.current;
    if (!active) return;

    window.clearTimeout(active.timeoutId);
    active.restoreSource();
    active.overlay.remove();
    active.backdrop.remove();
    activeRef.current = null;
    delete document.body.dataset.projectTransition;
    window.dispatchEvent(new Event("project-transition:complete"));

    if (focusDestination) {
      document.querySelector<HTMLElement>("#main-content")?.focus({
        preventScroll: true,
      });
    }
  }, []);

  const navigate = useCallback(
    (active: ActiveTransition) => {
      router.push(active.href, { scroll: false });
    },
    [router],
  );

  const start = useCallback(
    (request: ProjectTransitionRequest) => {
      if (!canTransition()) return;

      const elements = createTransitionElements(
        request.source,
        request.projectSlug,
        request.variant,
      );
      if (!elements) {
        router.push(request.href);
        return;
      }

      const mode = getTransitionMode();
      document.body.dataset.projectTransition = "active";
      window.dispatchEvent(new Event("project-transition:start"));
      prefetch(request.href);

      const active: ActiveTransition = {
        ...request,
        ...elements,
        mode,
        timeoutId: window.setTimeout(() => {
          if (activeRef.current === active) {
            finish(false);
            window.location.assign(request.href);
          }
        }, 8_000),
      };
      activeRef.current = active;

      if (mode === "compact") {
        const backdropAnimation = active.backdrop.animate(
          [{ opacity: 0 }, { opacity: 0.86 }],
          { duration: 140, easing: "ease-out", fill: "forwards" },
        );
        const overlayAnimation = active.overlay.animate(
          [
            { opacity: 1, transform: "scale(1)", clipPath: "inset(0)" },
            {
              opacity: 0.94,
              transform: "scale(1.015)",
              clipPath: departureClip[request.variant],
            },
          ],
          { duration: 170, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
        );

        void Promise.allSettled([
          backdropAnimation.finished,
          overlayAnimation.finished,
        ]).then(() => {
          if (activeRef.current === active) navigate(active);
        });
        return;
      }

      void import("@/lib/project-transition-gsap")
        .then(({ gsap }) => {
          if (activeRef.current !== active) return;

          const offset = departureOffset[request.variant];
          gsap
            .timeline({ onComplete: () => navigate(active) })
            .to(
              active.backdrop,
              { opacity: 0.9, duration: 0.18, ease: "power2.out" },
              0,
            )
            .to(
              active.overlay,
              {
                x: offset.x,
                y: offset.y,
                scale: 1.012,
                clipPath: departureClip[request.variant],
                duration: 0.22,
                ease: "power3.out",
              },
              0,
            );
        })
        .catch(() => {
          if (activeRef.current === active) navigate(active);
        });
    },
    [canTransition, finish, navigate, prefetch, router],
  );

  useLayoutEffect(() => {
    const active = activeRef.current;
    if (!active || pathname !== getPathname(active.href)) return;

    window.dispatchEvent(new Event("project-transition:route"));
    window.scrollTo(0, 0);

    let frameId = 0;
    let attempts = 0;

    const settle = () => {
      const target = document.querySelector<HTMLElement>(
        `[data-project-transition-target="${active.projectSlug}"]`,
      );

      if (!target && attempts < 24) {
        attempts += 1;
        frameId = window.requestAnimationFrame(settle);
        return;
      }

      if (!target) {
        finish();
        return;
      }

      target.style.opacity = "0";
      if (target instanceof HTMLImageElement && target.currentSrc) {
        active.overlayImage.src = target.currentSrc;
      }

      const revealElements = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-case-hero-meta], [data-case-title], [data-case-hero-lead]",
        ),
      );

      if (active.mode === "compact") {
        target.style.opacity = "1";
        revealElements.forEach((element, index) => {
          element.style.opacity = "1";
          element.animate(
            [
              { opacity: 0, transform: "translateY(8px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 220,
              delay: index * 24,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
          );
        });

        const arrival = active.overlay.animate(
          [
            { opacity: 0.94, transform: "scale(1.015)" },
            { opacity: 0, transform: "scale(1.025)" },
          ],
          { duration: 210, easing: "ease-out", fill: "forwards" },
        );
        void arrival.finished.then(() => finish());
        return;
      }

      void import("@/lib/project-transition-gsap")
        .then(({ Flip, gsap }) => {
          if (activeRef.current !== active) return;

          const targetRect = target.getBoundingClientRect();
          const state = Flip.getState(active.overlay);
          gsap.set(active.overlay, {
            x: 0,
            y: 0,
            scale: 1,
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
            clipPath: "inset(0)",
          });

          gsap.fromTo(
            revealElements,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.045,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
            },
          );
          gsap.to(active.backdrop, {
            opacity: 0,
            delay: 0.24,
            duration: 0.28,
            ease: "power2.out",
          });

          Flip.from(state, {
            absolute: true,
            duration: 0.54,
            ease: "power3.inOut",
            scale: true,
            onComplete: () => {
              target.style.opacity = "1";
              gsap.to(active.overlay, {
                opacity: 0,
                duration: 0.12,
                ease: "power1.out",
                onComplete: () => finish(),
              });
            },
          });
        })
        .catch(() => {
          if (activeRef.current !== active) return;

          target.style.opacity = "1";
          revealElements.forEach((element) => {
            element.style.opacity = "1";
            element.style.visibility = "visible";
          });
          finish();
        });
    };

    frameId = window.requestAnimationFrame(settle);
    return () => window.cancelAnimationFrame(frameId);
  }, [finish, pathname]);

  useEffect(() => {
    return () => {
      finish(false);
    };
  }, [finish]);

  const value: ProjectTransitionContextValue = {
    canTransition,
    prefetch,
    start,
  };

  return (
    <ProjectTransitionContext.Provider value={value}>
      {children}
    </ProjectTransitionContext.Provider>
  );
}

export function ProjectTransitionLink({
  ariaLabel,
  children,
  className,
  href,
  projectSlug,
  variant,
}: ProjectTransitionLinkProps) {
  const transition = useContext(ProjectTransitionContext);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={anchorRef}
      className={className}
      href={href}
      aria-label={ariaLabel}
      data-project-transition-link={projectSlug}
      onFocus={() => transition?.prefetch(href)}
      onPointerEnter={() => transition?.prefetch(href)}
      onNavigate={(event) => {
        if (!transition?.canTransition()) return;

        const anchor = anchorRef.current;
        const source = anchor
          ? findTransitionSource(anchor, projectSlug)
          : null;
        if (!source) return;

        event.preventDefault();
        transition.start({ href, projectSlug, source, variant });
      }}
    >
      {children}
    </Link>
  );
}
