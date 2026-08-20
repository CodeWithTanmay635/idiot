"use client";

import { memo } from "react";
import styles from "../photos/PhotoArchive.module.css";
import type { LoveEvent } from "@/types/loveLife";

interface LoveLifeStageProps {
  event: LoveEvent;
  index: number;
  total: number;
  phase: number;
  state: "hiding" | "in" | "idle";
}

export const LoveLifeStage = memo(function LoveLifeStage({
  event,
  index,
  total,
  phase,
  state,
}: LoveLifeStageProps) {
  const frameClass = [
    styles.stage,
    phase >= 1 && state !== "hiding" && state !== "in"
      ? styles.stageVisible
      : "",
    phase >= 2 ? styles.stageSettled : "",
    state === "hiding" ? styles.stageHiding : "",
    state === "in" ? styles.stageEntering : "",
  ]
    .filter(Boolean)
    .join(" ");

  const paddedIndex = String(index + 1).padStart(2, "0");
  const paddedTotal = String(total).padStart(2, "0");

  const bgStyle: React.CSSProperties = event.src
    ? {
        backgroundImage: `url('${event.src}')`,
        backgroundSize: "auto 140%",
        backgroundPosition: event.objectPosition ?? "center center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#020202",
      }
    : {};

  return (
    <div
      className={frameClass}
      aria-label={`Romance Incident ${paddedIndex} of ${paddedTotal}`}
    >
      {/* Corner marks */}
      <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

      {event.src ? (
        <div
          className={styles.stageImg}
          style={bgStyle}
          role="img"
          aria-label={event.detail}
        />
      ) : (
        <div className={styles.stagePlaceholder}>
          <span className={styles.stagePlaceholderNum}>{paddedIndex}</span>
        </div>
      )}

      {/* Film counter badge */}
      <span className={styles.stageCounter} aria-hidden="true">
        CASE {paddedIndex} / {paddedTotal}
      </span>
    </div>
  );
});
