import { politicalEvidence } from "@/data/political";
import { PoliticalArchive } from "@/components/political/PoliticalArchive";

export default function PoliticalPage() {
  return <PoliticalArchive exhibits={politicalEvidence} />;
}
