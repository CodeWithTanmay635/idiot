import type { PoliticalExhibit } from "@/types/political";

/**
 * Political Dossier & Ideology Exhibits.
 * The user can add images to /public/images/ and set 'src' here.
 */
export const politicalEvidence: PoliticalExhibit[] = [
  {
    id: "01",
    title: "THE MACROECONOMIC RANT",
    subtitle: "FISCAL POLICY INQUEST",
    detail: "Spoke for 45 continuous minutes about global inflation after ordering a single $18 iced oat latte without looking at the price.",
    src: "/images/hero/rohan.jpg",
    aspect: "portrait",
    objectPosition: "center center",
    allegiance: "IDEOLOGY: FISCALLY CONFUSED",
    date: "DOC_REF: 902-A",
  },
  {
    id: "02",
    title: "UNSUBSTANTIATED GEOPOLITICS",
    subtitle: "FOREIGN AFFAIRS BRIEFING",
    detail: "Claimed to have predicted 3 major historical elections based purely on 'vibes and twitter algorithms'.",
    src: "/images/hero/526838554_18048644648561091_6427738268558538994_n.jpg",
    aspect: "portrait",
    objectPosition: "center 20%",
    allegiance: "ALLEGIANCE: CHAOTIC NEUTRAL",
    date: "DOC_REF: 902-B",
  },
  {
    id: "03",
    title: "DEBATE CONDUCT VIOLATIONS",
    subtitle: "PARLIAMENTARY INQUIRY",
    detail: "Repeatedly responded to complex constitutional policy arguments with 'it is what it is' and walked out to get snacks.",
    src: "/images/hero/rohan.jpg",
    aspect: "portrait",
    objectPosition: "60% center",
    allegiance: "DIPLOMACY: NON-EXISTENT",
    date: "DOC_REF: 902-C",
  },
  {
    id: "04",
    title: "ALLEGIANCE UNKNOWN",
    subtitle: "BALLOT RECONNAISSANCE",
    detail: "Cross-examination confirms the subject votes entirely based on which candidate has the best campaign memes.",
    src: "/images/hero/526838554_18048644648561091_6427738268558538994_n.jpg",
    aspect: "portrait",
    objectPosition: "center 15%",
    allegiance: "STATUS: DISSIDENT AT LARGE",
    date: "DOC_REF: 902-D",
  },
];
