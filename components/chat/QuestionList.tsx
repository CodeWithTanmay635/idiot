import type { ChatReply } from "@/types/chat";
export function QuestionList({ replies, onSelect }: { replies:ChatReply[]; onSelect:(reply:ChatReply)=>void }) { return <div className="grid">{replies.map(reply => <button key={reply.question} className="card" onClick={()=>onSelect(reply)} style={{textAlign:"left"}}>{reply.question}</button>)}</div>; }
