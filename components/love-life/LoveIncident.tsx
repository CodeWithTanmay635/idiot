import type { LoveEvent } from "@/types/loveLife";

export function LoveIncident({ event }: { event: LoveEvent }) {
  return (
    <article
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "220px",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              color: "var(--accent)",
              textTransform: "uppercase",
            }}
          >
            [TIMESTAMP: {event.date}]
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "2px 6px",
            }}
          >
            INCIDENT REPORT
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.9rem",
            color: "#ffffff",
            marginBottom: "10px",
            letterSpacing: "0.02em",
          }}
        >
          {event.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.88rem",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.6,
          }}
        >
          {event.detail}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "14px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          marginTop: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.16em",
          }}
        >
          STATUS: UNRESOLVED
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            color: "var(--accent)",
            letterSpacing: "0.14em",
          }}
        >
          SEVERITY: HIGH
        </span>
      </div>
    </article>
  );
}
