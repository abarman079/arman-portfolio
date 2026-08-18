"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import styles from "./copy-email.module.css";

interface CopyEmailProps {
  email: string;
}

function fallbackCopy(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

export function CopyEmail({ email }: CopyEmailProps) {
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else if (!fallbackCopy(email)) {
        throw new Error("Clipboard copy was unavailable.");
      }

      setStatus("copied");
    } catch {
      setStatus("error");
    }

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }
    resetTimer.current = setTimeout(() => setStatus("idle"), 2_400);
  }

  const label =
    status === "copied" ? "Copied" : status === "error" ? "Copy unavailable" : "Copy email";

  return (
    <button className={styles.button} type="button" onClick={copyEmail}>
      <span aria-hidden="true">{status === "copied" ? "✓" : "⌁"}</span>
      <span className={styles.label} aria-live="polite">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={label}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
