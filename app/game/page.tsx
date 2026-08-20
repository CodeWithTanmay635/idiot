import { GameBoard } from "@/components/game/GameBoard";

export default function GamePage() {
  return (
    <main className="page-wrapper">
      <div className="section-tag">ARCHIVE 06 // TACTICAL EVALUATION</div>
      <h1 className="page-title">SUBJECT ASSESSMENT</h1>
      <p className="page-subtitle">
        An interactive diagnostic test to recover confidential birthday decrees and evaluate cognitive and behavioral readiness.
      </p>

      <GameBoard />
    </main>
  );
}
