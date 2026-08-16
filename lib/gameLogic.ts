import type { GameState } from "@/types/game";
export const initialGameState: GameState = { foundKey:false, doorOpen:false };
export const canOpenDoor = (state: GameState) => state.foundKey;
