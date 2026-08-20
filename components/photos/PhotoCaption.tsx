"use client";

import { useEffect, useState, memo } from "react";
import styles from "./PhotoArchive.module.css";
import type { Photo } from "@/types/photo";

interface PhotoCaptionProps {
  photo: Photo;
  index: number;
  /**
   * If false, caption starts invisible and stays invisible (entrance phase).
   * If true, caption animates in. When the component is re-mounted (key change
   * on navigation), it starts invisible again and fires the animation.
   */
  visible: boolean;
}

/**
 * PhotoCaption — editorial typography for the meme caption.
 * Lives below the photo frame. Replays its fade-in animation
 * every time it's re-mounted (driven by key change on navigation).
 */
export const PhotoCaption = memo(function PhotoCaption({
  photo,
  index,
  visible,
}: PhotoCaptionProps) {
  // On re-mount (key change), delay the animation slightly to let
  // the photo transition settle first.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(id);
  }, [visible]);

  const paddedIndex = String(index + 1).padStart(2, "0");
  const isActive = visible && mounted;

  return (
    <div
      className={`${styles.caption} ${isActive ? styles.captionVisible : ""}`}
      role="region"
      aria-label="Photo caption"
    >
      {/* Thin orange rule */}
      <span className={styles.captionRule} aria-hidden="true" />

      <div className={styles.captionInner}>
        {/* Optional title */}
        {photo.title && (
          <p className={styles.captionTitle} aria-hidden="true">
            {photo.title}
          </p>
        )}

        {/* The meme caption — the punchline */}
        <blockquote className={styles.captionText}>
          &ldquo;{photo.caption}&rdquo;
        </blockquote>

        {/* Bottom metadata row */}
        <p className={styles.captionMeta} aria-hidden="true">
          <span className={styles.captionMetaNum}>{paddedIndex}</span>
          <span className={styles.captionMetaSep}>/</span>
          <span className={styles.captionMetaLabel}>PHOTOGRAPHIC ARCHIVE</span>
          <span className={styles.captionMetaSep}>//</span>
          <span className={styles.captionMetaDoc}>DOC 2026</span>
        </p>
      </div>
    </div>
  );
});
