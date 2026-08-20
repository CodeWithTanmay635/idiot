"use client";

import { memo } from "react";
import styles from "../photos/PhotoArchive.module.css";
import type { Clip } from "@/types/clip";

interface ClipStageProps {
  clip: Clip;
  index: number;
  total: number;
  phase: number;
  state: "hiding" | "in" | "idle";
}

export const ClipStage = memo(function ClipStage({
  clip,
  index,
  total,
  phase,
  state,
}: ClipStageProps) {
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

  const isVideo =
    clip.src &&
    (clip.src.endsWith(".mp4") ||
      clip.src.endsWith(".webm") ||
      clip.src.endsWith(".mov"));

  const bgStyle: React.CSSProperties =
    clip.src && !isVideo
      ? {
          backgroundImage: `url('${clip.src}')`,
          backgroundSize: "auto 140%",
          backgroundPosition: clip.objectPosition ?? "center center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#020202",
        }
      : {};

  return (
    <div
      className={frameClass}
      aria-label={`Surveillance Clip ${paddedIndex} of ${paddedTotal}`}
    >
      {/* Corner marks */}
      <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

      {isVideo ? (
        <video
          src={clip.src}
          controls
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : clip.src ? (
        <div
          className={styles.stageImg}
          style={bgStyle}
          role="img"
          aria-label={clip.description}
        />
      ) : (
        <div className={styles.stagePlaceholder}>
          <span className={styles.stagePlaceholderNum}>{paddedIndex}</span>
        </div>
      )}

      {/* Counter Badge */}
      <span className={styles.stageCounter} aria-hidden="true">
        REC {paddedIndex} / {paddedTotal}
      </span>
    </div>
  );
});
