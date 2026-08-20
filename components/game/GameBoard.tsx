"use client";

import { useState } from "react";
import { gameCopy } from "@/data/game";

export function GameBoard() {
  const [foundKey, setFoundKey] = useState(false);
  const [doorUnlocked, setDoorUnlocked] = useState(false);
  const [inspectionStep, setInspectionStep] = useState<string | null>(null);

  const handleInspect = (objectName: string) => {
    if (objectName === "suspect-jacket") {
      setFoundKey(true);
      setInspectionStep("FOUND CLASSIFIED DECRYPTION KEY IN SUBJECT'S JACKET POCKET!");
    } else {
      setInspectionStep(`SEARCHED ${objectName.toUpperCase()} — ONLY FOUND UNPAID PARKING TICKETS.`);
    }
  };

  return (
    <div style={{ maxWidth: "780px" }}>
      {/* Status Bar */}
      <div className="card" style={{ marginBottom: "24px", padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              color: "var(--accent)",
              textTransform: "uppercase",
            }}
          >
            EVALUATION OBJECTIVE: RECOVER BIRTHDAY PROTOCOL
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: foundKey ? "#4ade80" : "rgba(255,255,255,0.4)",
            }}
          >
            KEY STATUS: {foundKey ? "ACQUIRED" : "MISSING"}
          </span>
        </div>

        {inspectionStep && (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: foundKey ? "#4ade80" : "rgba(255,255,255,0.65)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "12px",
              marginTop: "8px",
            }}
          >
            &gt; {inspectionStep}
          </p>
        )}
      </div>

      {/* Investigation Area */}
      {!doorUnlocked ? (
        <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.2rem",
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            SEARCH THE EVIDENCE ROOM
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "24px",
            }}
          >
            Rohan misplaced the vault decryption key before his birthday. Search through his confiscated personal effects:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "14px",
              marginBottom: "28px",
            }}
          >
            <button
              onClick={() => handleInspect("iced-latte-cup")}
              style={{
                padding: "16px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  color: "var(--accent)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                ITEM 01
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "#fff",
                }}
              >
                $18 Empty Iced Latte Cup
              </span>
            </button>

            <button
              onClick={() => handleInspect("suspect-jacket")}
              style={{
                padding: "16px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  color: "var(--accent)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                ITEM 02
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "#fff",
                }}
              >
                Suspicious Black Denim Jacket
              </span>
            </button>

            <button
              onClick={() => handleInspect("gym-bag")}
              style={{
                padding: "16px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  color: "var(--accent)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                ITEM 03
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "#fff",
                }}
              >
                Unused Gym Membership Card
              </span>
            </button>
          </div>

          {foundKey && (
            <button
              onClick={() => setDoorUnlocked(true)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                width: "100%",
                padding: "16px",
                background: "var(--accent)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                transition: "opacity 0.2s ease",
              }}
            >
              <span>UNLOCK BIRTHDAY PROTOCOL VAULT</span>
              <span>🔓 →</span>
            </button>
          )}
        </div>
      ) : (
        <div
          className="card"
          style={{
            padding: "48px 36px",
            textAlign: "center",
            borderColor: "var(--accent)",
            background: "rgba(200, 100, 30, 0.08)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.26em",
              color: "var(--accent)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "16px",
            }}
          >
            CLASSIFIED BIRTHDAY DECREE // LEVEL 5 ACCESS
          </span>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.2rem, 8vw, 5.5rem)",
              lineHeight: 0.9,
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            HAPPY BIRTHDAY ROHAN!
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.85)",
              maxWidth: "52ch",
              margin: "0 auto 28px",
            }}
          >
            Despite the questionable posing, chaotic financial choices, and questionable sleep patterns, you remain our favorite subject. Cheers to another year of legendary memes!
          </p>

          <button
            onClick={() => {
              setFoundKey(false);
              setDoorUnlocked(false);
              setInspectionStep(null);
            }}
            style={{
              padding: "10px 24px",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            RESET EVALUATION
          </button>
        </div>
      )}
    </div>
  );
}
