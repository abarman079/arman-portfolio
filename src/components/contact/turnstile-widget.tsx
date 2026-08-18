"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import { CONTACT_TURNSTILE_ACTION } from "@/schemas/contact";

import styles from "./contact-form.module.css";

interface TurnstileOptions {
  sitekey: string;
  action: string;
  theme: "dark";
  size: "flexible";
  appearance: "interaction-only";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "timeout-callback": () => void;
  "error-callback": () => void;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

interface TurnstileWidgetProps {
  siteKey: string;
  resetSignal: string;
  onTokenChange: (token: string) => void;
}

export function TurnstileWidget({
  siteKey,
  resetSignal,
  onTokenChange,
}: TurnstileWidgetProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [status, setStatus] = useState<
    "waiting" | "loading" | "ready" | "expired" | "error"
  >("waiting");

  const renderWidget = useCallback(() => {
    if (!hostRef.current || !window.turnstile || widgetIdRef.current) {
      return;
    }

    setStatus("loading");

    try {
      widgetIdRef.current = window.turnstile.render(hostRef.current, {
        sitekey: siteKey,
        action: CONTACT_TURNSTILE_ACTION,
        theme: "dark",
        size: "flexible",
        appearance: "interaction-only",
        callback: (token) => {
          onTokenChange(token);
          setStatus("ready");
        },
        "expired-callback": () => {
          onTokenChange("");
          setStatus("expired");
        },
        "timeout-callback": () => {
          onTokenChange("");
          setStatus("expired");
        },
        "error-callback": () => {
          onTokenChange("");
          setStatus("error");
        },
      });
    } catch {
      setStatus("error");
    }
  }, [onTokenChange, siteKey]);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (resetSignal !== "idle" && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      onTokenChange("");
      setStatus("loading");
    }
  }, [onTokenChange, resetSignal]);

  useEffect(
    () => () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    },
    [],
  );

  const statusMessage = {
    waiting: "Verification will load when this form enters view.",
    loading: "Verification is loading.",
    ready: "Verification complete.",
    expired: "Verification expired. Complete it again before sending.",
    error: "Verification could not load. Retry or use direct email.",
  }[status];

  return (
    <div className={styles.turnstileRegion}>
      {shouldLoad ? (
        <Script
          id="cloudflare-turnstile"
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderWidget}
          onError={() => setStatus("error")}
        />
      ) : null}
      <div ref={hostRef} className={styles.turnstileHost} />
      <p className={styles.turnstileStatus} aria-live="polite">
        {statusMessage}
      </p>
    </div>
  );
}
