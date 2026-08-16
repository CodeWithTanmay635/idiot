export function EvidenceCard({ title, detail }: { title:string; detail:string }) { return <article className="card"><h3>{title}</h3><p className="muted">{detail}</p></article>; }
