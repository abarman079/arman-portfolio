"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import styles from "./interactive-lab-section.module.css";

const InteractiveLabCanvas = dynamic(
  () =>
    import("../three/interactive-lab-canvas").then(
      (module) => module.InteractiveLabCanvas,
    ),
  { ssr: false },
);

const ENHANCEMENT_QUERY =
  "(min-width: 64.01rem) and (min-height: 40rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function hasWebGlSupport() {
  try {
    const testCanvas = document.createElement("canvas");
    const context =
      testCanvas.getContext("webgl2", { powerPreference: "low-power" }) ??
      testCanvas.getContext("webgl", { powerPreference: "low-power" });

    if (!context) return false;

    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

interface CanvasBoundaryProps {
  children: ReactNode;
}

interface CanvasBoundaryState {
  failed: boolean;
}

class CanvasBoundary extends Component<CanvasBoundaryProps, CanvasBoundaryState> {
  state: CanvasBoundaryState = { failed: false };

  static getDerivedStateFromError(): CanvasBoundaryState {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function InteractiveLabCanvasLoader() {
  const hostRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useRef(false);
  const webGlSupport = useRef<boolean | null>(null);
  const [eligible, setEligible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [dprMax, setDprMax] = useState(1.25);

  useEffect(() => {
    const mediaQuery = window.matchMedia(ENHANCEMENT_QUERY);

    function updateEligibility() {
      if (mediaQuery.matches && webGlSupport.current === null) {
        webGlSupport.current = hasWebGlSupport();
      }

      const nextEligible = mediaQuery.matches && webGlSupport.current === true;
      setEligible(nextEligible);
      setDprMax(window.innerWidth >= 1600 ? 1.5 : 1.25);

      if (!nextEligible) setIsActive(false);
    }

    updateEligibility();
    mediaQuery.addEventListener("change", updateEligibility);
    window.addEventListener("resize", updateEligibility, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", updateEligibility);
      window.removeEventListener("resize", updateEligibility);
    };
  }, []);

  useEffect(() => {
    if (!eligible) return;

    const host = hostRef.current;
    if (!host) return;

    function syncActivity() {
      setIsActive(isIntersecting.current && !document.hidden);
    }

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "120px 0px" },
    );

    const activityObserver = new IntersectionObserver(([entry]) => {
      isIntersecting.current = entry.isIntersecting;
      syncActivity();
    });

    loadObserver.observe(host);
    activityObserver.observe(host);
    document.addEventListener("visibilitychange", syncActivity);

    return () => {
      loadObserver.disconnect();
      activityObserver.disconnect();
      document.removeEventListener("visibilitychange", syncActivity);
      isIntersecting.current = false;
    };
  }, [eligible]);

  return (
    <div
      ref={hostRef}
      className={styles.canvasHost}
      aria-hidden="true"
      data-enhanced={canvasReady && isActive}
    >
      {eligible && shouldLoad ? (
        <CanvasBoundary>
          <InteractiveLabCanvas
            active={isActive}
            dprMax={dprMax}
            onReady={() => {
              setCanvasReady(true);

              const lab = hostRef.current?.closest<HTMLElement>("[data-ml-lab]");
              const progress = Number.parseFloat(
                lab ? getComputedStyle(lab).getPropertyValue("--lab-progress") : "0.5",
              );

              window.dispatchEvent(
                new CustomEvent("lab:progress", {
                  detail: { progress: Number.isFinite(progress) ? progress : 0.5 },
                }),
              );
            }}
          />
        </CanvasBoundary>
      ) : null}
    </div>
  );
}
