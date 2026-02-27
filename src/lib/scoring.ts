import type { Resources, ScoreBreakdown } from "@/types/survival";
import { GAME_CONFIG } from "./constants";

// turnScore multiplier: 18 * 27 = 486 (≈ 52 * 10 = 520)
const TURN_SCORE_MULTIPLIER = 27;

export function calculateScore(
  turn: number,
  resources: Resources,
  emergencyUsed: number,
): ScoreBreakdown {
  const turnScore = Math.min(turn * TURN_SCORE_MULTIPLIER, GAME_CONFIG.TOTAL_TURNS * TURN_SCORE_MULTIPLIER);

  const resourceValues = Object.values(resources) as number[];
  const resourceAvg = resourceValues.reduce((a, b) => a + b, 0) / resourceValues.length;
  const resourceBonus = Math.round(resourceAvg);

  const allPerfect = resourceValues.every((v) => v > GAME_CONFIG.PERFECT_RESCUE_THRESHOLD);
  const perfectBonus = allPerfect && turn >= GAME_CONFIG.TOTAL_TURNS ? 200 : 0;

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
