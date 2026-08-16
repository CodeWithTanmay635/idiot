import Link from "next/link";
const links = [["Photos","/photos"],["Clips","/clips"],["Love life","/love-life"],["Politics","/political-affiliation"],["Chat","/chat"],["Game","/game"]];
export function Navigation() { return <nav style={{display:"flex",gap:16,padding:"18px 24px",borderBottom:"1px solid var(--line)",overflowX:"auto"}}><Link href="/"><b>idot</b></Link>{links.map(([label,href]) => <Link key={href} href={href}>{label}</Link>)}</nav>; }
