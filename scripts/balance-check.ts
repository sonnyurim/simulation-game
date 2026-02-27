/**
 * Balance analysis — calculates average per-choice resource effects across all events.
 * Usage: tsx --tsconfig tsconfig.json scripts/balance-check.ts
 */

import type { GameEvent, ResourceKey } from "../src/types/survival";
import { EVENTS, SPECIAL_EVENTS } from "../src/lib/events";
import { GAME_CONFIG } from "../src/lib/constants";

const KEYS: ResourceKey[] = ["health", "food", "survivors", "mental"];

function avg(nums: number[]) {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function analyze(events: readonly GameEvent[], label: string) {
  const allDeltas: Record<ResourceKey, number[]> = {
    health: [], food: [], survivors: [], mental: [],
  };

  for (const event of events) {
    for (const choice of event.choices) {
      for (const key of KEYS) {
        const base = choice.effect[key] ?? 0;
        // apply mid-game difficulty multiplier (~1.1) to negative effects
        const scaled = base < 0 ? Math.round(base * 1.1) : base;
        allDeltas[key].push(scaled);
      }
    }
  }

  console.log(`\n[${label}] — ${events.length}개 이벤트`);
  for (const key of KEYS) {
    const vals = allDeltas[key];
    const positive = vals.filter((v) => v > 0);
    const negative = vals.filter((v) => v < 0);
    const zero = vals.filter((v) => v === 0);
    console.log(
      `  ${key.padEnd(10)}  평균: ${avg(vals).toFixed(1).padStart(5)}`
      + `  양수: ${String(positive.length).padStart(3)} (avg ${avg(positive).toFixed(1)})`
      + `  음수: ${String(negative.length).padStart(3)} (avg ${avg(negative).toFixed(1)})`
      + `  0: ${zero.length}`
    );
  }
}

// Per-phase analysis
for (const phase of ["early", "mid", "late"] as const) {
  const phaseEvents = EVENTS.filter((e) => e.phase === phase);
  analyze(phaseEvents, `${phase.toUpperCase()} Phase`);
}

analyze(SPECIAL_EVENTS, "SPECIAL Events");

// Net health per 18 turns (rough estimate)
console.log(`\n${"─".repeat(60)}`);
console.log("📊 18턴 기준 순 체력 변화 추정 (선택 랜덤, 학과 보너스 미포함)");
console.log(`${"─".repeat(60)}`);

const earlyEvents = EVENTS.filter((e) => e.phase === "early");
const midEvents   = EVENTS.filter((e) => e.phase === "mid");
const lateEvents  = EVENTS.filter((e) => e.phase === "late");

function phaseAvg(events: readonly GameEvent[], key: ResourceKey) {
  const vals = events.flatMap((e) =>
    e.choices.map((c) => {
      const base = c.effect[key] ?? 0;
      return base < 0 ? Math.round(base * 1.1) : base;
    })
  );
  return avg(vals);
}

// 6 turns each phase
const earlyH = phaseAvg(earlyEvents, "health") * 6;
const midH   = phaseAvg(midEvents, "health") * 6;
const lateH  = phaseAvg(lateEvents, "health") * 6;
const totalH = earlyH + midH + lateH;

const earlyF = phaseAvg(earlyEvents, "food") * 6;
const midF   = phaseAvg(midEvents, "food") * 6;
const lateF  = phaseAvg(lateEvents, "food") * 6;
const totalF = earlyF + midF + lateF;

const earlyM = phaseAvg(earlyEvents, "mental") * 6;
const midM   = phaseAvg(midEvents, "mental") * 6;
const lateM  = phaseAvg(lateEvents, "mental") * 6;
const totalM = earlyM + midM + lateM;

console.log(`  체력  Early${String(earlyH.toFixed(0)).padStart(5)}  Mid${String(midH.toFixed(0)).padStart(5)}  Late${String(lateH.toFixed(0)).padStart(5)}  → 합계 ${totalH.toFixed(0)}  (시작 70 → 예상 ${(70 + totalH).toFixed(0)})`);
console.log(`  식량  Early${String(earlyF.toFixed(0)).padStart(5)}  Mid${String(midF.toFixed(0)).padStart(5)}  Late${String(lateF.toFixed(0)).padStart(5)}  → 합계 ${totalF.toFixed(0)}  (시작 70 → 예상 ${(70 + totalF).toFixed(0)})`);
console.log(`  멘탈  Early${String(earlyM.toFixed(0)).padStart(5)}  Mid${String(midM.toFixed(0)).padStart(5)}  Late${String(lateM.toFixed(0)).padStart(5)}  → 합계 ${totalM.toFixed(0)}  (시작 70 → 예상 ${(70 + totalM).toFixed(0)})`);
console.log();
console.log(`  ⚠️  체력 순감소가 ${Math.abs(totalH).toFixed(0)} → 70에서 시작해 18턴이면 ${Math.max(0, 70 + totalH).toFixed(0)} 예상`);
console.log(`     (0 이하면 거의 무조건 감염 사망)`);
console.log(`${"-".repeat(60)}`);
console.log(`  목표 클리어 조건: 전 자원 40 초과 유지`);
console.log(`  현재 밸런스: 체력은 거의 확실히 고갈됨`);
