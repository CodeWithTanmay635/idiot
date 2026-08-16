import type { Clip } from "@/types/clip";
export function ClipCard({ clip, onPlay }: { clip: Clip; onPlay: () => void }) { return <button className="card" onClick={onPlay} style={{textAlign:"left"}}><span className="pill">Video</span><h3>{clip.title}</h3><p className="muted">{clip.description}</p></button>; }
