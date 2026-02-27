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
  Character,
  StyleVariant,
} from "@/types/survival";
import { GAME_CONFIG, DEPARTMENT_SKILLS } from "./constants";

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

// Initial NPC companions — appear at game start
const INITIAL_CHARACTERS: readonly Character[] = [
  { id: "minjun", name: "김민준", role: "기계공학과 3학년 선배", isAlive: true, metAtTurn: 0 },
  { id: "seoyeon", name: "이서연", role: "간호학 복수전공 교환학생", isAlive: true, metAtTurn: 0 },
  { id: "gyungho", name: "박경호", role: "20년 경력 경비원", isAlive: true, metAtTurn: 0 },
];

// --- State creation ---

export function createInitialState(): GameState {
  return {
    screen: "departmentSelect",
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
    skillUsed: 0,
    characters: INITIAL_CHARACTERS,
    history: [],
    flashlightMode: false,
  };
}

// Department select → show broadcast opening story
export function selectDepartment(state: GameState, dept: Department): GameState {
  return {
    ...state,
    screen: "broadcast" as Screen,
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

  // Passive shelter recovery — fortified position keeps the group alive
  newResources.health = clampResource(newResources.health + GAME_CONFIG.SHELTER_HEALTH_REGEN);
  newResources.food = clampResource(newResources.food + GAME_CONFIG.SHELTER_FOOD_REGEN);

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
    flashlightMode:
      event.id === "sp_blackout"
        ? true
        : event.id === "sp_lights_restored"
          ? false
          : state.flashlightMode,
  };
}

// --- Department skill ---

export function applySkill(state: GameState): GameState {
  if (!state.department) return state;

  const skill = DEPARTMENT_SKILLS.find((s) => s.departmentId === state.department!.id);
  if (!skill) return state;
  if (state.skillUsed >= skill.maxUses) return state;

  const resourceKeys: ResourceKey[] = ["health", "food", "survivors", "mental"];
  const newResources = { ...state.resources };
  let resultText = skill.resultText;

  if (skill.isRandom) {
    // Free major: 50/50 big bonus or big penalty
    const isGood = Math.random() >= 0.5;
    const randomEffect = isGood
      ? { health: 20, food: 20, mental: 15, survivors: 10 }
      : { health: -25, food: -20, mental: -25, survivors: -15 };

    for (const key of resourceKeys) {
      const delta = randomEffect[key] ?? 0;
      newResources[key] = clampResource(newResources[key] + delta);
    }

    if (!isGood && skill.resultTextFail) {
      resultText = skill.resultTextFail;
    }
  } else {
    for (const key of resourceKeys) {
      const delta = skill.effect[key] ?? 0;
      newResources[key] = clampResource(newResources[key] + delta);
    }
  }

  return {
    ...state,
    resources: newResources,
    skillUsed: state.skillUsed + 1,
    lastChoiceResult: resultText,
    currentEvent: null, // Clear current event to show result
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

// --- Style variant (for ending description personalisation) ---

export function getStyleVariant(
  skillUsed: number,
  resources: Resources,
  isVictory: boolean,
): StyleVariant {
  if (skillUsed >= 3) return "skill_max";
  if (skillUsed === 0) return "skill_none";

  if (isVictory) {
    const entries = Object.entries(resources) as [ResourceKey, number][];
    const [lowestKey, lowestVal] = entries.reduce((min, curr) =>
      curr[1] < min[1] ? curr : min,
    );
    if (lowestVal < 45) return `${lowestKey}_low` as StyleVariant;
  }

  return "default";
}

// --- Game over / victory check ---

export function checkGameEnd(state: GameState): EndingType | null {
  if (state.resources.health <= 0) return "infected";
  if (state.resources.food <= 0) return "starvation";
  if (state.resources.survivors <= 0) return "alone";
  if (state.resources.mental <= 0) return "breakdown";

  if (state.turn >= GAME_CONFIG.TOTAL_TURNS) {
    const values = Object.values(state.resources) as number[];
    const allPerfect = values.every((v) => v > GAME_CONFIG.PERFECT_RESCUE_THRESHOLD);
    const allSafe = values.every((v) => v > GAME_CONFIG.NARROW_ESCAPE_THRESHOLD);

    if (allPerfect) return "perfect_rescue";
    if (allSafe) return "rescued";
    return "narrow_escape";
  }

  return null;
}

export function transitionToEnd(state: GameState, ending: EndingType): GameState {
  const victoryEndings: EndingType[] = ["rescued", "perfect_rescue", "narrow_escape"];
  const screen: Screen = victoryEndings.includes(ending) ? "victory" : "gameOver";
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
