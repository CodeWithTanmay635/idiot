import type { Clip } from "@/types/clip";

export function ClipCard({ clip, onPlay }: { clip: Clip; onPlay: () => void }) {
  return (
    <button
      className="card"
      onClick={onPlay}
      style={{
        textAlign: "left",
        cursor: "pointer",
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
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "var(--accent)",
              textTransform: "uppercase",
            }}
          >
            [SURVEILLANCE_{clip.id}]
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "2px 6px",
            }}
          >
            VIDEO/MP4
          </span>
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
          {clip.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.5,
          }}
        >
          {clip.description}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "16px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          marginTop: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.18em",
          }}
        >
          MOTION DETECTED
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "var(--accent)",
            letterSpacing: "0.1em",
          }}
        >
          PLAY CLIP ▶
        </span>
      </div>
    </button>
  );
}
