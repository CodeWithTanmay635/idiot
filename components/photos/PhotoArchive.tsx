"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/types/photo";
import { PhotoBackground } from "./PhotoBackground";
import { PhotoStage } from "./PhotoStage";
import { PhotoCaption } from "./PhotoCaption";
import { PhotoNavigation } from "./PhotoNavigation";
import styles from "./PhotoArchive.module.css";

/*
  Entrance phases (ms after mount):
  1 →  120ms  background fades in
  2 →  500ms  background settles + header appears
  3 →  700ms  current photo appears
  4 → 1000ms  title / caption fades up
  5 → 1200ms  navigation becomes visible
*/
const ENTRANCE_DELAYS = [120, 500, 700, 1000, 1200];

/**
 * Transition timeline:
 *
 *   t=0       → stageHiding=true  (photo dims out)
 *   t=220ms   → swap currentIndex, stageHiding=false, stageEntering=true
 *   t=220ms+  → new photo enters (opacity 0 → 1 via stageVisible+stageEntering)
 *   t=280ms   → stageEntering=false (stageVisible holds opacity:1)
 *   t=900ms   → unlock navigation
 */
const HIDE_DURATION_MS   = 220;
const ENTER_HOLD_MS      = 60;
const UNLOCK_DELAY_MS    = 900;

interface PhotoArchiveProps {
  photos: Photo[];
}

export function PhotoArchive({ photos }: PhotoArchiveProps) {
  const [phase, setPhase] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  // Stage animation state
  const [stageHiding,   setStageHiding]   = useState(false);
  const [stageEntering, setStageEntering] = useState(false);

  // Caption key — increment to force re-mount & replay the fade-in
  const [captionKey, setCaptionKey] = useState(0);

  const [cursorHover, setCursorHover] = useState(false);

  const cursorRef   = useRef<HTMLDivElement>(null);
  const lockRef     = useRef(false);

  // Touch tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Wheel single-step debounce
  const wheelCooldown = useRef(false);

  // ── Entrance animation ─────────────────────────────────────── //
  useEffect(() => {
    const timers = ENTRANCE_DELAYS.map((d, i) =>
      setTimeout(() => setPhase(i + 1), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // ── Custom cursor (fine pointer only) ─────────────────────── //
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // ── Navigation logic ──────────────────────────────────────── //
  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (lockRef.current) return;
      const nextIndex =
        direction === "next" ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex < 0 || nextIndex >= photos.length) return;

      lockRef.current = true;

      // Phase A: hide current photo
      setStageHiding(true);

      setTimeout(() => {
        // Phase B: swap photo, begin entry animation
        setBgIndex(currentIndex);      // bg now shows the outgoing photo
        setCurrentIndex(nextIndex);
        setStageHiding(false);
        setStageEntering(true);
        setCaptionKey(k => k + 1);

        // Phase C: remove entering state so stageVisible takes full effect
        setTimeout(() => {
          setStageEntering(false);
        }, ENTER_HOLD_MS);

      }, HIDE_DURATION_MS);

      // Phase D: unlock after full transition
      setTimeout(() => {
        lockRef.current = false;
      }, UNLOCK_DELAY_MS);
    },
    [currentIndex, photos.length]
  );

  // ── Keyboard navigation ───────────────────────────────────── //
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  // ── Mouse wheel (debounced to one step) ──────────────────── //
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelCooldown.current) return;
      wheelCooldown.current = true;
      navigate(e.deltaY > 0 ? "next" : "prev");
      setTimeout(() => {
        wheelCooldown.current = false;
      }, UNLOCK_DELAY_MS + 100);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [navigate]);

  // ── Touch swipe navigation ───────────────────────────────── //
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      touchStartX.current = null;
      touchStartY.current = null;
      // Only swipe if horizontal intent dominates (threshold 45px)
      if (Math.abs(dx) < 45 || Math.abs(dy) > Math.abs(dx) * 0.7) return;
      navigate(dx < 0 ? "next" : "prev");
    },
    [navigate]
  );

  const currentPhoto = photos[currentIndex];
  const bgPhoto      = photos[bgIndex];

  // ── Stage visual state ─────────────────────────────────────────
  const stagePhase: 0 | 1 | 2 =
    phase === 0 ? 0 : phase >= 4 ? 2 : phase >= 3 ? 1 : 0;

  const stageState: "in" | "hiding" | "idle" =
    stageEntering ? "in" :
    stageHiding   ? "hiding" :
                    "idle";

  return (
    <>
      {/* ── CUSTOM CURSOR ──────────────────────────────────── */}
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${cursorHover ? styles.cursorHover : ""}`}
        aria-hidden="true"
      />

      <main
        className={styles.archive}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Photographic archive"
      >
        {/* ── BACKGROUND LAYERS ──────────────────────────────
            bg shows the bgIndex photo (the outgoing, or current on first load).
            It intentionally lags behind the foreground swap,
            creating a "photo receding into the background" effect.
        */}
        <div className={styles.bgStack} aria-hidden="true">
          <PhotoBackground src={bgPhoto.src} active={phase >= 1} />
        </div>

        {/* ── PAGE HEADER ───────────────────────────────────── */}
        <header className={`${styles.header} ${phase >= 2 ? styles.headerIn : ""}`}>
          <div className={styles.headerLeft}>
            <span className={styles.headerNum}>02</span>
            <span className={styles.headerSep}>/</span>
            <span className={styles.headerTag}>ARCHIVE</span>
            <span className={styles.headerSep}>//</span>
            <span className={styles.headerDoc}>DOC 2026</span>
          </div>
          <a
            href="/"
            className={styles.backLink}
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
          >
            ← RETURN TO SUBJECT
          </a>
        </header>

        {/* ── EDITORIAL HEADING ────────────────────────────── */}
        <div
          className={`${styles.heading} ${phase >= 3 ? styles.headingIn : ""}`}
          aria-hidden="true"
        >
          <p className={styles.headingGhost}>THE</p>
          <h1 className={styles.headingTitle}>EVIDENCE</h1>
        </div>

        {/* ── MAIN PHOTO STAGE ─────────────────────────────── */}
        <div className={styles.stageArea}>
          <PhotoStage
            photo={currentPhoto}
            index={currentIndex}
            total={photos.length}
            phase={stagePhase}
            state={stageState}
          />
        </div>

        {/* ── CAPTION ──────────────────────────────────────── */}
        {/* key re-mounts caption to replay entrance animation */}
        <PhotoCaption
          key={captionKey}
          photo={currentPhoto}
          index={currentIndex}
          visible={phase >= 4}
        />

        {/* ── NAVIGATION ───────────────────────────────────── */}
        <PhotoNavigation
          index={currentIndex}
          total={photos.length}
          visible={phase >= 5}
          onPrev={() => navigate("prev")}
          onNext={() => navigate("next")}
          onCursorHover={setCursorHover}
        />

        {/* ── VERTICAL STAMP ───────────────────────────────── */}
        <p
          className={`${styles.stamp} ${phase >= 2 ? styles.stampIn : ""}`}
          aria-hidden="true"
        >
          PHOTOGRAPHIC EVIDENCE
        </p>
      </main>
    </>
  );
}
