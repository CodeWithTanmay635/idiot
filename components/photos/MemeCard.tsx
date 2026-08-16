import type { Photo } from "@/types/photo";
export function MemeCard({ photo, onOpen }: { photo: Photo; onOpen?: () => void }) { return <button className="card" onClick={onOpen} style={{textAlign:"left"}}><span className="pill">#{photo.id}</span><h3>{photo.title}</h3><p className="muted">{photo.caption}</p></button>; }
