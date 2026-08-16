import type { Clip } from "@/types/clip"; import { ClipCard } from "./ClipCard";
export function ClipGrid({ clips, onPlay }: { clips: Clip[]; onPlay: (clip: Clip) => void }) { return <div className="grid">{clips.map(clip => <ClipCard key={clip.id} clip={clip} onPlay={() => onPlay(clip)} />)}</div>; }
