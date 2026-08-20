export type LoveEvent = {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  detail: string;
  src?: string;
  aspect?: "portrait" | "landscape" | "square";
  objectPosition?: string;
  severity?: string;
};
