import { loveLife } from "@/data/loveLife"; import { Timeline } from "@/components/love-life/Timeline"; import { LoveStats } from "@/components/love-life/LoveStats";
export default function LoveLifePage() { return <main><h1>Love life</h1><LoveStats incidents={loveLife.length}/><div style={{height:16}}/><Timeline events={loveLife}/></main>; }
