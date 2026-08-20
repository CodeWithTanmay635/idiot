export type Photo = {
  id: string;
  /** Display title — shown above the caption */
  title?: string;
  /** The meme caption — the punchline */
  caption: string;
  /** Path to the image file in /public */
  src?: string;
  /** Optional aspect hint: 'portrait' | 'landscape' | 'square' */
  aspect?: "portrait" | "landscape" | "square";
  /** CSS object-position for fine-tuned cropping (default: center 20%) */
  objectPosition?: string;
};
