import type { Photo } from "@/types/photo"; import { Modal } from "@/components/common/Modal";
export function MemeViewer({ photo, onClose }: { photo: Photo | null; onClose: () => void }) { return <Modal open={!!photo} onClose={onClose}><h2>{photo?.title}</h2><p>{photo?.caption}</p></Modal>; }
