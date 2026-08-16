import type { Photo } from "@/types/photo"; import { MemeCard } from "./MemeCard";
export function MemeGrid({ photos, onOpen }: { photos: Photo[]; onOpen: (photo: Photo) => void }) { return <div className="grid">{photos.map(photo => <MemeCard key={photo.id} photo={photo} onOpen={() => onOpen(photo)} />)}</div>; }
