import { chatReplies } from "@/data/chat"; import { ChatWindow } from "@/components/chat/ChatWindow";
export default function ChatPage() { return <main><h1>Chat</h1><p className="muted">Ask the archive.</p><ChatWindow replies={chatReplies}/></main>; }
