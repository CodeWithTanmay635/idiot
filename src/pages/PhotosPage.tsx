import { useCallback, useEffect, useRef, useState } from "react";

import photo1 from "@/imports/Screenshot_2026-08-27_225612.png";
import photo2 from "@/imports/Screenshot_2026-08-27_225711.png";
import photo3 from "@/imports/Screenshot_2026-08-27_225749.png";
import photo4 from "@/imports/Screenshot_2026-08-27_225817.png";
import photo5 from "@/imports/Snapchat-698455157.jpg";
import photo6 from "@/imports/Snapchat-1995787973.jpg";
import photo7 from "@/imports/20231225_152908.jpg";
import photo8 from "@/imports/20231225_152909.jpg";
import photo9 from "@/imports/20231228_170724.jpg";
import photo10 from "@/imports/20231225_152912.jpg";
import photo11 from "@/imports/20231225_152922.jpg";
import photo12 from "@/imports/20231228_170718.jpg";
import photo13 from "@/imports/Snapchat-142623694.jpg";

const PX = "'Press Start 2P', monospace";
const VT = "'VT323', monospace";

const photos = [
  { id: "IMG-001", src: photo1, caption: "Bro bought the sunglasses. Bro bought the whole personality.", subcaption: "Pink frames. Yellow shirt. Full commitment to the bit.", date: "DOCUMENTED" },
  { id: "IMG-002", src: photo2, caption: "His 'productive' era. Lasted approximately 11 minutes.", subcaption: "Earphones in. Notebook open. Mind: absolutely elsewhere.", date: "BRIEF PERIOD, 2024" },
  { id: "IMG-003", src: photo3, caption: "The angle. The confidence. The sheer audacity.", subcaption: "Nobody asked for this photo. He took it anyway.", date: "SELF-INITIATED" },
  { id: "IMG-004", src: photo4, caption: "Him listening to advice he will absolutely not take.", subcaption: "Glasses on. Mustache present. Nodding. Learning nothing.", date: "RECURRING" },
  { id: "IMG-005", src: photo5, caption: "The earbuds are not even playing anything.", subcaption: "Eyes closed. Smiling. Fully unavailable. By design.", date: "OUTDOOR, UNSCHEDULED" },
  { id: "IMG-006", src: photo6, caption: "The fisheye era. We begged him to stop.", subcaption: "Peace sign. Distorted lens. Zero self-awareness. Peak him.", date: "SNAPCHAT, 2023" },
  { id: "IMG-007", src: photo7, caption: "Posing in a location nobody asked about.", subcaption: "Black sweater. Sideways photo. Full main character energy.", date: "DEC 25, 2023" },
  { id: "IMG-008", src: photo8, caption: "His reaction when someone shows him this website.", subcaption: "Hiding. Laughing. Both. Simultaneously. Cannot be stopped.", date: "DEC 25, 2023" },
  { id: "IMG-009", src: photo9, caption: "Him dramatically pointing at nothing in particular.", subcaption: "Red hoodie. Lake backdrop. Green earbuds. Full main character energy.", date: "DEC 28, 2023" },
  { id: "IMG-010", src: photo10, caption: "Caught mid-laugh. Evidence filed.", subcaption: "He did not know this photo was being taken. It shows.", date: "DEC 25, 2023" },
  { id: "IMG-011", src: photo11, caption: "He thinks this is his modelling debut. It is not.", subcaption: "Same store. Same sweater. Fully posed. Nobody asked.", date: "DEC 25, 2023" },
  { id: "IMG-012", src: photo12, caption: "Pointing at the horizon like he has a plan. He does not.", subcaption: "Back turned. Arm raised. Completely unbothered by reality.", date: "DEC 28, 2023" },
  { id: "IMG-013", src: photo13, caption: "LED heart glasses. Green shirt. Tilak. He came to win.", subcaption: "The drip was not requested. It was delivered regardless.", date: "CLASSIFIED" },
];

type Direction = "next" | "prev";
type Phase = "idle" | "exiting" | "entering";

export default function PhotosPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [index, setIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(photos.length - 1);
  const [phase, setPhase] = useState<Phase>("idle");
  const [direction, setDirection] = useState<Direction>("next");
  const [bgKey, setBgKey] = useState(0);
  const [captionKey, setCaptionKey] = useState(0);
  const animLock = useRef(false);
  const wheelLock = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const navigate = useCallback((dir: Direction) => {
    if (animLock.current) return;
    animLock.current = true;

    const next = dir === "next"
      ? (index + 1) % photos.length
      : (index - 1 + photos.length) % photos.length;

    setDirection(dir);
    setPhase("exiting");

    setTimeout(() => {
      setBgIndex(index);
      setBgKey(k => k + 1);
      setIndex(next);
      setPhase("entering");
      setCaptionKey(k => k + 1);
      setTimeout(() => { setPhase("idle"); animLock.current = false; }, 560);
    }, 450);
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate("next");
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   navigate("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      if (e.deltaY > 20 || e.deltaX > 20) navigate("next");
      else if (e.deltaY < -20 || e.deltaX < -20) navigate("prev");
      setTimeout(() => { wheelLock.current = false; }, 800);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [navigate]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 48) navigate(delta > 0 ? "next" : "prev");
    touchStartX.current = null;
  };

  const current = photos[index];
  const bg = photos[bgIndex];
  const total = photos.length;

  const photoClass = phase === "exiting"
    ? (direction === "next" ? "photo-exit-next" : "photo-exit-prev")
    : phase === "entering"
    ? (direction === "next" ? "photo-enter-next" : "photo-enter-prev")
    : "";

  return (
    <div
      className="relative flex flex-col bg-[#1A1A1A] overflow-hidden"
      style={{ minHeight: "100dvh" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Blurred background photo */}
      <div key={bgKey} className="absolute inset-0 bg-fade-in pointer-events-none" style={{ zIndex: 0 }}>
        <img
          src={bg.src}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "blur(40px) saturate(0.25) brightness(0.15)", transform: "scale(1.15)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(26,26,26,0.7) 0%, rgba(26,26,26,0.3) 40%, rgba(26,26,26,0.8) 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col" style={{ minHeight: "100dvh", paddingTop: "72px" }}>

        {/* ── DESKTOP ── */}
        <div className="hidden md:flex flex-col flex-1">

          {/* Header */}
          <div
            className="flex items-end justify-between px-10 lg:px-16 pt-8 pb-6"
            style={{ borderBottom: "2px solid rgba(255,255,255,0.06)" }}
          >
            <div>
              <div
                className="flex items-center gap-3 mb-4"
                style={{ fontFamily: PX, fontSize: "8px", letterSpacing: "0.2em", color: "#62B954" }}
              >
                <span className="accent-line" />
                002 / PHOTOS
              </div>
              <h1
                style={{
                  fontFamily: PX,
                  fontSize: "clamp(18px, 2.5vw, 32px)",
                  lineHeight: 1.6,
                  letterSpacing: "0.04em",
                  margin: 0,
                  color: "#F0F0F0",
                }}
              >
                THE
                <br />
                <span style={{ WebkitTextStroke: "2px #F0F0F0", WebkitTextFillColor: "transparent" }}>
                  MEME ARCHIVE
                </span>
              </h1>
            </div>
            <p style={{ fontFamily: VT, fontSize: "20px", color: "#555555", maxWidth: "260px", textAlign: "right", lineHeight: 1.5, fontStyle: "italic" }}>
              Photographic evidence of decisions that should never have been documented.
            </p>
          </div>

          {/* Main stage */}
          <div className="flex flex-1 items-center px-10 lg:px-16 py-6">

            {/* Left: prev */}
            <div
              className="flex flex-col items-start justify-between flex-shrink-0"
              style={{ width: "120px", alignSelf: "stretch", paddingTop: "16px", paddingBottom: "16px" }}
            >
              <button
                onClick={() => navigate("prev")}
                className="mc-button"
                style={{ cursor: "none", padding: "10px 16px", fontSize: "9px", opacity: 0.75 }}
              >
                &lt; PREV
              </button>

              <div style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.1em", color: "#555555", lineHeight: 2.2 }}>
                <span style={{ color: "#62B954", fontSize: "10px" }}>{String(index + 1).padStart(2, "0")}</span>
                <br />
                <span>/ {String(total).padStart(2, "0")}</span>
                <br />
                <span style={{ color: "#3A3A3A", fontSize: "6px" }}>{current.id}</span>
              </div>
            </div>

            {/* Center: photo + caption */}
            <div className="flex-1 flex flex-col items-center justify-center" style={{ gap: "24px" }}>
              <div key={`photo-${index}`} className={photoClass} style={{ position: "relative" }}>
                <img
                  src={current.src}
                  alt={current.caption}
                  style={{
                    maxHeight: "calc(100dvh - 340px)",
                    maxWidth: "min(400px, 55vw)",
                    width: "auto",
                    height: "auto",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.6)",
                  }}
                />
                {/* Evidence tag */}
                <div
                  style={{
                    position: "absolute", top: "12px", left: "12px",
                    fontFamily: PX, fontSize: "7px", letterSpacing: "0.15em",
                    color: "#62B954", border: "2px solid rgba(98,185,84,0.6)",
                    padding: "4px 8px", background: "rgba(26,26,26,0.9)",
                  }}
                >
                  {current.id}
                </div>
                {/* Date tag */}
                <div
                  style={{
                    position: "absolute", bottom: "12px", right: "12px",
                    fontFamily: PX, fontSize: "6px", letterSpacing: "0.1em",
                    color: "#9E9E9E", background: "rgba(26,26,26,0.9)", padding: "4px 8px",
                  }}
                >
                  {current.date}
                </div>
              </div>

              {/* Caption */}
              <div key={`caption-${captionKey}`} className="caption-enter text-center" style={{ maxWidth: "460px" }}>
                <p style={{ fontFamily: VT, fontSize: "22px", color: "#F0F0F0", lineHeight: 1.4, margin: "0 0 10px" }}>
                  "{current.caption}"
                </p>
                <p style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.1em", color: "#555555", margin: 0, lineHeight: 1.8 }}>
                  {current.subcaption}
                </p>
              </div>
            </div>

            {/* Right: next + progress */}
            <div
              className="flex flex-col items-end justify-between flex-shrink-0"
              style={{ width: "120px", alignSelf: "stretch", paddingTop: "16px", paddingBottom: "16px" }}
            >
              <button
                onClick={() => navigate("next")}
                className="mc-button"
                style={{ cursor: "none", padding: "10px 16px", fontSize: "9px", opacity: 0.75 }}
              >
                NEXT &gt;
              </button>

              {/* Pixel progress dots */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { if (i !== index && !animLock.current) navigate(i > index ? "next" : "prev"); }}
                    style={{
                      background: i === index ? "#62B954" : "#2E2E2E",
                      width: i === index ? "20px" : "6px",
                      height: "4px",
                      border: "none",
                      padding: 0,
                      cursor: "none",
                      transition: "all 0.2s ease",
                      imageRendering: "pixelated",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div
            className="px-10 lg:px-16 py-4 flex items-center justify-between"
            style={{ borderTop: "2px solid rgba(255,255,255,0.06)" }}
          >
            <div style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.15em", color: "#2E2E2E" }}>
              USE &lt; &gt; KEYS OR SCROLL TO NAVIGATE
            </div>
            <div style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.15em", color: "#2E2E2E" }}>
              <span style={{ color: "#62B954" }}>■</span> ARCHIVE ACTIVE · {total} ITEMS ON RECORD
            </div>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="md:hidden flex flex-col flex-1 px-5" style={{ paddingBottom: "32px" }}>

          <div style={{ paddingTop: "16px", paddingBottom: "20px", borderBottom: "2px solid rgba(255,255,255,0.06)" }}>
            <div
              className="flex items-center gap-3 mb-3"
              style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.2em", color: "#62B954" }}
            >
              <span className="accent-line" />
              002 / PHOTOS
            </div>
            <h1
              style={{
                fontFamily: PX,
                fontSize: "clamp(16px, 5vw, 28px)",
                lineHeight: 1.6,
                letterSpacing: "0.04em",
                margin: "0 0 10px",
                color: "#F0F0F0",
              }}
            >
              THE
              <br />
              <span style={{ WebkitTextStroke: "2px #F0F0F0", WebkitTextFillColor: "transparent" }}>MEME</span>
              <br />
              ARCHIVE
            </h1>
            <p style={{ fontFamily: VT, fontSize: "20px", color: "#555555", lineHeight: 1.4, fontStyle: "italic", margin: 0 }}>
              Photographic evidence of decisions that should never have been documented.
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center py-6" style={{ gap: "20px" }}>
            <div
              key={`m-photo-${index}`}
              className={`${photoClass} relative`}
              style={{ alignSelf: "center", width: "100%", maxWidth: "300px" }}
            >
              <img
                src={current.src}
                alt={current.caption}
                style={{
                  width: "100%",
                  maxHeight: "340px",
                  objectFit: "cover",
                  objectPosition: "top",
                  display: "block",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.9)",
                }}
              />
              <div
                style={{
                  position: "absolute", top: "10px", left: "10px",
                  fontFamily: PX, fontSize: "6px", letterSpacing: "0.12em",
                  color: "#62B954", border: "2px solid rgba(98,185,84,0.5)",
                  padding: "3px 7px", background: "rgba(26,26,26,0.9)",
                }}
              >
                {current.id}
              </div>
            </div>

            <div key={`m-caption-${captionKey}`} className="caption-enter">
              <div style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.15em", color: "#62B954", marginBottom: "12px" }}>
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
              <p style={{ fontFamily: VT, fontSize: "22px", color: "#F0F0F0", lineHeight: 1.4, margin: "0 0 8px" }}>
                "{current.caption}"
              </p>
              <p style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.08em", color: "#555555", margin: 0, lineHeight: 1.8 }}>
                {current.subcaption}
              </p>
            </div>
          </div>

          <div style={{ borderTop: "2px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigate("prev")}
                className="mc-button"
                style={{ cursor: "pointer", padding: "10px 16px", fontSize: "8px" }}
              >
                &lt; PREV
              </button>

              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {photos.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      background: i === index ? "#62B954" : "#2E2E2E",
                      width: i === index ? "14px" : "4px",
                      height: "4px",
                      transition: "all 0.2s ease",
                      imageRendering: "pixelated",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate("next")}
                className="mc-button"
                style={{ cursor: "pointer", padding: "10px 16px", fontSize: "8px" }}
              >
                NEXT &gt;
              </button>
            </div>
            <div style={{ fontFamily: PX, fontSize: "6px", letterSpacing: "0.12em", color: "#2E2E2E", textAlign: "center" }}>
              SWIPE LEFT OR RIGHT TO NAVIGATE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
