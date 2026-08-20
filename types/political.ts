export type PoliticalExhibit = {
  id: string;
  title: string;
  subtitle?: string;
  detail: string;
  src?: string;
  aspect?: "portrait" | "landscape" | "square";
  objectPosition?: string;
  allegiance?: string;
  date?: string;
};
