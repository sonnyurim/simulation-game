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
  readonly resourceCondition?: {
    readonly resource: ResourceKey;
    readonly below: number;
  };
}

// --- Game State ---

export type Screen =
  | "departmentSelect"
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
  readonly history: readonly TurnRecord[];
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
  | "infected"
  | "starvation"
  | "alone"
  | "breakdown";

export interface Ending {
  readonly type: EndingType;
  readonly title: string;
  readonly description: string;
}

// API types are in features/survival/types.ts
