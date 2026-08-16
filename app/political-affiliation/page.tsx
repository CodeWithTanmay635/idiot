import { politicalEvidence } from "@/data/political"; import { PoliticalDossier } from "@/components/political/PoliticalDossier";
export default function PoliticalPage() { return <main><h1>Political affiliation</h1><p className="muted">The dossier remains inconclusive.</p><PoliticalDossier evidence={politicalEvidence}/></main>; }
