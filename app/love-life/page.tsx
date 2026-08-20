import { loveLife } from "@/data/loveLife";
import { LoveLifeArchive } from "@/components/love-life/LoveLifeArchive";

export default function LoveLifePage() {
  return <LoveLifeArchive events={loveLife} />;
}
