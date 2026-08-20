import type { Clip } from "@/types/clip";

/**
 * Clips & Surveillance Footage data.
 * The user can replace 'src' with video URLs (/videos/clip-01.mp4) or image thumbnails.
 */
export const clips: Clip[] = [
  {
    id: "01",
    title: "THE ATTEMPTED BACKFLIP",
    subtitle: "SURVEILLANCE ARCHIVE",
    description: "Subject attempted a gymnastic maneuver on flat ground. Gravity responded immediately.",
    src: "/images/hero/526838554_18048644648561091_6427738268558538994_n.jpg",
    aspect: "portrait",
    objectPosition: "center 20%",
    date: "DOC_REF: 412-A",
  },
  {
    id: "02",
    title: "UNPROVOKED DANCING INCIDENT",
    subtitle: "SECURITY FOOTAGE",
    description: "Captured dancing to elevator music in public setting. Zero remorse demonstrated.",
    src: "/images/hero/rohan.jpg",
    aspect: "portrait",
    objectPosition: "center center",
    date: "DOC_REF: 412-B",
  },
  {
    id: "03",
    title: "LOCKED OUT OF OWN APARTMENT",
    subtitle: "DOORBELL SURVEILLANCE",
    description: "Surveillance log showing 45 minutes of negotiations with an inanimate deadbolt.",
    src: "/images/hero/526838554_18048644648561091_6427738268558538994_n.jpg",
    aspect: "portrait",
    objectPosition: "center 25%",
    date: "DOC_REF: 412-C",
  },
  {
    id: "04",
    title: "THE ICED LATTE DEBATE",
    subtitle: "AUDIO/VISUAL INTERCEPT",
    description: "Arguing with the barista that a $18 coffee should come with free equity in the company.",
    src: "/images/hero/rohan.jpg",
    aspect: "portrait",
    objectPosition: "60% center",
    date: "DOC_REF: 412-D",
  },
];
