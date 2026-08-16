import type { Clip } from "@/types/clip"; import { Modal } from "@/components/common/Modal";
export function VideoPlayer({ clip, onClose }: { clip: Clip | null; onClose: () => void }) { return <Modal open={!!clip} onClose={onClose}><h2>{clip?.title}</h2>{clip?.src ? <video controls autoPlay src={clip.src} style={{width:"100%"}} /> : <p>No video source yet.</p>}</Modal>; }
