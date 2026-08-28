import { useEffect, useRef, useState } from "react";
import heroPhoto from "@/imports/hero_you_died.jpg";
import SubjectProfile from "./pages/SubjectProfile";
import TheVerdict from "./pages/TheVerdict";
import PhotosPage from "./pages/PhotosPage";

const PHOTO_URL = heroPhoto;
const PHOTO_URL_MOBILE = heroPhoto;

const PX = "'Press Start 2P', monospace";
const VT = "'VT323', monospace";

type Page = "home" | "profile" | "photos" | "verdict";

const menuItems: { label: string; page: Page; index: string }[] = [
  { label: "SUBJECT PROFILE", page: "profile", index: "001" },
  { label: "PHOTOS", page: "photos", index: "002" },
  { label: "THE VERDICT", page: "verdict", index: "003" },
];

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mouseX = -100, mouseY = -100;
    let trailX = -100, trailY = -100;
    let rafId: number;

    const tick = () => {
      trailX += (mouseX - trailX) * 0.055;
      trailY += (mouseY - trailY) * 0.055;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      if (trailRef.current) trailRef.current.style.transform = `translate(${trailX - 14}px, ${trailY - 14}px)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onEnter = () => { cursorRef.current?.classList.add("is-hovering"); trailRef.current?.classList.add("is-hovering"); };
    const onLeave = () => { cursorRef.current?.classList.remove("is-hovering"); trailRef.current?.classList.remove("is-hovering"); };

    const attach = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("mousemove", onMove);

    return () => { cancelAnimationFrame(rafId); window.removeEventListener("mousemove", onMove); observer.disconnect(); };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage]);

  const navigate = (page: string) => {
    setTransitioning(true);
    setMenuOpen(false);
    setTimeout(() => {
      setCurrentPage(page as Page);
      setTransitioning(false);
    }, 280);
  };

  const currentLabel = menuItems.find((m) => m.page === currentPage)?.label ?? "THE ARCHIVE";
  const currentIndex = menuItems.find((m) => m.page === currentPage)?.index ?? null;

  return (
    <div
      className="relative min-h-screen bg-[#1A1A1A] text-[#F0F0F0] overflow-x-hidden"
      style={{ fontFamily: PX }}
    >
      {/* Pixel cursor */}
      <div ref={cursorRef} className="cursor" />
      <div ref={trailRef} className="cursor-trail" />

      {/* Page transition overlay */}
      <div
        className="fixed inset-0 z-[200] pointer-events-none"
        style={{ background: "#1A1A1A", opacity: transitioning ? 1 : 0, transition: "opacity 0.28s ease" }}
      />

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 py-5">
        {/* Left: home / current section */}
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-3 transition-colors duration-200"
          style={{ background: "none", border: "none", padding: 0, cursor: "none" }}
        >
          <div
            style={{
              fontFamily: PX,
              fontSize: "8px",
              letterSpacing: "0.1em",
              color: currentPage === "home" ? "#555555" : "#62B954",
            }}
            className="flex items-center gap-2 max-w-[160px] md:max-w-none"
          >
            {currentPage !== "home" && (
              <>
                <span className="accent-line flex-shrink-0" />
                <span className="truncate md:overflow-visible md:whitespace-normal">
                  {currentIndex ? `${currentIndex} / ${currentLabel}` : ""}
                </span>
              </>
            )}
          </div>
        </button>

        {/* Center wordmark */}
        <div
          className="absolute left-1/2 -translate-x-1/2 hidden md:block"
          style={{ fontFamily: PX, fontSize: "8px", letterSpacing: "0.2em", color: "#3A3A3A" }}
        >
          THE ARCHIVE
        </div>

        {/* Right: menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-3 transition-colors duration-200"
          style={{
            fontFamily: PX,
            fontSize: "8px",
            letterSpacing: "0.1em",
            color: menuOpen ? "#62B954" : "#9E9E9E",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "none",
          }}
        >
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>
          <div className="flex flex-col gap-[5px]">
            <span className="block h-[2px] transition-all duration-300" style={{ width: "18px", background: menuOpen ? "#62B954" : "#9E9E9E", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span className="block h-[2px] transition-all duration-300" style={{ width: "12px", background: menuOpen ? "#62B954" : "#9E9E9E", opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-[2px] transition-all duration-300" style={{ width: "18px", background: menuOpen ? "#62B954" : "#9E9E9E", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </div>
        </button>
      </nav>

      {/* ─── MENU OVERLAY ─── */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center px-10 lg:px-20 transition-all duration-500"
        style={{
          background: "#1A1A1A",
          backgroundImage: "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
        }}
      >
        <div style={{ fontFamily: PX, fontSize: "8px", letterSpacing: "0.2em", color: "#3A3A3A", marginBottom: "40px" }}>
          &gt; SELECT DESTINATION
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "480px" }}>
          {menuItems.map((item) => (
            <button
              key={item.page}
              onClick={() => navigate(item.page)}
              className={`mc-button w-full${currentPage === item.page ? " is-active" : ""}`}
              style={{ padding: "18px 24px", fontSize: "11px", letterSpacing: "0.08em", cursor: "none" }}
            >
              <span style={{ color: "#555555", fontSize: "8px", marginRight: "16px" }}>{item.index}</span>
              {item.label}
              {currentPage === item.page && (
                <span style={{ fontSize: "8px", marginLeft: "12px", color: "#FFFFA0" }}>◀</span>
              )}
            </button>
          ))}
        </div>

        <div
          className="mt-12 pt-6"
          style={{
            borderTop: "2px solid #2E2E2E",
            fontFamily: PX,
            fontSize: "7px",
            color: "#3A3A3A",
            lineHeight: 2,
          }}
        >
          ALL INFORMATION CONTAINED HEREIN IS UNVERIFIED
          <br />
          AND COMPILED BY CONCERNED PARTIES.
        </div>
      </div>

      {/* ─── PAGE CONTENT ─── */}
      {currentPage === "home" && (
        <>
          {/* ── TABLET + DESKTOP ── */}
          <div className="hidden md:block">
            <div className="relative min-h-screen overflow-hidden">

              {/* PHOTO */}
              <div className="absolute inset-0">
                <img
                  src={PHOTO_URL}
                  alt="The subject in their natural habitat"
                  className="w-full h-full object-cover"
                  style={{
                    opacity: imageLoaded ? 1 : 0,
                    objectPosition: "center 28%",
                    transform: imageLoaded ? "scale(1)" : "scale(1.03)",
                    transition: "opacity 1.4s ease, transform 2.5s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onLoad={() => setImageLoaded(true)}
                />
                {/* Left edge fade */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.6) 30%, rgba(26,26,26,0.0) 55%)" }} />
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0" style={{ height: "40%", background: "linear-gradient(to top, rgba(26,26,26,0.97) 0%, rgba(26,26,26,0.5) 55%, transparent 100%)" }} />
                {/* Top fade */}
                <div className="absolute top-0 left-0 right-0" style={{ height: "140px", background: "linear-gradient(to bottom, rgba(26,26,26,0.65) 0%, transparent 100%)" }} />
              </div>

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col min-h-screen pl-10 lg:pl-16 pr-3 pt-20 pb-10">

                {/* Hero name */}
                <h1
                  className="animate-fade-up delay-200"
                  style={{
                    fontFamily: PX,
                    fontSize: "clamp(28px, 3.8vw, 52px)",
                    lineHeight: 1.5,
                    letterSpacing: "0.04em",
                    color: "#F0F0F0",
                    margin: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 0,
                  }}
                >
                  ROHAN
                  <br />
                  <span style={{
                    WebkitTextStroke: "2px rgba(240,240,240,0.5)",
                    WebkitTextFillColor: "transparent",
                    display: "block",
                    paddingLeft: "clamp(24px, 3vw, 48px)",
                  }}>
                    ALANGE
                  </span>
                </h1>

<div className="flex-1" />

                {/* Bottom strip */}
                <div className="animate-fade-up delay-500" style={{ paddingTop: "24px", borderTop: "2px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-end justify-between gap-8">

                    {/* Description */}
                    <div style={{ maxWidth: "380px" }}>
                      <div className="flex items-center gap-3 mb-4">
                        <div style={{ width: "24px", height: "2px", background: "#62B954" }} />
                        <span style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.15em", color: "#62B954" }}>
                          STILL AT LARGE
                        </span>
                      </div>
                      <p style={{ fontFamily: VT, fontSize: "22px", lineHeight: 1.4, color: "#9E9E9E", margin: 0 }}>
                        A brief documentation of the man, the myths, The memes and known for questionable decision making.{" "}
                        <span style={{ color: "#555555" }}>Compiled by people who unfortunately know him.</span>
                      </p>
                    </div>

                    {/* Metadata + CTA */}
                    <div className="flex flex-col items-end gap-6 flex-shrink-0">
                      <div style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.1em", color: "#3A3A3A", lineHeight: 2.2, textAlign: "right" }}>
                        <span style={{ color: "#9E9E9E" }}>STATUS</span>{"   "}ACTIVE<br />
                        <span style={{ color: "#9E9E9E" }}>DOCUMENT</span>{"   "}2026<br />
                        <span style={{ color: "#9E9E9E" }}>FILE</span>{"   "}ARCH-001-RA
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => navigate("profile")}
                        className="mc-button"
                        style={{ cursor: "none", padding: "14px 28px", fontSize: "9px" }}
                      >
                        SEE WHAT WE FOUND &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── MOBILE ── */}
          <div className="md:hidden flex flex-col" style={{ minHeight: "100dvh" }}>

            {/* Photo */}
            <div className="relative flex-shrink-0" style={{ height: "56vh", overflow: "hidden" }}>
              <img
                src={PHOTO_URL_MOBILE}
                alt="The subject in their natural habitat"
                className="w-full h-full object-cover"
                style={{
                  opacity: imageLoaded ? 1 : 0,
                  transition: "opacity 1.2s ease",
                  objectPosition: "center 25%",
                }}
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute bottom-0 left-0 right-0" style={{ height: "45%", background: "linear-gradient(to top, #1A1A1A 0%, transparent 100%)" }} />
              <div className="absolute top-0 left-0 right-0" style={{ height: "100px", background: "linear-gradient(to bottom, rgba(26,26,26,0.55), transparent)" }} />

              {/* Archive tag */}
              <div
                className="absolute top-20 left-5 animate-fade-up delay-200 flex items-center gap-2"
                style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.15em", color: "#62B954" }}
              >
                <span className="accent-line" />
                001 / SUBJECT PROFILE
              </div>
            </div>

            {/* Text content */}
            <div className="flex flex-col flex-1 px-5 pt-2 pb-8" style={{ background: "#1A1A1A" }}>

              <div
                className="animate-fade-up delay-300 mb-2"
                style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.2em", color: "#9E9E9E" }}
              >
                THE SUBJECT
              </div>

              <h1
                className="animate-fade-up delay-400"
                style={{
                  fontFamily: PX,
                  fontSize: "clamp(20px, 6vw, 36px)",
                  lineHeight: 1.6,
                  letterSpacing: "0.04em",
                  color: "#F0F0F0",
                  margin: "0 0 20px",
                }}
              >
                ROHAN
                <br />
                <span style={{ WebkitTextStroke: "2px rgba(240,240,240,0.45)", WebkitTextFillColor: "transparent" }}>
                  ALANGE
                </span>
              </h1>

              <div className="flex items-center gap-3 mb-5 animate-fade-up delay-500">
                <div style={{ width: "20px", height: "2px", background: "#62B954" }} />
                <span style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.1em", color: "#62B954" }}>
                  STILL AT LARGE
                </span>
              </div>

              <p
                className="animate-fade-up delay-600"
                style={{ fontFamily: VT, fontSize: "22px", lineHeight: 1.4, color: "#9E9E9E", margin: "0 0 20px" }}
              >
                A brief documentation of the man, the myths, The memes and known for questionable decision making.{" "}
                <span style={{ color: "#555555" }}>Compiled by people who unfortunately know him.</span>
              </p>

              <div
                className="animate-fade-up delay-600 mb-6"
                style={{ fontFamily: PX, fontSize: "7px", letterSpacing: "0.08em", color: "#3A3A3A", lineHeight: 2.2 }}
              >
                <span style={{ color: "#9E9E9E" }}>STATUS</span>{"   "}ACTIVE{"   "}
                <span style={{ color: "#9E9E9E" }}>DOC</span>{"   "}2026
              </div>

              <div className="animate-fade-up delay-700 mt-auto">
                <button
                  onClick={() => navigate("profile")}
                  className="mc-button w-full"
                  style={{ cursor: "pointer", padding: "16px 20px", fontSize: "9px" }}
                >
                  SEE WHAT WE FOUND &gt;
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {currentPage === "profile" && <SubjectProfile onNavigate={navigate} />}
      {currentPage === "photos" && <PhotosPage onNavigate={navigate} />}
      {currentPage === "verdict" && <TheVerdict onNavigate={navigate} />}
    </div>
  );
}
