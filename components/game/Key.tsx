export function Key({ found }: { found:boolean }) { return <span className="pill">{found ? "Key acquired" : "Key missing"}</span>; }
