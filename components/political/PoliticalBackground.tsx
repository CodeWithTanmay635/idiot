"use client";

import { memo } from "react";
import styles from "../photos/PhotoArchive.module.css";
import type { PoliticalExhibit } from "@/types/political";

interface PoliticalBackgroundProps {
  currentExhibit: PoliticalExhibit;
  bgExhibit: PoliticalExhibit;
  phase: 0 | 1 | 2;
  isTransitioning: boolean;
}

export const PoliticalBackground = memo(function PoliticalBackground({
  currentExhibit,
  bgExhibit,
  phase,
  isTransitioning,
}: PoliticalBackgroundProps) {
  const displayExhibit = isTransitioning ? bgExhibit : currentExhibit;

  return (
    <div className={styles.bgStack} aria-hidden="true">
      <div
        className={`${styles.bgLayer} ${
          phase >= 1 ? styles.bgLayerActive : ""
        }`}
      >
        {displayExhibit.src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={displayExhibit.id}
            src={displayExhibit.src}
            alt=""
            className={styles.bgImg}
            style={{
              objectPosition: displayExhibit.objectPosition ?? "center 20%",
            }}
          />
        )}
        <div className={styles.bgDim} />
      </div>
    </div>
  );
});
