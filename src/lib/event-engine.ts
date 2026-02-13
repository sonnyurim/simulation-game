import type { GameState, Phase, GameEvent } from "@/types/survival";
import { GAME_CONFIG } from "./constants";
import { EVENTS, SPECIAL_EVENTS } from "./events";

const SPECIAL_EVENT_MIN_TURN = 26;
const SPECIAL_EVENT_CHANCE = 0.25;

function getTurnPhase(turn: number): Phase {
  if (turn <= GAME_CONFIG.PHASE_EARLY_END) return "early";
  if (turn <= GAME_CONFIG.PHASE_MID_END) return "mid";
  return "late";
}

function filterByPhase(events: readonly GameEvent[], phase: Phase): GameEvent[] {
  return events.filter((e) => e.phase === phase);
}

function excludeUsed(
  events: GameEvent[],
  usedIds: readonly string[],
): GameEvent[] {
  return events.filter((e) => !usedIds.includes(e.id));
}

function excludeRecentTags(
  events: GameEvent[],
  recentTags: readonly string[],
): GameEvent[] {
  return events.filter((e) => !recentTags.includes(e.tag));
}

function filterByResourceCondition(
  events: GameEvent[],
  state: GameState,
): GameEvent[] {
  return events.filter((e) => {
    if (!e.resourceCondition) return true;
    const { resource, below } = e.resourceCondition;
    return state.resources[resource] < below;
  });
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Try to select a special crisis event (after turn 26, 25% chance)
function trySelectSpecialEvent(state: GameState): GameEvent | null {
  const nextTurn = state.turn + 1;
  if (nextTurn < SPECIAL_EVENT_MIN_TURN) return null;
  if (Math.random() > SPECIAL_EVENT_CHANCE) return null;

  const phase = getTurnPhase(nextTurn);
  const phaseSpecials = SPECIAL_EVENTS.filter(
    (e) => e.phase === phase || e.phase === "mid",
  );
  const unused = excludeUsed([...phaseSpecials], state.usedEventIds);

  if (unused.length === 0) return null;
  return pickRandom(unused);
}

export function selectEvent(state: GameState): GameEvent {
  // Special crisis events can interrupt normal flow
  const specialEvent = trySelectSpecialEvent(state);
  if (specialEvent) return specialEvent;

  const phase = getTurnPhase(state.turn + 1);
  const phaseEvents = filterByPhase(EVENTS, phase);

  // Step 1: Unused events in current phase
  let candidates = excludeUsed(phaseEvents, state.usedEventIds);

  // Step 2: Filter by resource conditions
  candidates = filterByResourceCondition(candidates, state);

  // Step 3: Exclude recent tags
  const withoutRecentTags = excludeRecentTags(candidates, state.recentTags);

  if (withoutRecentTags.length > 0) {
    return pickRandom(withoutRecentTags);
  }

  // Step 4: Relax tag constraint
  if (candidates.length > 0) {
    return pickRandom(candidates);
  }

  // Step 5: Reset — allow reuse of phase events (all 18 < 52 turns)
  const reusable = filterByResourceCondition(phaseEvents, state);
  const reusableNoTags = excludeRecentTags(reusable, state.recentTags);

  if (reusableNoTags.length > 0) {
    return pickRandom(reusableNoTags);
  }

  // Final fallback: any event from the phase
  return pickRandom(phaseEvents);
}
