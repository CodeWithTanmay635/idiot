"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";

/*
  Animation phases (ms after mount):
  1 →  80ms  photo fades in + scale begins
  2 → 500ms  top bar
  3 → 750ms  THE SUBJECT + name
  4 → 1050ms description
  5 → 1280ms status
  6 → 1500ms CTA
*/
const DELAYS = [80, 500, 750, 1050, 1280, 1500];

export function Hero() {
  const [phase, setPhase] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    const timers = DELAYS.map((d, i) =>
      setTimeout(() => setPhase(i + 1), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Custom cursor — fine pointer devices only
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const cx = (...c: (string | false | undefined)[]) =>
    c.filter(Boolean).join(" ");

  return (
    <>
      {/* ── CUSTOM CURSOR (desktop only) ──────────────────────── */}
      <div
        ref={cursorRef}
        className={cx(styles.cursor, cursorHover && styles.cursorHover)}
        aria-hidden="true"
      />

      <section className={styles.hero} aria-label="Subject archive">

        {/* ── FULL-BLEED PHOTO ──────────────────────────────────
            Photo fills 100vw × 100vh. Gradients layer on top.
            The photo is always fully visible beneath gradients.     */}
        <div
          className={cx(styles.photo, phase >= 1 && styles.photoIn)}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/rohan.jpg"
            alt=""
            className={cx(styles.img, phase >= 1 && styles.imgSettled)}
          />

          {/* Gradient 1 — bottom fade: makes lower-left text readable */}
          <div className={styles.gBottom} />
          {/* Gradient 2 — top vignette: subtle header zone */}
          <div className={styles.gTop} />
          {/* Gradient 3 — gentle overall cinematic tint */}
          <div className={styles.gDim} />
        </div>

        {/* ── TOP BAR ───────────────────────────────────────────── */}
        <header className={cx(styles.bar, phase >= 2 && styles.barIn)}>
          <div className={styles.archiveId}>
            <span className={styles.num}>001</span>
            <span className={styles.sep}>/</span>
            <span className={styles.tag}>SUBJECT PROFILE</span>
            <span className={styles.sep}>//</span>
            <span className={styles.docBox}>DOC 2026</span>
          </div>

          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
          >
            <span className={styles.menuLabel}>MENU</span>
            <span className={styles.burger} data-open={menuOpen}>
              <span /><span /><span />
            </span>
          </button>
        </header>

        {/* ── SLIDE-OUT MENU ────────────────────────────────────── */}
        <nav
          className={cx(styles.drawer, menuOpen && styles.drawerOpen)}
          aria-hidden={!menuOpen}
        >
          {[
            ["Photos",    "/photos"],
            ["Clips",     "/clips"],
            ["Love Life", "/love-life"],
            ["Politics",  "/political-affiliation"],
            ["Chat",      "/chat"],
          ].map(([label, href], i) => (
            <Link
              key={href}
              href={href}
              className={styles.drawerLink}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
              onClick={() => setMenuOpen(false)}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              <span className={styles.drawerNum}>0{i + 1}</span>
              {label}
            </Link>
          ))}
        </nav>

        {/* ── CONTENT — absolutely positioned, bottom-left ──────── */}
        <div className={styles.content}>

          {/* Title */}
          <div className={cx(styles.titleWrap, phase >= 3 && styles.titleIn)}>
            <p className={styles.label} aria-hidden="true">
              THE<br />SUBJECT
            </p>
            <h1 className={styles.name}>ROHAN</h1>
          </div>

          {/* Description */}
          <div className={cx(styles.desc, phase >= 4 && styles.descIn)}>
            <span className={styles.rule} />
            <p className={styles.descMain}>
              A brief documentation of the man,<br />
              the myths, the memes and the<br />
              questionable decisions.
            </p>
            <p className={styles.descSub}>
              Compiled by people who unfortunately know him.
            </p>
          </div>

          {/* Status */}
          <dl className={cx(styles.status, phase >= 5 && styles.statusIn)}>
            {([ ["STATUS","Alive"], ["AGE","20"], ["LOCATION","Bedroom"], ["DOCUMENT","2026"] ] as const).map(([k,v]) => (
              <div key={k} className={styles.statusRow}>
                <dt className={styles.statusKey}>{k}</dt>
                <dd className={styles.statusVal}>{v}</dd>
              </div>
            ))}
          </dl>

          {/* CTA */}
          <div className={cx(styles.ctaWrap, phase >= 6 && styles.ctaIn)}>
            <Link
              href="/photos"
              className={styles.cta}
              id="see-what-we-found"
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              <span className={styles.ctaLabel}>SEE WHAT WE FOUND</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </div>

        {/* ── BOTTOM-RIGHT STAMP ────────────────────────────────── */}
        <p
          className={cx(styles.stamp, phase >= 2 && styles.stampIn)}
          aria-hidden="true"
        >
          CLASSIFIED
        </p>

      </section>
    </>
  );
}
