"use client";

import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { MagneticOffset } from "@/components/motion/magnetic-offset";
import { springResponsive, springSoft } from "@/lib/motion";
import { siteConfig } from "@/lib/seo";

import styles from "./site-header.module.css";

const sectionLinks = [
  { id: "work", href: "/#work", label: "Work", index: "01" },
  { id: "expertise", href: "/#expertise", label: "Expertise", index: "02" },
  { id: "about", href: "/#about", label: "About", index: "03" },
  { id: "contact", href: "/#contact", label: "Contact", index: "04" },
] as const;

type SectionId = (typeof sectionLinks)[number]["id"];

export function SiteHeader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [pastHeroThreshold, setPastHeroThreshold] = useState(false);
  const [observedSection, setObservedSection] = useState<SectionId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === "/";
  const isCompact = !isHome || pastHeroThreshold;
  const activeSection =
    pathname === "/work" ? "work" : isHome ? observedSection : null;

  useEffect(() => {
    const sentinel = document.querySelector<HTMLElement>("[data-nav-sentinel]");
    if (!isHome || !sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPastHeroThreshold(!entry.isIntersecting),
      { rootMargin: "-1px 0px 0px", threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;

    const visibility = new Map<SectionId, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id as SectionId, entry);
        }

        const next = [...visibility.values()]
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const ratioDifference = b.intersectionRatio - a.intersectionRatio;
            if (Math.abs(ratioDifference) > 0.04) return ratioDifference;
            return Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top);
          })[0];

        setObservedSection((next?.target.id as SectionId | undefined) ?? null);
      },
      {
        rootMargin: "-24% 0px -56% 0px",
        threshold: [0, 0.08, 0.2, 0.4],
      },
    );

    for (const link of sectionLinks) {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, [isHome]);

  const closeMenu = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    document.body.dataset.menuOpen = "true";
    const desktopQuery = window.matchMedia("(min-width: 56.001rem)");
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    desktopQuery.addEventListener("change", handleDesktopChange);
    return () => {
      delete document.body.dataset.menuOpen;
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, [closeMenu, menuOpen]);

  useEffect(() => {
    closeMenu();
  }, [closeMenu, pathname]);

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    setMenuOpen(true);
    dialog.showModal();
    requestAnimationFrame(() => closeButtonRef.current?.focus());
  }

  function handleDialogClose() {
    setMenuOpen(false);
    delete document.body.dataset.menuOpen;
    menuButtonRef.current?.focus();
  }

  const railTransition = prefersReducedMotion ? { duration: 0 } : springResponsive;

  return (
    <MotionConfig reducedMotion="user">
      <header
        className={`${styles.header} ${isCompact ? styles.compact : ""}`.trim()}
        data-nav-state={isCompact ? "compact" : "expanded"}
      >
        <motion.div
          className={styles.rail}
          layout="size"
          animate={{ y: isCompact && !prefersReducedMotion ? 8 : 0 }}
          transition={railTransition}
        >
          <Link href="/" className={styles.wordmark} aria-label="Arman portfolio home">
            <MagneticOffset className={styles.magneticWordmark} strength={3}>
              <span className={styles.wordmarkName}>Arman<span aria-hidden="true">.</span></span>
              <span className={styles.wordmarkRole}>Software Engineer</span>
            </MagneticOffset>
          </Link>

          <nav className={styles.primaryNav} aria-label="Primary navigation">
            <ul>
              {sectionLinks.map((item) => {
                const active = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={active ? (pathname === "/work" ? "page" : "location") : undefined}
                    >
                      <MagneticOffset strength={3}>{item.label}</MagneticOffset>
                    </Link>
                    {active ? (
                      <motion.span
                        className={styles.activeIndicator}
                        layoutId="desktop-nav-indicator"
                        transition={springSoft}
                        aria-hidden="true"
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <nav className={styles.utilityNav} aria-label="Profile navigation">
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile, opens in a new tab"
            >
              <MagneticOffset strength={3}>GitHub <span aria-hidden="true">↗</span></MagneticOffset>
            </a>
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile, opens in a new tab"
            >
              <MagneticOffset strength={3}>LinkedIn <span aria-hidden="true">↗</span></MagneticOffset>
            </a>
            <Link href={siteConfig.resumePageUrl}>
              <MagneticOffset strength={3}>Resume <span aria-hidden="true">→</span></MagneticOffset>
            </Link>
          </nav>

          <button
            ref={menuButtonRef}
            className={styles.menuButton}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={openMenu}
          >
            <span>Menu</span>
            <span className={styles.menuGlyph} aria-hidden="true"><i /><i /></span>
          </button>
        </motion.div>

        <dialog
          ref={dialogRef}
          id="mobile-navigation"
          className={styles.dialog}
          aria-labelledby="mobile-menu-title"
          onClose={handleDialogClose}
          onCancel={(event) => {
            event.preventDefault();
            closeMenu();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              closeMenu();
            }
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeMenu();
          }}
        >
          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                className={styles.menuPanel}
                initial={prefersReducedMotion ? false : { opacity: 0.96, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : springSoft}
              >
                <div className={styles.menuHeader}>
                  <p id="mobile-menu-title">Arman<span aria-hidden="true">.</span></p>
                  <button ref={closeButtonRef} type="button" onClick={closeMenu}>
                    Close <span aria-hidden="true">×</span>
                  </button>
                </div>

                <nav className={styles.mobileNav} aria-label="Mobile navigation">
                  <ol>
                    {sectionLinks.map((item) => {
                      const active = activeSection === item.id;
                      return (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            aria-current={active ? "location" : undefined}
                          >
                            <span>{item.index}</span>
                            <strong>{item.label}</strong>
                            <span aria-hidden="true">→</span>
                          </Link>
                          {active ? (
                            <motion.span
                              className={styles.mobileIndicator}
                              layoutId="mobile-nav-indicator"
                              transition={springSoft}
                              aria-hidden="true"
                            />
                          ) : null}
                        </li>
                      );
                    })}
                  </ol>
                </nav>

                <div className={styles.menuFooter}>
                  <nav aria-label="Mobile profile links">
                    <a
                      href={siteConfig.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub profile, opens in a new tab"
                    >
                      GitHub <span aria-hidden="true">↗</span>
                    </a>
                    <a
                      href={siteConfig.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn profile, opens in a new tab"
                    >
                      LinkedIn <span aria-hidden="true">↗</span>
                    </a>
                    <Link href={siteConfig.resumePageUrl} onClick={closeMenu}>
                      Resume <span aria-hidden="true">→</span>
                    </Link>
                    <a href={siteConfig.emailHref}>Email <span aria-hidden="true">↗</span></a>
                  </nav>
                  <p><span>Based in</span>{siteConfig.location}</p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </dialog>
      </header>
    </MotionConfig>
  );
}
