import type {
  GameState,
  Resources,
  ResourceKey,
  Department,
  Screen,
  Choice,
  GameEvent,
  EndingType,
  TurnRecord,
} from "@/types/survival";
import { GAME_CONFIG } from "./constants";

// --- Pure helper functions ---

function clampResource(value: number): number {
  return Math.max(GAME_CONFIG.MIN_RESOURCE, Math.min(GAME_CONFIG.MAX_RESOURCE, value));
}

function getDifficultyMultiplier(turn: number): number {
  const progress = turn / GAME_CONFIG.TOTAL_TURNS;
  return (
    GAME_CONFIG.DIFFICULTY_SCALE_START +
    progress * (GAME_CONFIG.DIFFICULTY_SCALE_END - GAME_CONFIG.DIFFICULTY_SCALE_START)
  );
}

function scaleNegativeEffect(value: number, multiplier: number): number {
  if (value >= 0) return value;
  return Math.round(value * multiplier);
}

// --- State creation ---

export function createInitialState(): GameState {
  return {
    screen: "intro",
    department: null,
    turn: 0,
    resources: {
      health: GAME_CONFIG.INITIAL_RESOURCE,
      food: GAME_CONFIG.INITIAL_RESOURCE,
      survivors: GAME_CONFIG.INITIAL_RESOURCE,
      mental: GAME_CONFIG.INITIAL_RESOURCE,
    },
    currentEvent: null,
    lastChoiceResult: null,
    usedEventIds: [],
    recentTags: [],
    emergencyUsed: 0,
    history: [],
  };
}

export function selectDepartment(state: GameState, dept: Department): GameState {
  return {
    ...state,
    screen: "playing" as Screen,
    department: dept,
  };
}

// --- Resource calculation ---

export function applyChoice(
  state: GameState,
  event: GameEvent,
  choice: Choice,
): GameState {
  const difficultyMult = getDifficultyMultiplier(state.turn);
  const isFreeMajor = state.department?.id === "free_major";

  const resourceKeys: ResourceKey[] = ["health", "food", "survivors", "mental"];
  const newResources = { ...state.resources };

  for (const key of resourceKeys) {
    const base = choice.effect[key] ?? 0;
    // Scale negative effects by difficulty
    const scaled = scaleNegativeEffect(base, difficultyMult);
    // Free major: positive effects are 0.7x
    const adjusted =
      isFreeMajor && scaled > 0
        ? Math.round(scaled * GAME_CONFIG.FREE_MAJOR_POSITIVE_MULTIPLIER)
        : scaled;

    newResources[key] = clampResource(newResources[key] + adjusted);
  }

  // Apply department bonus if choice has one matching the player's department
  if (
    choice.departmentBonus &&
    state.department &&
    choice.departmentBonus.departmentId === state.department.id
  ) {
    for (const key of resourceKeys) {
      const bonus = choice.departmentBonus.extraEffect[key] ?? 0;
      newResources[key] = clampResource(newResources[key] + bonus);
    }
  }

  const newTurn = state.turn + 1;
  const turnRecord: TurnRecord = {
    turn: newTurn,
    eventId: event.id,
    choiceId: choice.id,
  };

  return {
    ...state,
    turn: newTurn,
    resources: newResources,
    currentEvent: null,
    lastChoiceResult: choice.resultText,
    usedEventIds: [...state.usedEventIds, event.id],
    recentTags: [event.tag, ...state.recentTags].slice(0, GAME_CONFIG.RECENT_TAG_LIMIT),
    history: [...state.history, turnRecord],
  };
}

// --- Emergency supply ---

export function applyEmergencySupply(state: GameState): GameState {
  if (state.emergencyUsed >= GAME_CONFIG.MAX_EMERGENCY_USES) return state;

  const resourceKeys: ResourceKey[] = ["health", "food", "survivors", "mental"];
  const lowestKey = resourceKeys.reduce((lowest, key) =>
    state.resources[key] < state.resources[lowest] ? key : lowest,
  );

  const newResources: Resources = {
    ...state.resources,
    [lowestKey]: clampResource(
      state.resources[lowestKey] + GAME_CONFIG.EMERGENCY_SUPPLY_AMOUNT,
    ),
  };

  return {
    ...state,
    resources: newResources,
    emergencyUsed: state.emergencyUsed + 1,
  };
}

// --- Game over / victory check ---

export function checkGameEnd(state: GameState): EndingType | null {
  if (state.resources.health <= 0) return "infected";
  if (state.resources.food <= 0) return "starvation";
  if (state.resources.survivors <= 0) return "alone";
  if (state.resources.mental <= 0) return "breakdown";

  if (state.turn >= GAME_CONFIG.TOTAL_TURNS) {
    const allAbove50 = (Object.values(state.resources) as number[]).every(
      (v) => v > 50,
    );
    return allAbove50 ? "perfect_rescue" : "rescued";
  }

  return null;
}

export function transitionToEnd(state: GameState, ending: EndingType): GameState {
  const screen: Screen = ending === "rescued" || ending === "perfect_rescue"
    ? "victory"
    : "gameOver";
  return { ...state, screen };
}

// --- Set current event ---

export function setCurrentEvent(state: GameState, event: GameEvent): GameState {
  return { ...state, currentEvent: event, lastChoiceResult: null };
}

// --- Session storage ---

const STORAGE_KEY = "survival_game_state";

export function saveToSession(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export function loadFromSession(): GameState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}
