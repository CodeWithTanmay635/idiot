import type { Metadata } from "next";
import { photos } from "@/data/photos";
import { PhotoArchive } from "@/components/photos/PhotoArchive";

export const metadata: Metadata = {
  title: "Photographic Evidence — Idot Archive",
  description:
    "A very expensive experimental photography archive was created to document this man's existence. Unfortunately, every photograph is a meme.",
};

export default function PhotosPage() {
  return <PhotoArchive photos={photos} />;
}
