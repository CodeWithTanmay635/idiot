"use client";

import { memo } from "react";
import styles from "./PhotoArchive.module.css";

interface PhotoNavigationProps {
  index: number;
  total: number;
  visible: boolean;
  onPrev: () => void;
  onNext: () => void;
  onCursorHover?: (hover: boolean) => void;
}

/**
 * PhotoNavigation — minimal prev/next controls.
 * Keyboard: ←/→ arrows are handled at the archive level.
 * Mouse wheel + touch: also handled at archive level.
 */
export const PhotoNavigation = memo(function PhotoNavigation({
  index,
  total,
  visible,
  onPrev,
  onNext,
  onCursorHover,
}: PhotoNavigationProps) {
  const paddedIndex = String(index + 1).padStart(2, "0");
  const paddedTotal = String(total).padStart(2, "0");
  const hasPrev = index > 0;
  const hasNext = index < total - 1;

  return (
    <nav
      className={`${styles.nav} ${visible ? styles.navVisible : ""}`}
      aria-label="Photo navigation"
    >
      <button
        className={`${styles.navBtn} ${styles.navBtnPrev} ${!hasPrev ? styles.navBtnDisabled : ""}`}
        onClick={onPrev}
        disabled={!hasPrev}
        aria-label="Previous photo"
        id="photo-prev"
        onMouseEnter={() => onCursorHover?.(true)}
        onMouseLeave={() => onCursorHover?.(false)}
      >
        <span className={styles.navArrow} aria-hidden="true">←</span>
        <span className={styles.navLabel}>PREV</span>
      </button>

      {/* Counter */}
      <div className={styles.navCounter} aria-live="polite" aria-atomic="true">
        <span className={styles.navCounterCurrent}>{paddedIndex}</span>
        <span className={styles.navCounterSep}>/</span>
        <span className={styles.navCounterTotal}>{paddedTotal}</span>
      </div>

      <button
        className={`${styles.navBtn} ${styles.navBtnNext} ${!hasNext ? styles.navBtnDisabled : ""}`}
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Next photo"
        id="photo-next"
        onMouseEnter={() => onCursorHover?.(true)}
        onMouseLeave={() => onCursorHover?.(false)}
      >
        <span className={styles.navLabel}>NEXT</span>
        <span className={styles.navArrow} aria-hidden="true">→</span>
      </button>
    </nav>
  );
});
