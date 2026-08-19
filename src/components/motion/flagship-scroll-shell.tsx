"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

import styles from "./flagship-scroll-shell.module.css";

const FlagshipScrollRuntime = dynamic(
  () =>
    import("./flagship-scroll-runtime").then(
      (module) => module.FlagshipScrollRuntime,
    ),
  { ssr: false },
);

const CINEMATIC_QUERY =
  "(min-width: 80rem) and (min-height: 46rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

interface FlagshipScrollShellProps {
  children: ReactNode;
  listClassName: string;
  projectCount: number;
}

export function FlagshipScrollShell({
  children,
  listClassName,
  projectCount,
}: FlagshipScrollShellProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(CINEMATIC_QUERY);
    const sync = () => setEnabled(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return (
    <div className={styles.root} data-flagship-scroll-root>
      <div className={styles.rail} aria-hidden="true">
        <div className={styles.railInner}>
          <span className={styles.railLabel}>Sequence</span>
          <span className={styles.track}>
            <i data-flagship-progress />
          </span>
          <ol>
            {Array.from({ length: projectCount }, (_, index) => (
              <li data-flagship-marker={index} key={index}>
                {String(index + 1).padStart(2, "0")}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <ol className={listClassName}>{children}</ol>
      {enabled ? <FlagshipScrollRuntime /> : null}
    </div>
  );
}
