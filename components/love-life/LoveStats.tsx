export function LoveStats({ incidents }: { incidents: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        marginBottom: "36px",
      }}
    >
      <div className="card" style={{ padding: "20px" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            color: "var(--accent)",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "8px",
          }}
        >
          TOTAL INCIDENTS
        </span>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3rem",
            lineHeight: 1,
            color: "#fff",
          }}
        >
          {incidents}
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.45)",
            marginTop: "6px",
          }}
        >
          Documented romantic attempts on record
        </p>
      </div>

      <div className="card" style={{ padding: "20px" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            color: "var(--accent)",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "8px",
          }}
        >
          CONFIRMED SUCCESS
        </span>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3rem",
            lineHeight: 1,
            color: "#fff",
          }}
        >
          0.00%
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.45)",
            marginTop: "6px",
          }}
        >
          Margin of error: ±0.00%
        </p>
      </div>

      <div className="card" style={{ padding: "20px" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            color: "var(--accent)",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "8px",
          }}
        >
          FLIRTING PROFICIENCY
        </span>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3rem",
            lineHeight: 1,
            color: "#fff",
          }}
        >
          CRITICAL
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.45)",
            marginTop: "6px",
          }}
        >
          Emergency intervention recommended
        </p>
      </div>
    </div>
  );
}
