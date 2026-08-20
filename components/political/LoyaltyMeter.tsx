export function LoyaltyMeter({ value }: { value: number }) {
  return (
    <div className="card" style={{ marginBottom: "32px", padding: "28px" }}>
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
            letterSpacing: "0.24em",
            color: "var(--accent)",
            textTransform: "uppercase",
          }}
        >
          IDEOLOGICAL STABILITY RATING
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          CONFIDENCE: {value}%
        </span>
      </div>

      <div
        style={{
          height: 12,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.max(value, 4)}%`,
            background: "var(--accent)",
            boxShadow: "0 0 12px var(--accent)",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "12px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.16em",
        }}
      >
        <span>LEFT-WING APATHY</span>
        <span>MODERATE CONFUSION</span>
        <span>CHAOTIC NEUTRAL</span>
      </div>
    </div>
  );
}
