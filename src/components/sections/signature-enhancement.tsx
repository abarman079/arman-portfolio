"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./signature-enhancement.module.css";

const eligibility = "(min-width: 64.01rem) and (min-height: 40rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
type SceneStatus = "still" | "loading" | "ready" | "unavailable";

export function SignatureEnhancement({ children }: { children: ReactNode }) {
  const mount = useRef<HTMLDivElement>(null);
  const [requested, setRequested] = useState(false);
  const [status, setStatus] = useState<SceneStatus>("still");

  useEffect(() => {
    const media = window.matchMedia(eligibility);
    const stopIfIneligible = () => {
      if (!media.matches) {
        setRequested(false);
        setStatus("still");
      }
    };
    media.addEventListener("change", stopIfIneligible);
    return () => media.removeEventListener("change", stopIfIneligible);
  }, []);

  useEffect(() => {
    const host = mount.current;
    if (!requested || !host || !window.matchMedia(eligibility).matches) return;
    let live = true;
    let dispose: (() => void) | undefined;
    const fail = () => {
      if (!live) return;
      setStatus("unavailable");
      setRequested(false);
    };
    void import("../three/signature-3d-runtime")
      .then(({ mountSignature3D }) => {
        if (!live) return;
        dispose = mountSignature3D(host, {
          ready: () => { if (live) setStatus("ready"); },
          fail,
        });
      })
      .catch(fail);
    return () => {
      live = false;
      dispose?.();
    };
  }, [requested]);

  function toggleScene() {
    if (!window.matchMedia(eligibility).matches) return;
    if (requested) {
      setRequested(false);
      setStatus("still");
      return;
    }
    setStatus("loading");
    setRequested(true);
  }

  return (
    <div className={styles.scene} data-signature-status={status}>
      <div className={styles.viewport}>
        <div className={styles.still} aria-hidden="true">{children}</div>
        <div className={styles.webgl} ref={mount} aria-hidden="true" data-signature-webgl />
      </div>
      <div className={styles.controls}>
        <p role="status" aria-live="polite">
          {status === "ready" ? "Move your pointer or scroll to change the view." : status === "loading" ? "Preparing the 3D view…" : status === "unavailable" ? "3D is unavailable on this device. The illustration remains available." : "Three layers: interface, logic and data."}
        </p>
        <button type="button" onClick={toggleScene}>
          {requested ? "Use illustration" : "Explore 3D"}
        </button>
      </div>
    </div>
  );
}
