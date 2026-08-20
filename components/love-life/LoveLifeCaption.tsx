"use client";

import { memo } from "react";
import styles from "../photos/PhotoArchive.module.css";
import type { LoveEvent } from "@/types/loveLife";

interface LoveLifeCaptionProps {
  event: LoveEvent;
  index: number;
  total: number;
  phase: number;
}

export const LoveLifeCaption = memo(function LoveLifeCaption({
  event,
  index,
  total,
  phase,
}: LoveLifeCaptionProps) {
  const paddedIndex = String(index + 1).padStart(2, "0");
  const isVisible = phase >= 1;

  return (
    <div
      className={`${styles.caption} ${
        isVisible ? styles.captionVisible : ""
      }`}
    >
      <div className={styles.captionInner}>
        <span className={styles.captionRule} aria-hidden="true" />

        {event.title && (
          <h2 className={styles.captionTitle}>{event.title}</h2>
        )}

        <blockquote className={styles.captionText}>
          &ldquo;{event.detail}&rdquo;
        </blockquote>

        <div className={styles.captionMeta}>
          <span className={styles.captionMetaNum}>{paddedIndex}</span>
          <span className={styles.captionMetaSep}>/</span>
          <span className={styles.captionMetaTag}>
            {event.date} // ROMANCE INQUEST
          </span>
          <span className={styles.captionMetaDoc}>
            {event.severity || "UNRESOLVED"}
          </span>
        </div>
      </div>
    </div>
  );
});
