import { EvidenceCard } from "./EvidenceCard"; import { LoyaltyMeter } from "./LoyaltyMeter";
export function PoliticalDossier({ evidence }: { evidence: {title:string;detail:string}[] }) { return <><LoyaltyMeter value={0}/><div style={{height:16}}/><div className="grid">{evidence.map(item => <EvidenceCard key={item.title} {...item}/>)}</div></>; }
