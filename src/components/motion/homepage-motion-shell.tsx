"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

import styles from "./homepage-motion-shell.module.css";

const HomepageMotionRuntime = dynamic(
  () =>
    import("./homepage-motion-runtime").then(
      (module) => module.HomepageMotionRuntime,
    ),
  { ssr: false },
);

const HOMEPAGE_MOTION_QUERY =
  "(min-width: 64.01rem) and (min-height: 40rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function HomepageMotionShell({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(HOMEPAGE_MOTION_QUERY);
    const sync = () => setEnabled(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return (
    <main
      id="main-content"
      className={styles.root}
      tabIndex={-1}
      data-home-motion-root
      data-signal-chapter="hero"
    >
      <div className={styles.signalLayer} data-ambient-signal aria-hidden="true">
        <i className={styles.horizontal} />
        <i className={styles.vertical} />
        <i className={styles.node} />
        <span
          className={styles.coordinate}
          data-coordinate="H—00 / 07"
        />
      </div>
      {children}
      {enabled ? <HomepageMotionRuntime /> : null}
    </main>
  );
}
