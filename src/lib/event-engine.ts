import type { GameState, Phase, GameEvent } from "@/types/survival";
import { GAME_CONFIG } from "./constants";
import { EVENTS, SPECIAL_EVENTS } from "./events";

// Special events start from mid-game (turn 11 of 30)
const SPECIAL_EVENT_MIN_TURN = 11;
const SPECIAL_EVENT_CHANCE = 0.25;

// Blackout arc: random within turns 12-20
// sp_blackout fires at 50% per turn (12-20) → P(never) ≈ 0.2%
// sp_lights_restored fires at 45% per turn after blackout → almost always within 3-4 turns
const BLACKOUT_CHANCE = 0.50;
const LIGHTS_RESTORED_CHANCE = 0.45;

// Narrative milestone events — guaranteed to fire at or after these turns if not yet seen
const MANDATORY_NARRATIVE: readonly { id: string; atTurn: number }[] = [
  { id: "m06",          atTurn: 16 }, // 무전 신호 수신: first rescue signal
  { id: "l05",          atTurn: 22 }, // 구조 통신 시스템: preparing position signal
  { id: "sp_heli_down", atTurn: 25 }, // 군 헬기 격추: rescue trust arc 절정 — STORY.md §6
  { id: "l06",          atTurn: 29 }, // 마지막 밤: climax before rescue
] as const;

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

// Tag affinity map — after tag X, prefer events with related tags for narrative continuity
const TAG_AFFINITIES: Readonly<Record<string, readonly string[]>> = {
  combat:   ["medical", "defense", "combat"],   // fight → treat wounds or fortify
  defense:  ["defense", "combat", "craft"],      // fortify → hold the line or build more
  medical:  ["medical", "social", "morale"],     // heal → group care and morale
  social:   ["social", "morale", "medical"],     // group dynamics → emotions
  morale:   ["morale", "social", "explore"],     // emotions → resolve drives action
  explore:  ["explore", "scavenge", "craft"],    // scouting → gathering and making
  scavenge: ["scavenge", "craft", "explore"],    // looting → put materials to use
  craft:    ["craft", "defense", "explore"],     // building → deploy it or find more
};

function preferByAffinity(
  events: GameEvent[],
  lastTag: string | undefined,
): { preferred: GameEvent[]; fallback: GameEvent[] } {
  if (!lastTag) return { preferred: events, fallback: [] };
  const affinities = TAG_AFFINITIES[lastTag] ?? [lastTag];
  const preferred = events.filter((e) => affinities.includes(e.tag));
  const fallback = events.filter((e) => !affinities.includes(e.tag));
  return { preferred, fallback };
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

// Try to select a special crisis event (after turn 10, 25% chance)
function trySelectSpecialEvent(state: GameState): GameEvent | null {
  const nextTurn = state.turn + 1;
  if (nextTurn < SPECIAL_EVENT_MIN_TURN) return null;

  // Blackout arc — random timing within turns 12-20
  if (
    nextTurn >= 12 &&
    nextTurn <= 20 &&
    !state.flashlightMode &&
    !state.usedEventIds.includes("sp_blackout")
  ) {
    if (Math.random() < BLACKOUT_CHANCE) {
      return SPECIAL_EVENTS.find((e) => e.id === "sp_blackout") ?? null;
    }
  }

  // Lights restored — fires randomly after blackout (flashlightMode=true)
  if (state.flashlightMode && !state.usedEventIds.includes("sp_lights_restored")) {
    if (Math.random() < LIGHTS_RESTORED_CHANCE) {
      return SPECIAL_EVENTS.find((e) => e.id === "sp_lights_restored") ?? null;
    }
  }

  if (Math.random() > SPECIAL_EVENT_CHANCE) return null;

  const phase = getTurnPhase(nextTurn);
  const phaseSpecials = SPECIAL_EVENTS.filter(
    (e) =>
      (e.phase === phase || e.phase === "mid") &&
      e.id !== "sp_blackout" &&
      e.id !== "sp_lights_restored",
  );
  const unused = excludeUsed([...phaseSpecials], state.usedEventIds);

  if (unused.length === 0) return null;
  return pickRandom(unused);
}

// Guarantee narrative milestone events at their designated turns
function trySelectMandatoryEvent(state: GameState): GameEvent | null {
  const nextTurn = state.turn + 1;
  for (const { id, atTurn } of MANDATORY_NARRATIVE) {
    if (nextTurn >= atTurn && !state.usedEventIds.includes(id)) {
      // 복전 이벤트는 현재 정전 중일 때만 등장
      if (id === "sp_lights_restored" && !state.flashlightMode) continue;
      const event = [...EVENTS, ...SPECIAL_EVENTS].find((e) => e.id === id) ?? null;
      return event;
    }
  }
  return null;
}

// Return the department-specific starter event on turn 1
function trySelectStarterEvent(state: GameState): GameEvent | null {
  if (state.turn !== 0) return null;
  if (!state.department) return null;
  return (
    EVENTS.find(
      (e) =>
        e.starterDepartmentId === state.department!.id &&
        !state.usedEventIds.includes(e.id),
    ) ?? null
  );
}

export function selectEvent(state: GameState): GameEvent {
  // Turn 1: always show the department's starter event
  const starterEvent = trySelectStarterEvent(state);
  if (starterEvent) return starterEvent;

  // Narrative milestones take priority over random selection
  const mandatoryEvent = trySelectMandatoryEvent(state);
  if (mandatoryEvent) return mandatoryEvent;

  // Special crisis events can interrupt normal flow
  const specialEvent = trySelectSpecialEvent(state);
  if (specialEvent) return specialEvent;

  const phase = getTurnPhase(state.turn + 1);
  const phaseEvents = filterByPhase(EVENTS, phase);

  const lastTag = state.recentTags[0];

  // Step 1: Unused events in current phase
  let candidates = excludeUsed(phaseEvents, state.usedEventIds);

  // Step 2: Filter by resource conditions
  candidates = filterByResourceCondition(candidates, state);

  // Step 3: Prefer events with tag affinity to the last event (narrative continuity)
  const { preferred, fallback } = preferByAffinity(candidates, lastTag);
  if (preferred.length > 0) return pickRandom(preferred);
  if (fallback.length > 0) return pickRandom(fallback);

  // Step 4: Reset — allow reuse of phase events, still prefer affinity
  const reusable = filterByResourceCondition(phaseEvents, state);
  const { preferred: reusePreferred, fallback: reuseFallback } = preferByAffinity(reusable, lastTag);
  if (reusePreferred.length > 0) return pickRandom(reusePreferred);
  if (reuseFallback.length > 0) return pickRandom(reuseFallback);

  // Final fallback: any event from the phase
  return pickRandom(phaseEvents);
}
