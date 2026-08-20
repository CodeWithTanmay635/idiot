"use client";

import { memo } from "react";
import styles from "../photos/PhotoArchive.module.css";
import type { PoliticalExhibit } from "@/types/political";

interface PoliticalCaptionProps {
  exhibit: PoliticalExhibit;
  index: number;
  total: number;
  phase: number;
}

export const PoliticalCaption = memo(function PoliticalCaption({
  exhibit,
  index,
  total,
  phase,
}: PoliticalCaptionProps) {
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

        {exhibit.title && (
          <h2 className={styles.captionTitle}>{exhibit.title}</h2>
        )}

        <blockquote className={styles.captionText}>
          &ldquo;{exhibit.detail}&rdquo;
        </blockquote>

        <div className={styles.captionMeta}>
          <span className={styles.captionMetaNum}>{paddedIndex}</span>
          <span className={styles.captionMetaSep}>/</span>
          <span className={styles.captionMetaTag}>
            {exhibit.date || "DOC 2026"} // POLITICAL DOSSIER
          </span>
          <span className={styles.captionMetaDoc}>
            {exhibit.allegiance || "UNCONFIRMED"}
          </span>
        </div>
      </div>
    </div>
  );
});
