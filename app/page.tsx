import { Hero } from "@/components/home/Hero";
import { InteractiveArchiveList } from "@/components/home/InteractiveArchiveList";
import { GameSection } from "@/components/home/GameSection";

export default function Home() {
  return (
    <main style={{ padding: 0, maxWidth: "none", margin: 0, background: "#020202" }}>
      {/* Layer 1: Cinematic Hero */}
      <Hero />

      {/* Layer 2: Interactive 4-Item Archive List with Cursor Physics */}
      <InteractiveArchiveList />

      {/* Layer 3: Tactical Assessment & Birthday Protocol Vault */}
      <GameSection />
    </main>
  );
}
