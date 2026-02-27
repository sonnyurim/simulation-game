// --- Resource types ---

export type ResourceKey = "health" | "food" | "survivors" | "mental";

export type Resources = Record<ResourceKey, number>;

// --- Department ---

export interface Department {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly bonusResource: ResourceKey;
  readonly description: string;
}

// --- Department Skill ---

export interface DepartmentSkill {
  readonly departmentId: string;
  readonly name: string;
  readonly icon: string;
  readonly description: string;
  readonly maxUses: number;
  readonly effect: ResourceEffect;
  readonly resultText: string;
  readonly resultTextFail?: string; // For isRandom: bad outcome text
  readonly isRandom?: boolean;
}

// --- Character (NPC) ---

export interface Character {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly isAlive: boolean;
  readonly metAtTurn: number;
}

// --- Events ---

export type Phase = "early" | "mid" | "late";

export type EventTag =
  | "combat"
  | "scavenge"
  | "social"
  | "medical"
  | "explore"
  | "craft"
  | "defense"
  | "morale";

export interface ResourceEffect {
  readonly health?: number;
  readonly food?: number;
  readonly survivors?: number;
  readonly mental?: number;
}

export interface Choice {
  readonly id: string;
  readonly text: string;
  readonly effect: ResourceEffect;
  readonly departmentBonus?: {
    readonly departmentId: string;
    readonly extraEffect: ResourceEffect;
  };
  readonly resultText: string;
}

export interface GameEvent {
  readonly id: string;
  readonly phase: Phase;
  readonly tag: EventTag;
  readonly location: string;
  readonly title: string;
  readonly description: string;
  readonly choices: readonly Choice[];
  readonly isSpecial?: boolean;
  readonly starterDepartmentId?: string; // Fixed first event for this department
  readonly resourceCondition?: {
    readonly resource: ResourceKey;
    readonly below: number;
  };
}

// --- Game State ---

export type Screen =
  | "broadcast"
  | "departmentSelect"
  | "intro"
  | "playing"
  | "gameOver"
  | "victory";

export interface TurnRecord {
  readonly turn: number;
  readonly eventId: string;
  readonly choiceId: string;
}

export interface GameState {
  readonly screen: Screen;
  readonly department: Department | null;
  readonly turn: number;
  readonly resources: Resources;
  readonly currentEvent: GameEvent | null;
  readonly lastChoiceResult: string | null;
  readonly usedEventIds: readonly string[];
  readonly recentTags: readonly EventTag[];
  readonly emergencyUsed: number;
  readonly skillUsed: number;
  readonly characters: readonly Character[];
  readonly history: readonly TurnRecord[];
  readonly flashlightMode: boolean;
}

// --- Scoring ---

export interface ScoreBreakdown {
  readonly turnScore: number;
  readonly resourceBonus: number;
  readonly perfectBonus: number;
  readonly emergencyPenalty: number;
  readonly totalScore: number;
}

// --- Ending ---

export type EndingType =
  | "rescued"
  | "perfect_rescue"
  | "narrow_escape"
  | "infected"
  | "starvation"
  | "alone"
  | "breakdown";

export type StyleVariant =
  | "skill_max"
  | "skill_none"
  | "food_low"
  | "mental_low"
  | "survivors_low"
  | "health_low"
  | "default";

export interface Ending {
  readonly type: EndingType;
  readonly title: string;
  readonly description: string;
  readonly styleSuffixes?: Partial<Record<StyleVariant, string>>;
}

// API types are in features/survival/types.ts
