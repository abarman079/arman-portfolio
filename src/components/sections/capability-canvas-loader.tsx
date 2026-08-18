"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import styles from "./capability-gallery.module.css";

const CapabilityCanvas = dynamic(
  () =>
    import("../three/capability-canvas").then(
      (module) => module.CapabilityCanvas,
    ),
  { ssr: false },
);

const ENHANCEMENT_QUERY =
  "(min-width: 64.01rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function hasWebGlSupport() {
  try {
    const testCanvas = document.createElement("canvas");
    const context =
      testCanvas.getContext("webgl2", { powerPreference: "low-power" }) ??
      testCanvas.getContext("webgl", { powerPreference: "low-power" });

    if (!context) {
      return false;
    }

    const loseContext = context.getExtension("WEBGL_lose_context");
    loseContext?.loseContext();
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

export function CapabilityCanvasLoader() {
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
      setDprMax(window.innerWidth >= 1280 ? 1.5 : 1.25);

      if (!nextEligible) {
        setIsActive(false);
      }
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
    if (!eligible) {
      return;
    }

    const gallery = hostRef.current?.closest("[data-capability-gallery]");

    if (!gallery) {
      return;
    }

    function syncActivity() {
      setIsActive(isIntersecting.current && !document.hidden);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setShouldLoad(true);
        }
        syncActivity();
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(gallery);
    document.addEventListener("visibilitychange", syncActivity);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncActivity);
      isIntersecting.current = false;
    };
  }, [eligible]);

  return (
    <div
      className={styles.canvasHost}
      ref={hostRef}
      aria-hidden="true"
      data-enhanced={canvasReady && isActive}
    >
      {eligible && shouldLoad ? (
        <CanvasBoundary>
          <CapabilityCanvas
            active={isActive}
            dprMax={dprMax}
            onReady={() => setCanvasReady(true)}
          />
        </CanvasBoundary>
      ) : null}
    </div>
  );
}
