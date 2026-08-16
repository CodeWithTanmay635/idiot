export function SectionWrapper({ title, children }: { title: string; children: React.ReactNode }) { return <section style={{marginTop:48}}><h2>{title}</h2>{children}</section>; }
