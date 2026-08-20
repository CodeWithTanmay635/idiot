import type { Photo } from "@/types/photo";

/**
 * Photo archive data.
 *
 * To add real meme photos:
 * 1. Place images in /public/images/memes/
 * 2. Update src to "/images/memes/photo-XX.jpg"
 * 3. Update caption with the actual meme text
 * 4. Set objectPosition to fine-tune which part of the image shows
 *    (used as CSS background-position with background-size: 118%)
 *
 * objectPosition defaults to "center center".
 * Format: "X% Y%" or "left top" etc. — standard CSS background-position values.
 */
export const photos: Photo[] = [
  {
    id: "01",
    title: "THE POSE",
    caption: "Bro really thought this was a good idea.",
    src: "/images/hero/rohan.jpg",
    aspect: "portrait",
    objectPosition: "center center",
  },
  {
    id: "02",
    title: "THE LOOK",
    caption: "Nobody asked him to pose like this.",
    src: "/images/hero/526838554_18048644648561091_6427738268558538994_n.jpg",
    aspect: "portrait",
    objectPosition: "center 20%",
  },
  {
    id: "03",
    title: "THE CONFIDENCE",
    caption: "The audacity is immeasurable and his day is ruined.",
    src: "/images/hero/rohan.jpg",
    aspect: "portrait",
    objectPosition: "60% center",
  },
  {
    id: "04",
    title: "THE STATEMENT",
    caption: "This photo was taken without consent. Of our eyes.",
    src: "/images/hero/526838554_18048644648561091_6427738268558538994_n.jpg",
    aspect: "portrait",
    objectPosition: "center 30%",
  },
  {
    id: "05",
    title: "THE INCIDENT",
    caption:
      "At least three people witnessed this happen. All have since moved away.",
    src: "/images/hero/rohan.jpg",
    aspect: "portrait",
    objectPosition: "55% 20%",
  },
  {
    id: "06",
    title: "THE AFTERMATH",
    caption: "This is what peak performance looks like, apparently.",
    src: "/images/hero/526838554_18048644648561091_6427738268558538994_n.jpg",
    aspect: "portrait",
    objectPosition: "center 15%",
  },
];
