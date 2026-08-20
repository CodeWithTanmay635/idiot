"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { LoveEvent } from "@/types/loveLife";
import { LoveLifeBackground } from "./LoveLifeBackground";
import { LoveLifeStage } from "./LoveLifeStage";
import { LoveLifeCaption } from "./LoveLifeCaption";
import { PhotoNavigation } from "../photos/PhotoNavigation";
import styles from "../photos/PhotoArchive.module.css";

const ENTRANCE_DELAYS = [120, 500, 700, 1000, 1200];
const HIDE_DURATION_MS = 220;
const ENTER_HOLD_MS = 60;
const UNLOCK_DELAY_MS = 900;

interface LoveLifeArchiveProps {
  events: LoveEvent[];
}

export function LoveLifeArchive({ events }: LoveLifeArchiveProps) {
  const [phase, setPhase] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  const [stageHiding, setStageHiding] = useState(false);
  const [stageEntering, setStageEntering] = useState(false);
  const [captionKey, setCaptionKey] = useState(0);

  const [cursorHover, setCursorHover] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const wheelCooldown = useRef(false);

  useEffect(() => {
    const timers = ENTRANCE_DELAYS.map((d, i) =>
      setTimeout(() => setPhase(i + 1), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (lockRef.current) return;
      const nextIndex =
        direction === "next" ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex < 0 || nextIndex >= events.length) return;

      lockRef.current = true;
      setStageHiding(true);

      setTimeout(() => {
        setBgIndex(currentIndex);
        setCurrentIndex(nextIndex);
        setStageHiding(false);
        setStageEntering(true);
        setCaptionKey((k) => k + 1);

        setTimeout(() => {
          setStageEntering(false);
        }, ENTER_HOLD_MS);

        setTimeout(() => {
          lockRef.current = false;
        }, UNLOCK_DELAY_MS);
      }, HIDE_DURATION_MS);
    },
    [currentIndex, events.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30) return;
      if (wheelCooldown.current) return;

      wheelCooldown.current = true;
      if (e.deltaY > 0) navigate("next");
      else navigate("prev");

      setTimeout(() => {
        wheelCooldown.current = false;
      }, 850);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [navigate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) navigate("next");
      else navigate("prev");
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentEvent = events[currentIndex] ?? events[0];
  const bgEvent = events[bgIndex] ?? events[0];

  const stageState = stageHiding ? "hiding" : stageEntering ? "in" : "idle";
  const stagePhase = (phase >= 3 ? 2 : phase >= 1 ? 1 : 0) as 0 | 1 | 2;
  const isTransitioning = stageHiding || stageEntering;

  return (
    <>
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${
          cursorHover ? styles.cursorHover : ""
        }`}
        aria-hidden="true"
      />

      <main
        className={styles.archive}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Love Life Romance Archive"
      >
        <LoveLifeBackground
          currentEvent={currentEvent}
          bgEvent={bgEvent}
          phase={stagePhase}
          isTransitioning={isTransitioning}
        />

        <header
          className={`${styles.header} ${
            phase >= 2 ? styles.headerIn : ""
          }`}
        >
          <div className={styles.headerLeft}>
            <span className={styles.headerNum}>03</span>
            <span className={styles.headerSep}>/</span>
            <span className={styles.headerTag}>ROMANCE INQUEST</span>
            <span className={styles.headerSep}>//</span>
            <span className={styles.headerDoc}>DOC 2026</span>
          </div>

          <Link
            href="/"
            className={styles.backLink}
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
          >
            ← RETURN TO SUBJECT
          </Link>
        </header>

        <div
          className={`${styles.heading} ${
            phase >= 2 ? styles.headingIn : ""
          }`}
        >
          <p className={styles.headingGhost} aria-hidden="true">
            THE INCIDENTS
          </p>
          <h1 className={styles.headingTitle}>LOVE LIFE</h1>
        </div>

        <section className={styles.stageArea} aria-label="Current Incident Frame">
          <LoveLifeStage
            event={currentEvent}
            index={currentIndex}
            total={events.length}
            phase={stagePhase}
            state={stageState}
          />
        </section>

        <LoveLifeCaption
          key={captionKey}
          event={currentEvent}
          index={currentIndex}
          total={events.length}
          phase={phase >= 4 ? 1 : 0}
        />

        <PhotoNavigation
          index={currentIndex}
          total={events.length}
          visible={phase >= 5}
          onPrev={() => navigate("prev")}
          onNext={() => navigate("next")}
          onCursorHover={setCursorHover}
        />
      </main>
    </>
  );
}
