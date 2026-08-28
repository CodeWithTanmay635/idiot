import mugshot from "@/imports/ChatGPT_Image_Aug_28__2026__10_29_27_PM.png";

const MUGSHOT = mugshot;

const PX = "'Press Start 2P', monospace";
const VT = "'VT323', monospace";

const stats = [
  { label: "FULL NAME",     value: "Rohan Alange",     note: "  " },
  { label: "STATUS",        value: "At Large",         note: "Last confirmed sighting: your group chat" },
  { label: "WORK",          value: "Full Time Gooner",  note: "Self-reported as 'busy'" },
  { label: "AGE",           value: "Classified",        note: "Another year, another excuse" },
  { label: "HEIGHT",        value: "Fucking Giant",     note: "Even giants would thnik he's a giant" },
  { label: "KNOWN ALIASES", value: "Multiple",     note: '"That guy" / "Wait where\'s Rohan" / "Our Problem"' },
];

const traits = [
  { trait: "CONFIDENCE",     score: 94, note: "About things he has no business being confident about." },
  { trait: "RELIABILITY",    score: 31, note: "Calibrated for good intentions only." },
  { trait: "PUNCTUALITY",    score: 12, note: "The numbers are not in his favour." },
  { trait: "SELF-AWARENESS", score: 47, note: "Work in progress. Ongoing for years." },
  { trait: "TEXTING BACK",   score:  8, note: "Forensic teams are still waiting." },
  { trait: "CHARISMA",       score: 88, note: "Dangerously high. Primary cause of concern." },
];

const offences = [
  { id: "001", charge: "Semd the meme whcih is already liked",              status: "CONFIRMED",         note: "such a shameful behaviour" },
  { id: "002", charge: "Being late despite living nearby",                  status: "ONGOING",           note: "Distance: 800m. Average lateness: 40 min." },
  { id: "003", charge: "Sending 'bro trust me'",                           status: "HIGHLY SUSPICIOUS", note: "Repeat offender. Zero successful outcomes on record." },
  { id: "004", charge: "Whatever happened that night",                      status: "CLASSIFIED",        note: "[REDACTED BY ORDER OF THE ARCHIVE]" },
  { id: "005", charge: "Unreturned charger, 2019",                         status: "STILL PENDING",     note: "Last seen: Rohan's possession. Status: unrecovered." },
  { id: "006", charge: "Operating without a plan while appearing to have one", status: "RECURRING",     note: "Witnessed multiple times. Shows no sign of stopping." },
];

const statusColor = (s: string) => {
  if (s === "CONFIRMED")         return "#FF4444";
  if (s === "ONGOING")           return "#FFAA00";
  if (s === "HIGHLY SUSPICIOUS") return "#FFAA00";
  if (s === "STILL PENDING")     return "#FF8800";
  if (s === "CLASSIFIED")        return "#555555";
  return "#62B954";
};

export default function SubjectProfile({ onNavigate }: { onNavigate: (page: string) => void }) {

  return (
    <div
      className="min-h-screen text-[#DADADA]"
      style={{
        background: "#0A0A0A",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,80,0.015) 3px, rgba(0,255,80,0.015) 4px)",
        fontFamily: PX,
      }}
    >
      {/* ── SYSTEM BAR ── */}
      <div
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 lg:px-10"
        style={{
          height: "36px",
          background: "#050505",
          borderBottom: "1px solid #1E1E1E",
        }}
      >
        <div style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.2em", color: "#62B954" }}>
          // CRIMINAL DATABASE &gt;&gt; SUBJECT FILE
        </div>
        <div style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.2em", color: "#FF4444" }}>
          ACCESS LEVEL: RESTRICTED
        </div>
      </div>

      {/* ── PAGE HEADER ── */}
      <div
        className="px-6 lg:px-10 pt-16 pb-5"
        style={{ borderBottom: "1px solid #1E1E1E" }}
      >
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div
              className="flex items-center gap-3 mb-3"
              style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.2em", color: "#62B954" }}
            >
              <span style={{ display: "block", width: "20px", height: "1px", background: "#62B954" }} />
              001 / CRIMINAL DOSSIER
            </div>
            <h2
              style={{
                fontFamily: PX,
                fontSize: "clamp(14px, 2vw, 26px)",
                lineHeight: 1.5,
                letterSpacing: "0.06em",
                margin: 0,
                color: "#F0F0F0",
              }}
            >
              THE CRIMINAL
            </h2>
          </div>
          <div
            className="hidden md:flex items-center gap-6"
            style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.1em", color: "#333333", lineHeight: 2 }}
          >
            <div>
              CASE REF: ARCH-2026-001-RA<br />
              CLASSIFICATION: PERSON OF INTEREST<br />
              <span style={{ color: "#62B954" }}>■</span> RECORD ACTIVE
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

          {/* ───── LEFT COLUMN ───── */}
          <div className="flex flex-col gap-4">

            {/* Mugshot */}
            <div
              className="relative overflow-hidden"
              style={{ background: "#111111", border: "1px solid #1E1E1E" }}
            >
              <img
                src={MUGSHOT}
                alt="Subject mugshot"
                style={{ width: "100%", display: "block", filter: "grayscale(0.3) contrast(1.1)", imageRendering: "auto" }}
              />
              {/* scanline */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{ height: "80px", background: "linear-gradient(to top, #0A0A0A, transparent)" }}
              />
              {/* Tags */}
              <div
                className="absolute top-3 left-3"
                style={{
                  fontFamily: PX, fontSize: "6px", letterSpacing: "0.15em",
                  color: "#62B954", border: "1px solid #62B954",
                  padding: "3px 7px", background: "rgba(10,10,10,0.9)",
                }}
              >
                EXHIBIT A
              </div>
              <div
                className="absolute bottom-3 right-3"
                style={{
                  fontFamily: PX, fontSize: "6px", letterSpacing: "0.1em",
                  color: "#555555", background: "rgba(10,10,10,0.9)", padding: "3px 7px",
                }}
              >
                ARCH-2026 · MUGSHOT
              </div>
            </div>

            {/* Risk assessment */}
            <div style={{ border: "1px solid #1E1E1E", background: "#111111", padding: "14px" }}>
              <div style={{ fontFamily: PX, fontSize: "6px", letterSpacing: "0.2em", color: "#555555", marginBottom: "10px" }}>
                RISK ASSESSMENT
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <span style={{ fontFamily: PX, fontSize: "18px", lineHeight: 1.4, color: "#FF4444" }}>
                  HIGH
                </span>
              </div>
              <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
                {[1,2,3,4,5,6,7,8,9,10].map((i) => (
                  <div key={i} style={{ height: "6px", flex: 1, background: "#FF4444", imageRendering: "pixelated" }} />
                ))}
              </div>
              <div style={{ fontFamily: PX, fontSize: "6px", letterSpacing: "0.1em", color: "#555555", marginBottom: "6px" }}>
                THREAT LEVEL: QUESTIONABLE
              </div>
              <p style={{ fontFamily: VT, fontSize: "18px", color: "#777777", lineHeight: 1.4, margin: 0 }}>
                Mostly harmless. Occasionally insufferable. Keep at arm's length during any decision-making period.
              </p>
            </div>

            {/* Quick stats */}
            <div style={{ border: "1px solid #1E1E1E", background: "#111111", padding: "14px" }}>
              <div style={{ fontFamily: PX, fontSize: "6px", letterSpacing: "0.2em", color: "#555555", marginBottom: "12px" }}>
                KNOWN WEAKNESSES
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {["WiFi outages", "Being asked to decide", "Accountability", "Commitment of any kind", "Reasonable bedtimes", "The words 'we need to talk'"].map((w) => (
                  <div
                    key={w}
                    style={{
                      fontFamily: VT, fontSize: "16px", color: "#777777",
                      borderLeft: "2px solid #1E1E1E", paddingLeft: "8px",
                    }}
                  >
                    › {w}
                  </div>
                ))}
              </div>
            </div>

            {/* Back nav */}
            <button
              onClick={() => onNavigate("home")}
              className="mc-button w-full"
              style={{ cursor: "none", padding: "10px 16px", fontSize: "8px" }}
            >
              &lt; RETURN TO ARCHIVE
            </button>
          </div>

          {/* ───── RIGHT COLUMN ───── */}
          <div className="flex flex-col gap-6">

            {/* Personal data table */}
            <div style={{ border: "1px solid #1E1E1E", background: "#0E0E0E" }}>
              <div
                style={{
                  padding: "10px 14px",
                  borderBottom: "1px solid #1E1E1E",
                  fontFamily: PX, fontSize: "6px", letterSpacing: "0.2em", color: "#62B954",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
              >
                <span>PERSONAL DATA / CONFIRMED FACTS</span>
                <span style={{ color: "#2A2A2A" }}>CLEARANCE: LEVEL 4</span>
              </div>
              <div>
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "120px 1fr",
                      gap: "12px",
                      padding: "10px 14px",
                      borderBottom: i < stats.length - 1 ? "1px solid #141414" : "none",
                    }}
                  >
                    <span style={{ fontFamily: PX, fontSize: "6px", letterSpacing: "0.1em", color: "#444444", paddingTop: "3px" }}>
                      {s.label}
                    </span>
                    <div>
                      <div style={{ fontFamily: PX, fontSize: "8px", color: "#DADADA", marginBottom: "4px", lineHeight: 1.6 }}>
                        {s.value}
                      </div>
                      <div style={{ fontFamily: VT, fontSize: "16px", color: "#555555", fontStyle: "italic" }}>
                        {s.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Behavioral analysis */}
            <div style={{ border: "1px solid #1E1E1E", background: "#0E0E0E" }}>
              <div
                style={{
                  padding: "10px 14px",
                  borderBottom: "1px solid #1E1E1E",
                  fontFamily: PX, fontSize: "6px", letterSpacing: "0.2em", color: "#62B954",
                }}
              >
                BEHAVIORAL ANALYSIS / THREAT INDEX
              </div>
              <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {traits.map((t) => (
                  <div key={t.trait}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ fontFamily: PX, fontSize: "7px", color: "#DADADA", letterSpacing: "0.08em" }}>
                        {t.trait}
                      </span>
                      <span style={{ fontFamily: PX, fontSize: "6px", color: "#444444" }}>
                        {t.score} / 100
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "2px", marginBottom: "4px" }}>
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            height: "6px",
                            flex: 1,
                            background: i < Math.round(t.score / 5)
                              ? (t.score > 70 ? "#62B954" : t.score > 40 ? "#FFAA00" : "#FF4444")
                              : "#1A1A1A",
                            imageRendering: "pixelated",
                          }}
                        />
                      ))}
                    </div>
                    <div style={{ fontFamily: VT, fontSize: "15px", color: "#444444", fontStyle: "italic" }}>
                      {t.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Known offences */}
            <div style={{ border: "1px solid #1E1E1E", background: "#0E0E0E" }}>
              <div
                style={{
                  padding: "10px 14px",
                  borderBottom: "1px solid #1E1E1E",
                  fontFamily: PX, fontSize: "6px", letterSpacing: "0.2em", color: "#62B954",
                  display: "flex", justifyContent: "space-between",
                }}
              >
                <span>KNOWN OFFENCES</span>
                <span style={{ color: "#FF4444" }}>{offences.length} ON FILE</span>
              </div>
              <div>
                {offences.map((o, i) => (
                  <div
                    key={o.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "44px 1fr auto",
                      gap: "12px",
                      alignItems: "start",
                      padding: "10px 14px",
                      borderBottom: i < offences.length - 1 ? "1px solid #111111" : "none",
                    }}
                  >
                    <span style={{ fontFamily: PX, fontSize: "7px", color: "#333333", paddingTop: "2px" }}>
                      {o.id}
                    </span>
                    <div>
                      <div style={{ fontFamily: PX, fontSize: "7px", color: "#DADADA", lineHeight: 1.6, marginBottom: "3px" }}>
                        {o.charge}
                      </div>
                      <div style={{ fontFamily: VT, fontSize: "15px", color: "#555555", fontStyle: "italic" }}>
                        {o.note}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: PX,
                        fontSize: "6px",
                        letterSpacing: "0.06em",
                        color: statusColor(o.status),
                        border: `1px solid ${statusColor(o.status)}`,
                        padding: "3px 6px",
                        whiteSpace: "nowrap",
                        lineHeight: 1.8,
                        flexShrink: 0,
                      }}
                    >
                      {o.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
