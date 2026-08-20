import { clips } from "@/data/clips";
import { ClipArchive } from "@/components/clips/ClipArchive";

export default function ClipsPage() {
  return <ClipArchive clips={clips} />;
}
