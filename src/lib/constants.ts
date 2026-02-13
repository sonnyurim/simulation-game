import type { Department, Ending, EndingType, ResourceKey } from "@/types/survival";

export const GAME_CONFIG = {
  TOTAL_TURNS: 52,
  INITIAL_RESOURCE: 85,
  MAX_RESOURCE: 100,
  MIN_RESOURCE: 0,
  EMERGENCY_SUPPLY_AMOUNT: 30,
  MAX_EMERGENCY_USES: 3,
  NICKNAME_MIN: 2,
  NICKNAME_MAX: 10,
  FREE_MAJOR_POSITIVE_MULTIPLIER: 0.7,
  DIFFICULTY_SCALE_START: 1.0,
  DIFFICULTY_SCALE_END: 1.15,
  PHASE_EARLY_END: 17,
  PHASE_MID_END: 35,
  RECENT_TAG_LIMIT: 2,
} as const;

export const DEPARTMENTS: readonly Department[] = [
  {
    id: "electrical",
    name: "전기전자공학과",
    icon: "⚡",
    bonusResource: "health",
    description: "전력 복구와 전기 시스템 수리에 강하다",
  },
  {
    id: "mechanical",
    name: "기계공학과",
    icon: "⚙️",
    bonusResource: "health",
    description: "용접·제작으로 바리케이드와 무기를 만든다",
  },
  {
    id: "smart_ee",
    name: "스마트전기전자공학과",
    icon: "📡",
    bonusResource: "mental",
    description: "IoT 센서와 스마트 감시 시스템에 능하다",
  },
  {
    id: "smart_mech",
    name: "스마트기계공학과",
    icon: "🦾",
    bonusResource: "food",
    description: "CNC·3D프린터로 장비 제작과 물류에 강하다",
  },
  {
    id: "smart_sw",
    name: "스마트소프트웨어학과",
    icon: "💻",
    bonusResource: "mental",
    description: "프로그래밍과 AI 시스템 개발에 강하다",
  },
  {
    id: "free_major",
    name: "자유전공학과",
    icon: "🎲",
    bonusResource: "health",
    description: "모든 선택 가능, 양수 효과 0.7배 (하드모드)",
  },
] as const;

export const RESOURCE_LABELS: Record<ResourceKey, string> = {
  health: "체력",
  food: "식량",
  survivors: "생존자",
  mental: "멘탈",
};

export const RESOURCE_ICONS: Record<ResourceKey, string> = {
  health: "🫁",
  food: "🍞",
  survivors: "👥",
  mental: "🧠",
};

export const RESOURCE_COLORS: Record<ResourceKey, string> = {
  health: "bg-red-500",
  food: "bg-amber-500",
  survivors: "bg-blue-500",
  mental: "bg-purple-500",
};

export const ENDINGS: Record<EndingType, Ending> = {
  rescued: {
    type: "rescued",
    title: "구조 완료",
    description: "52일간의 사투 끝에 구조 헬기가 도착했다. 당신은 살아남았다.",
  },
  perfect_rescue: {
    type: "perfect_rescue",
    title: "완벽한 탈출",
    description:
      "모든 자원을 50% 이상 유지한 채 구조대가 도착했다. 전설적인 생존기록이다.",
  },
  infected: {
    type: "infected",
    title: "감염",
    description: "체력이 바닥났다... 당신의 눈이 서서히 붉게 변해간다.",
  },
  starvation: {
    type: "starvation",
    title: "아사",
    description: "더 이상 먹을 것이 없다. 배고픔이 의식을 집어삼킨다.",
  },
  alone: {
    type: "alone",
    title: "고립",
    description: "마지막 생존자마저 떠났다. 혼자서는 버틸 수 없다.",
  },
  breakdown: {
    type: "breakdown",
    title: "정신 붕괴",
    description: "공포가 이성을 삼켰다. 더 이상 판단할 수 없다.",
  },
};
