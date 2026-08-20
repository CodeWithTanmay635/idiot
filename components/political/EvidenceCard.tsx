export function EvidenceCard({ title, detail }: { title: string; detail: string }) {
  return (
    <article
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "180px",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            color: "var(--accent)",
            marginBottom: "12px",
            textTransform: "uppercase",
          }}
        >
          [SUBPOENA_EXHIBIT]
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.8rem",
            color: "#ffffff",
            marginBottom: "8px",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.86rem",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.55,
          }}
        >
          {detail}
        </p>
      </div>

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.52rem",
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.25)",
          paddingTop: "12px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          marginTop: "16px",
        }}
      >
        CLASSIFICATION: HIGHLY DISPUTED
      </div>
    </article>
  );
}
