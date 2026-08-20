"use client";

import { memo } from "react";
import styles from "../photos/PhotoArchive.module.css";
import type { LoveEvent } from "@/types/loveLife";

interface LoveLifeBackgroundProps {
  currentEvent: LoveEvent;
  bgEvent: LoveEvent;
  phase: 0 | 1 | 2;
  isTransitioning: boolean;
}

export const LoveLifeBackground = memo(function LoveLifeBackground({
  currentEvent,
  bgEvent,
  phase,
  isTransitioning,
}: LoveLifeBackgroundProps) {
  const displayEvent = isTransitioning ? bgEvent : currentEvent;

  return (
    <div className={styles.bgStack} aria-hidden="true">
      <div
        className={`${styles.bgLayer} ${
          phase >= 1 ? styles.bgLayerActive : ""
        }`}
      >
        {displayEvent.src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={displayEvent.id}
            src={displayEvent.src}
            alt=""
            className={styles.bgImg}
            style={{
              objectPosition: displayEvent.objectPosition ?? "center 20%",
            }}
          />
        )}
        <div className={styles.bgDim} />
      </div>
    </div>
  );
});
