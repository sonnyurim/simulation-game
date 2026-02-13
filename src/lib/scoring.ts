import type { Resources, ScoreBreakdown } from "@/types/survival";
import { GAME_CONFIG } from "./constants";

export function calculateScore(
  turn: number,
  resources: Resources,
  emergencyUsed: number,
): ScoreBreakdown {
  const turnScore = Math.min(turn * 10, GAME_CONFIG.TOTAL_TURNS * 10);

  const resourceValues = Object.values(resources) as number[];
  const resourceAvg = resourceValues.reduce((a, b) => a + b, 0) / resourceValues.length;
  const resourceBonus = Math.round(resourceAvg);

  const allAbove50 = resourceValues.every((v) => v > 50);
  const perfectBonus = allAbove50 && turn >= GAME_CONFIG.TOTAL_TURNS ? 200 : 0;

  const emergencyPenalty = emergencyUsed * 100;

  const totalScore = Math.max(0, turnScore + resourceBonus + perfectBonus - emergencyPenalty);

  return {
    turnScore,
    resourceBonus,
    perfectBonus,
    emergencyPenalty,
    totalScore,
  };
}
