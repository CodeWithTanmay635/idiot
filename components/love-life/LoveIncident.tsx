import type { LoveEvent } from "@/types/loveLife";
export function LoveIncident({ event }: { event: LoveEvent }) { return <article className="card"><span className="pill">{event.date}</span><h3>{event.title}</h3><p>{event.detail}</p></article>; }
