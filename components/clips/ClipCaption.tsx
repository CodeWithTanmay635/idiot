"use client";

import { memo } from "react";
import styles from "../photos/PhotoArchive.module.css";
import type { Clip } from "@/types/clip";

interface ClipCaptionProps {
  clip: Clip;
  index: number;
  total: number;
  phase: number;
}

export const ClipCaption = memo(function ClipCaption({
  clip,
  index,
  total,
  phase,
}: ClipCaptionProps) {
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

        {clip.title && (
          <h2 className={styles.captionTitle}>{clip.title}</h2>
        )}

        <blockquote className={styles.captionText}>
          &ldquo;{clip.description}&rdquo;
        </blockquote>

        <div className={styles.captionMeta}>
          <span className={styles.captionMetaNum}>{paddedIndex}</span>
          <span className={styles.captionMetaSep}>/</span>
          <span className={styles.captionMetaTag}>SURVEILLANCE ARCHIVE</span>
          <span className={styles.captionMetaDoc}>
            {clip.date || "DOC 2026"}
          </span>
        </div>
      </div>
    </div>
  );
});
