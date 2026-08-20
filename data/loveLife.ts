import type { LoveEvent } from "@/types/loveLife";

/**
 * Love Life & Romance Incident timeline.
 * The user can add images to /public/images/ and set 'src' here.
 */
export const loveLife: LoveEvent[] = [
  {
    id: "01",
    date: "2023 // Q1",
    title: "THE WAITER INCIDENT",
    subtitle: "PRIMARY CASE FILE",
    detail: "Waiter said 'enjoy your meal'. Subject replied 'you too'. Spent 40 minutes contemplating relocation to another continent.",
    src: "/images/hero/rohan.jpg",
    aspect: "portrait",
    objectPosition: "center center",
    severity: "SEVERITY: MAXIMUM",
  },
  {
    id: "02",
    date: "2024 // Q3",
    title: "ACCIDENTAL 3-HOUR EYE CONTACT",
    subtitle: "CAFE SURVEILLANCE",
    detail: "Believed someone across the cafe was flirting with him. Turns out they were looking at the menu board directly behind his head.",
    src: "/images/hero/526838554_18048644648561091_6427738268558538994_n.jpg",
    aspect: "portrait",
    objectPosition: "center 20%",
    severity: "SEVERITY: HIGH",
  },
  {
    id: "03",
    date: "2025 // Q2",
    title: "THE TEXT MESSAGE INQUEST",
    subtitle: "FORENSIC CHAT LOGS",
    detail: "Assembled a 4-person investigative committee to analyze why someone replied with two exclamation marks instead of one.",
    src: "/images/hero/rohan.jpg",
    aspect: "portrait",
    objectPosition: "60% center",
    severity: "SEVERITY: CRITICAL",
  },
  {
    id: "04",
    date: "2026 // CURRENT",
    title: "SINGLE AND THRIVING",
    subtitle: "STATUS: UNRESOLVED",
    detail: "Currently reports high levels of peace, though witnesses report occasional late-night Spotify sad song sessions.",
    src: "/images/hero/526838554_18048644648561091_6427738268558538994_n.jpg",
    aspect: "portrait",
    objectPosition: "center 15%",
    severity: "SEVERITY: PEACEFUL",
  },
];
