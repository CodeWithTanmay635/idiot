import { useState } from "react";

const PX = "'Press Start 2P', monospace";
const VT = "'VT323', monospace";

const charges = [
  { id: "CHG-001", charge: "Chronic and wilful unavailability", finding: "GUILTY" },
  { id: "CHG-002", charge: "Operating without a plan while appearing to have one", finding: "GUILTY" },
  { id: "CHG-003", charge: "Unreturned charger, 2019", finding: "GUILTY" },
  { id: "CHG-004", charge: "Excessive confidence without supporting evidence", finding: "GUILTY" },
  { id: "CHG-005", charge: "Being genuinely impossible to stay mad at", finding: "GUILTY" },
  { id: "CHG-006", charge: "Making everyone around him oddly fond of him despite the above", finding: "GUILTY" },
];

export default function TheVerdict({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#F0F0F0] pt-20 pb-20">
      {/* Page header */}
      <div className="px-6 lg:px-16 mb-14 pb-8" style={{ borderBottom: "2px solid #2E2E2E" }}>
        <div className="flex items-center justify-between">
          <div>
            <div
              className="flex items-center gap-3 mb-4"
              style={{ fontFamily: PX, fontSize: "8px", letterSpacing: "0.2em", color: "#62B954" }}
            >
              <span className="accent-line" />
              004 / THE VERDICT
            </div>
            <h2
              style={{
                fontFamily: PX,
                fontSize: "clamp(18px, 2.8vw, 36px)",
                lineHeight: 1.6,
                letterSpacing: "0.04em",
                margin: 0,
              }}
            >
              FINAL
              <br />
              <span style={{ WebkitTextStroke: "2px #F0F0F0", WebkitTextFillColor: "transparent" }}>JUDGMENT</span>
            </h2>
          </div>
          <div
            className="hidden md:block text-right"
            style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.1em", color: "#3A3A3A", lineHeight: 2.2 }}
          >
            CASE: STATE vs. ALANGE, R.
            <br />DOCKET: ARCH-2026-001-RA
            <br /><span style={{ color: "#62B954" }}>■</span> VERDICT DELIVERED
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-16">

        {/* Charges table */}
        <div style={{ marginBottom: "64px" }}>
          <div style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.18em", color: "#62B954", marginBottom: "16px" }}>
            CHARGES / FINDINGS OF FACT
          </div>
          <div style={{ borderTop: "2px solid #2E2E2E" }}>
            {charges.map((c, i) => (
              <div
                key={c.id}
                style={{
                  borderBottom: "2px solid #2E2E2E",
                  padding: "18px 0",
                  display: "grid",
                  gridTemplateColumns: "70px 1fr 100px",
                  gap: "12px",
                  alignItems: "center",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <span style={{ fontFamily: PX, fontSize: "7px", color: "#555555" }}>
                  {c.id}
                </span>
                <span style={{ fontFamily: VT, fontSize: "20px", color: "#9E9E9E", lineHeight: 1.4 }}>
                  {c.charge}
                </span>
                <span
                  style={{
                    fontFamily: PX,
                    fontSize: "9px",
                    letterSpacing: "0.06em",
                    color: "#62B954",
                    textAlign: "right",
                    lineHeight: 1.5,
                  }}
                >
                  {c.finding}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* GUILTY stamp */}
        <div
          style={{
            position: "relative",
            border: "2px solid #2E2E2E",
            marginBottom: "64px",
            textAlign: "center",
            overflow: "hidden",
            padding: "48px 24px",
            background: "#1E1E1E",
          }}
        >
          {/* Watermark */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <span
              style={{
                fontFamily: PX,
                fontSize: "clamp(40px, 10vw, 100px)",
                lineHeight: 1,
                color: "transparent",
                WebkitTextStroke: "3px rgba(98,185,84,0.06)",
                letterSpacing: "0.05em",
              }}
            >
              GUILTY
            </span>
          </div>

          {/* Foreground */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.25em", color: "#3A3A3A", marginBottom: "32px" }}>
              IN THE MATTER OF: ROHAN ALANGE
            </div>

            <div
              style={{
                display: "inline-block",
                border: "4px solid #62B954",
                padding: "12px 36px",
                marginBottom: "40px",
                transform: "rotate(-1.5deg)",
                background: "rgba(98,185,84,0.05)",
              }}
            >
              <span style={{ fontFamily: PX, fontSize: "clamp(20px, 4vw, 40px)", letterSpacing: "0.08em", color: "#62B954", lineHeight: 1.4 }}>
                GUILTY
              </span>
            </div>

            <p style={{ fontFamily: VT, fontSize: "22px", color: "#9E9E9E", lineHeight: 1.6, maxWidth: "580px", margin: "0 auto 32px" }}>
              On all six charges. Unanimously. Without deliberation.
              The panel spent more time choosing where to eat than reaching this verdict.
            </p>

            <div style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.18em", color: "#555555" }}>
              SENTENCE: TO BE REVEALED BELOW
            </div>
          </div>
        </div>

        {/* Birthday reveal */}
        {!revealed ? (
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.18em", color: "#555555", marginBottom: "24px" }}>
              SENTENCING / SEALED DOCUMENT
            </div>
            <button
              onClick={() => setRevealed(true)}
              className="mc-button"
              style={{ cursor: "none", padding: "18px 40px", fontSize: "9px" }}
            >
              UNSEAL THE VERDICT
            </button>
          </div>
        ) : (
          <div
            style={{
              border: "2px solid #2E2E2E",
              overflow: "hidden",
              animation: "fadeIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
            }}
          >
            {/* Green header bar */}
            <div style={{ background: "#62B954", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.15em", color: "#1A1A1A" }}>
                SENTENCE / DELIVERED
              </span>
              <span style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.15em", color: "#1A1A1A" }}>
                ARCH-2026-001-RA
              </span>
            </div>

            {/* Main reveal */}
            <div className="px-6 md:px-10 py-12 md:py-16" style={{ textAlign: "center", background: "#1E1E1E" }}>
              <div style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.25em", color: "#3A3A3A", marginBottom: "24px" }}>
                THE COURT HEREBY ORDERS
              </div>

              <h3
                style={{
                  fontFamily: PX,
                  fontSize: "clamp(20px, 5vw, 48px)",
                  lineHeight: 1.6,
                  letterSpacing: "0.04em",
                  color: "#F0F0F0",
                  margin: "0 0 24px",
                }}
              >
                HAPPY
                <br />
                <span style={{ WebkitTextStroke: "2px #F0F0F0", WebkitTextFillColor: "transparent" }}>
                  BIRTHDAY
                </span>
                <br />
                ROHAN
              </h3>

              <div style={{ width: "48px", height: "4px", background: "#62B954", margin: "32px auto", imageRendering: "pixelated" }} />

              <p style={{ fontFamily: VT, fontSize: "22px", color: "#9E9E9E", lineHeight: 1.6, maxWidth: "560px", margin: "0 auto 32px" }}>
                The sentence is a celebration. One full year of being appreciated
                — genuinely, deeply, and against all odds — by people who
                have seen the evidence and chosen to show up anyway.
              </p>

              <p style={{ fontFamily: VT, fontSize: "20px", color: "#555555", lineHeight: 1.6, maxWidth: "480px", margin: "0 auto 48px", fontStyle: "italic" }}>
                For the record: you are an absolute nightmare to organise, a chronic texter-ghost,
                and the most confidently wrong person most of us have ever met.
                We wouldn't have it any other way.
              </p>

              <div
                className="inline-flex flex-wrap items-center justify-center gap-3 px-6 md:px-8 py-4"
                style={{ border: "2px solid #2E2E2E", background: "#2E2E2E" }}
              >
                <span style={{ fontFamily: PX, fontSize: "8px", color: "#62B954" }}>■</span>
                <span style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.12em", color: "#555555", lineHeight: 1.8 }}>
                  WITH LOVE · FROM EVERYONE WHO UNFORTUNATELY KNOWS YOU
                </span>
              </div>
            </div>

            {/* Footer */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 md:px-10 py-5"
              style={{ borderTop: "2px solid #2E2E2E", background: "#1A1A1A" }}
            >
              <span style={{ fontFamily: PX, fontSize: "6px", letterSpacing: "0.12em", color: "#2E2E2E", lineHeight: 2 }}>
                CASE CLOSED · ARCH-2026 · ALL CHARGES FORGIVEN (MOSTLY)
              </span>
              <button
                onClick={() => onNavigate("home")}
                className="mc-button"
                style={{ cursor: "none", padding: "10px 20px", fontSize: "8px" }}
              >
                &lt; BACK TO START
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
