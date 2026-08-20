"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import styles from "./InteractiveArchiveList.module.css";

export interface ArchiveMenuItem {
  id: string;
  num: string;
  label: string;
  subLabel: string;
  tag: string;
  href: string;
  imageUrl: string;
  count: string;
}

export const ARCHIVE_ITEMS: ArchiveMenuItem[] = [
  {
    id: "photos",
    num: "01",
    label: "PHOTOS",
    subLabel: "THE EVIDENCE",
    tag: "FILE_REF: 894-PHOTO",
    href: "/photos",
    imageUrl: "/images/hero/rohan.jpg",
    count: "06 RECORDS",
  },
  {
    id: "clips",
    num: "02",
    label: "CLIPS",
    subLabel: "SURVEILLANCE FOOTAGE",
    tag: "FILE_REF: 412-VIDEO",
    href: "/clips",
    imageUrl: "/images/hero/526838554_18048644648561091_6427738268558538994_n.jpg",
    count: "04 CAPTURES",
  },
  {
    id: "politics",
    num: "03",
    label: "POLITICS",
    subLabel: "IDEOLOGY & LOYALTIES",
    tag: "FILE_REF: 902-POLITICS",
    href: "/political-affiliation",
    imageUrl: "/images/hero/rohan.jpg",
    count: "04 EXHIBITS",
  },
  {
    id: "love-life",
    num: "04",
    label: "LOVE LIFE",
    subLabel: "ROMANCE INQUEST",
    tag: "FILE_REF: 104-ROMANCE",
    href: "/love-life",
    imageUrl: "/images/hero/526838554_18048644648561091_6427738268558538994_n.jpg",
    count: "04 INCIDENTS",
  },
];

const LERP_FACTOR = 0.12;
const ROTATION_LERP_FACTOR = 0.08;
const MAX_ROTATION_DEG = 15;

const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export function InteractiveArchiveList() {
  const [activeItem, setActiveItem] = useState<ArchiveMenuItem | null>(null);

  // Physics refs
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const prevMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRotation = useRef<number>(0);
  const currentRotation = useRef<number>(0);
  const rafId = useRef<number | null>(null);

  const floatingPreviewRef = useRef<HTMLDivElement>(null);

  // Animation Loop for Smooth Physics Lerp & Tilt
  const updatePhysics = useCallback(() => {
    // Position lerp
    currentPos.current.x = lerp(
      currentPos.current.x,
      mousePos.current.x,
      LERP_FACTOR
    );
    currentPos.current.y = lerp(
      currentPos.current.y,
      mousePos.current.y,
      LERP_FACTOR
    );

    // Rotation lerp
    currentRotation.current = lerp(
      currentRotation.current,
      targetRotation.current,
      ROTATION_LERP_FACTOR
    );

    // Decay velocity rotation back towards 0
    targetRotation.current = lerp(targetRotation.current, 0, 0.05);

    if (floatingPreviewRef.current) {
      floatingPreviewRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) rotate(${currentRotation.current}deg)`;
    }

    rafId.current = requestAnimationFrame(updatePhysics);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updatePhysics]);

  // Global mouse move handler to calculate deltaX velocity
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const deltaX = e.clientX - prevMousePos.current.x;
    prevMousePos.current.x = e.clientX;
    prevMousePos.current.y = e.clientY;

    // Center the floating image box on cursor
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;

    // Calculate dynamic tilt based on velocity deltaX (clamped between -15 and +15 deg)
    const tilt = clamp(deltaX * 0.45, -MAX_ROTATION_DEG, MAX_ROTATION_DEG);
    targetRotation.current = tilt;
  };

  const handleMouseEnterItem = (
    item: ArchiveMenuItem,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    setActiveItem(item);
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;
    prevMousePos.current.x = e.clientX;
    prevMousePos.current.y = e.clientY;
    currentPos.current.x = e.clientX;
    currentPos.current.y = e.clientY;
  };

  const handleMouseLeaveList = () => {
    setActiveItem(null);
    targetRotation.current = 0;
  };

  return (
    <section
      id="archive-dossier"
      className={styles.section}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveList}
      aria-label="Archive Classified Directories"
    >
      {/* ── SECTION HEADER ──────────────────────────────────────── */}
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <span className={styles.metaTag}>CLASSIFIED ARCHIVE // INDEX 2026</span>
          <span className={styles.metaDoc}>SEC-LEVEL 4</span>
        </div>

        <div className={styles.titleWrap}>
          <p className={styles.ghostTitle} aria-hidden="true">
            THE ARCHIVES
          </p>
          <h2 className={styles.title}>CASE FILE DIRECTORY</h2>
        </div>

        <p className={styles.subtitle}>
          Hover over any category to inspect photographic evidence, surveillance footage, and investigative records.
        </p>
      </div>

      {/* ── INTERACTIVE LIST (PHOTOS, CLIPS, POLITICS, LOVE LIFE) ── */}
      <nav
        className={`${styles.list} ${
          activeItem !== null ? styles.listHovered : ""
        }`}
        aria-label="Archive Case Files List"
      >
        {ARCHIVE_ITEMS.map((item) => {
          const isSelected = activeItem?.id === item.id;
          const isDimmed = activeItem !== null && !isSelected;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.row} ${isDimmed ? styles.rowDimmed : ""} ${
                isSelected ? styles.rowActive : ""
              }`}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                handleMouseEnterItem(item, e)
              }
              aria-label={`Access ${item.label} archive`}
            >
              {/* Corner markers on active row */}
              <span className={`${styles.rowCorner} ${styles.cornerTL}`} aria-hidden="true" />
              <span className={`${styles.rowCorner} ${styles.cornerTR}`} aria-hidden="true" />
              <span className={`${styles.rowCorner} ${styles.cornerBL}`} aria-hidden="true" />
              <span className={`${styles.rowCorner} ${styles.cornerBR}`} aria-hidden="true" />

              {/* Left Column: Number & File Tag */}
              <div className={styles.rowLeft}>
                <span className={styles.rowNum}>{item.num}</span>
                <span className={styles.rowTag}>{item.tag}</span>
              </div>

              {/* Center Column: Big Bebas Neue Name & Inter Subtitle */}
              <div className={styles.rowCenter}>
                <span className={styles.rowLabel}>{item.label}</span>
                <span className={styles.rowSubLabel}>{item.subLabel}</span>
              </div>

              {/* Right Column: Status & Access Indicator */}
              <div className={styles.rowRight}>
                <span className={styles.rowCount}>{item.count}</span>
                <div className={styles.rowArrowWrap}>
                  <span className={styles.rowArrow}>→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* ── FLOATING CURSOR-FOLLOWING IMAGE THUMBNAIL ──────────── */}
      <div
        ref={floatingPreviewRef}
        className={`${styles.floatingPreview} ${
          activeItem !== null ? styles.floatingPreviewVisible : ""
        }`}
        aria-hidden="true"
      >
        {activeItem && (
          <div className={styles.floatingInner}>
            {/* Film frame corner marks */}
            <span className={`${styles.frameCorner} ${styles.frameTL}`} />
            <span className={`${styles.frameCorner} ${styles.frameTR}`} />
            <span className={`${styles.frameCorner} ${styles.frameBL}`} />
            <span className={`${styles.frameCorner} ${styles.frameBR}`} />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={activeItem.imageUrl}
              src={activeItem.imageUrl}
              alt=""
              className={styles.floatingImg}
            />

            {/* Subtle overlay metadata */}
            <div className={styles.floatingOverlay}>
              <span className={styles.floatingTag}>
                {activeItem.num} // {activeItem.label}
              </span>
              <span className={styles.floatingBadge}>PREVIEW</span>
            </div>
          </div>
        )}
      </div>

      {/* ── FOOTER NOTE ─────────────────────────────────────────── */}
      <div className={styles.footerNote}>
        <div className={styles.footerLine} />
        <div className={styles.footerMeta}>
          <span>4 CLASSIFIED DIRECTORIES</span>
          <span>CURATED BY WITNESS TESTIMONY</span>
          <span>SUBJECT: ROHAN</span>
        </div>
      </div>
    </section>
  );
}
