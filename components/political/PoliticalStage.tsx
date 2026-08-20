"use client";

import { memo } from "react";
import styles from "../photos/PhotoArchive.module.css";
import type { PoliticalExhibit } from "@/types/political";

interface PoliticalStageProps {
  exhibit: PoliticalExhibit;
  index: number;
  total: number;
  phase: number;
  state: "hiding" | "in" | "idle";
}

export const PoliticalStage = memo(function PoliticalStage({
  exhibit,
  index,
  total,
  phase,
  state,
}: PoliticalStageProps) {
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

  const bgStyle: React.CSSProperties = exhibit.src
    ? {
        backgroundImage: `url('${exhibit.src}')`,
        backgroundSize: "auto 140%",
        backgroundPosition: exhibit.objectPosition ?? "center center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#020202",
      }
    : {};

  return (
    <div
      className={frameClass}
      aria-label={`Political Exhibit ${paddedIndex} of ${paddedTotal}`}
    >
      {/* Corner marks */}
      <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

      {exhibit.src ? (
        <div
          className={styles.stageImg}
          style={bgStyle}
          role="img"
          aria-label={exhibit.detail}
        />
      ) : (
        <div className={styles.stagePlaceholder}>
          <span className={styles.stagePlaceholderNum}>{paddedIndex}</span>
        </div>
      )}

      {/* Film counter badge */}
      <span className={styles.stageCounter} aria-hidden="true">
        EXHIBIT {paddedIndex} / {paddedTotal}
      </span>
    </div>
  );
});
