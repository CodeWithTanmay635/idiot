"use client";

import { memo } from "react";
import styles from "../photos/PhotoArchive.module.css";
import type { Clip } from "@/types/clip";

interface ClipBackgroundProps {
  currentClip: Clip;
  bgClip: Clip;
  phase: 0 | 1 | 2;
  isTransitioning: boolean;
}

export const ClipBackground = memo(function ClipBackground({
  currentClip,
  bgClip,
  phase,
  isTransitioning,
}: ClipBackgroundProps) {
  const displayClip = isTransitioning ? bgClip : currentClip;
  const imgSrc = displayClip.thumbnail || displayClip.src || "";

  return (
    <div className={styles.bgStack} aria-hidden="true">
      <div
        className={`${styles.bgLayer} ${
          phase >= 1 ? styles.bgLayerActive : ""
        }`}
      >
        {imgSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={displayClip.id}
            src={imgSrc}
            alt=""
            className={styles.bgImg}
            style={{
              objectPosition: displayClip.objectPosition ?? "center 20%",
            }}
          />
        )}
        <div className={styles.bgDim} />
      </div>
    </div>
  );
});
