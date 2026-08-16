import type { LoveEvent } from "@/types/loveLife"; import { LoveIncident } from "./LoveIncident";
export function Timeline({ events }: { events: LoveEvent[] }) { return <div className="grid">{events.map(event => <LoveIncident key={event.date + event.title} event={event} />)}</div>; }
