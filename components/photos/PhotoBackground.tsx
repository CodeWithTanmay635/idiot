"use client";

import { memo } from "react";
import styles from "./PhotoArchive.module.css";

interface PhotoBackgroundProps {
  src?: string;
  /** Whether the background is currently active (visible) */
  active: boolean;
}

/**
 * PhotoBackground — the blurred, darkened, full-viewport layer
 * that shows the previous photo (or current while transitioning).
 * Multiple layers can be mounted; opacity is driven by `active`.
 */
export const PhotoBackground = memo(function PhotoBackground({
  src,
  active,
}: PhotoBackgroundProps) {
  if (!src) {
    return (
      <div
        className={`${styles.bgLayer} ${active ? styles.bgLayerActive : ""}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`${styles.bgLayer} ${active ? styles.bgLayerActive : ""}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className={styles.bgImg}
        draggable={false}
      />
      <div className={styles.bgDim} />
    </div>
  );
});
