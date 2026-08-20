"use client";

import { GameBoard } from "@/components/game/GameBoard";
import styles from "./GameSection.module.css";

export function GameSection() {
  return (
    <section
      id="game-section"
      className={styles.section}
      aria-label="Tactical Evaluation and Birthday Vault"
    >
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <span className={styles.metaTag}>
            LAYER 03 // CLASSIFIED EVALUATION
          </span>
          <span className={styles.metaDoc}>PROTOCOL 2026</span>
        </div>

        <div className={styles.titleWrap}>
          <p className={styles.ghostTitle} aria-hidden="true">
            THE PROTOCOL
          </p>
          <h2 className={styles.title}>SUBJECT ASSESSMENT</h2>
        </div>

        <p className={styles.subtitle}>
          An interactive diagnostic search through Rohan&apos;s confiscated personal effects to recover the confidential Birthday Protocol key.
        </p>
      </div>

      <div className={styles.gameWrapper}>
        <GameBoard />
      </div>
    </section>
  );
}
