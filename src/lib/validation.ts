import { DEPARTMENTS, GAME_CONFIG } from "./constants";

import type { EndingType } from "@/types/survival";

const DANGEROUS_PATTERN = /[<>"'&]/g;

const VALID_ENDINGS: readonly string[] = [
  "rescued",
  "perfect_rescue",
  "infected",
  "starvation",
  "alone",
  "breakdown",
] satisfies readonly EndingType[];

const VALID_DEPARTMENT_IDS = DEPARTMENTS.map((d) => d.id);

export function sanitizeNickname(raw: string): string {
  return raw.trim().replace(DANGEROUS_PATTERN, "");
}

export function validateNickname(nickname: string): string | null {
  const cleaned = sanitizeNickname(nickname);
  if (cleaned.length < GAME_CONFIG.NICKNAME_MIN) {
    return `닉네임은 ${GAME_CONFIG.NICKNAME_MIN}자 이상이어야 합니다`;
  }
  if (cleaned.length > GAME_CONFIG.NICKNAME_MAX) {
    return `닉네임은 ${GAME_CONFIG.NICKNAME_MAX}자 이하여야 합니다`;
  }
  return null;
}

// Validate fields submitted to the result API
export function validateResultBody(body: unknown): string | null {
  if (!body || typeof body !== "object") return "잘못된 요청입니다";

  const b = body as Record<string, unknown>;

  // score: 0 ~ max possible
  if (typeof b.score !== "number" || b.score < 0 || b.score > 999) {
    return "점수가 유효하지 않습니다";
  }

  // turnsSurvived: 0 ~ TOTAL_TURNS
  if (
    typeof b.turnsSurvived !== "number" ||
    b.turnsSurvived < 0 ||
    b.turnsSurvived > GAME_CONFIG.TOTAL_TURNS
  ) {
    return "턴 수가 유효하지 않습니다";
  }

  // ending
  if (typeof b.ending !== "string" || !VALID_ENDINGS.includes(b.ending)) {
    return "엔딩 타입이 유효하지 않습니다";
  }

  // department
  if (typeof b.department !== "string" || !VALID_DEPARTMENT_IDS.includes(b.department)) {
    return "학과 정보가 유효하지 않습니다";
  }

  return null;
}
