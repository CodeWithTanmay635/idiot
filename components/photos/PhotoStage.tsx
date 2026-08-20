"use client";

import { memo } from "react";
import styles from "./PhotoArchive.module.css";
import type { Photo } from "@/types/photo";

interface PhotoStageProps {
  photo: Photo;
  index: number;
  total: number;
  /** entrance phase: 0=hidden, 1=entering, 2=settled */
  phase: 0 | 1 | 2;
  /**
   * transition state:
   * 'hiding'  — photo is fading out (outgoing)
   * 'in'      — photo just appeared, entering (start of in-animation)
   * 'idle'    — stable, fully visible
   */
  state: "hiding" | "in" | "idle";
}

/**
 * PhotoStage — the dominant foreground photo element.
 * Renders the current photograph as a large floating frame.
 *
 * NOTE: We render the photo as a CSS background-image (not <img>) so
 * we can use background-size: cover with a slight zoom (> 100%) to
 * crop any white/light borders baked into the source image pixels.
 * This is needed for the placeholder images (rohan.jpg etc.) which
 * have white studio borders. Real meme photos can have borderCrop: false.
 */
export const PhotoStage = memo(function PhotoStage({
  photo,
  index,
  total,
  phase,
  state,
}: PhotoStageProps) {
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

  // Build background styles for the photo div.
  // We zoom in by 18% (background-size: 118%) to crop white borders.
  // For real photos without borders, the slight zoom is barely noticeable.
  const bgStyle: React.CSSProperties = photo.src
    ? {
        backgroundImage: `url('${photo.src}')`,
        // auto 140%: image height = 140% of element height, width scales proportionally.
        // For a 1:1 image at 140% height: width also = 140% of element height.
        // In a ~480×522 frame: image = 731×731, cropping 125px from each side.
        // White border on rohan.jpg (~107px at this scale) is fully eliminated.
        // For proper portrait photos (taller than wide) this still fills correctly.
        backgroundSize: "auto 140%",
        backgroundPosition: photo.objectPosition ?? "center center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#020202",
      }
    : {};

  return (
    <div
      className={frameClass}
      aria-label={`Photo ${paddedIndex} of ${paddedTotal}`}
    >
      {/* Corner marks — cinematic framing lines */}
      <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

      {photo.src ? (
        <div
          className={styles.stageImg}
          style={bgStyle}
          role="img"
          aria-label={photo.caption}
        />
      ) : (
        <div className={styles.stagePlaceholder}>
          <span className={styles.stagePlaceholderNum}>{paddedIndex}</span>
        </div>
      )}

      {/* Film counter badge — top right of frame */}
      <span className={styles.stageCounter} aria-hidden="true">
        {paddedIndex} / {paddedTotal}
      </span>
    </div>
  );
});
