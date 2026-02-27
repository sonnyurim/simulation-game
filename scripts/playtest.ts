/**
 * Playtest simulation — runs N full games and prints detailed stats.
 * Usage: tsx --tsconfig tsconfig.json scripts/playtest.ts
 */

import type { GameState, Choice, Department, EndingType, ResourceKey } from "../src/types/survival";
import { DEPARTMENTS, GAME_CONFIG, ENDINGS } from "../src/lib/constants";
import {
  createInitialState,
  selectDepartment,
  applyChoice,
  checkGameEnd,
  transitionToEnd,
  setCurrentEvent,
} from "../src/lib/game-logic";
import { selectEvent } from "../src/lib/event-engine";

// ── helpers ──────────────────────────────────────────────────────────────────

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function bar(value: number, max = 100, width = 15): string {
  const clamped = Math.max(0, Math.min(max, value));
  const filled = Math.round((clamped / max) * width);
  const empty = width - filled;
  return "[" + "█".repeat(filled) + "░".repeat(empty) + "]";
}

function resourceLine(r: GameState["resources"]): string {
  return [
    `체력${bar(r.health)} ${String(r.health).padStart(3)}`,
    `식량${bar(r.food)} ${String(r.food).padStart(3)}`,
    `생존자${bar(r.survivors)} ${String(r.survivors).padStart(3)}`,
    `멘탈${bar(r.mental)} ${String(r.mental).padStart(3)}`,
  ].join("  ");
}

// ── single game simulation ───────────────────────────────────────────────────

function simulateGame(dept: Department, verbose: boolean): {
  ending: EndingType;
  turns: number;
  finalResources: GameState["resources"];
  deathReason: string;
} {
  let state: GameState = createInitialState();
  state = selectDepartment(state, dept);

  let ending: EndingType | null = null;

  if (verbose) {
    console.log(`\n${"═".repeat(78)}`);
    console.log(`학과: ${dept.icon} ${dept.name}  (보너스 자원: ${dept.bonusResource})`);
    console.log(`${"═".repeat(78)}`);
  }

  while (!ending) {
    const event = selectEvent(state);
    state = setCurrentEvent(state, event);
    const choice = pickRandom(event.choices) as Choice;

    const before = { ...state.resources };
    state = applyChoice(state, event, choice);
    const after = state.resources;

    const turn = state.turn;
    const deltas = (["health", "food", "survivors", "mental"] as const)
      .map((k) => {
        const d = after[k] - before[k];
        return d !== 0 ? `${k} ${d > 0 ? "+" : ""}${d}` : null;
      })
      .filter(Boolean)
      .join(", ");

    if (verbose) {
      const phase = event.phase.toUpperCase();
      const special = event.isSpecial ? "⚠️ SPECIAL: " : "";
      console.log(`\n── 턴 ${String(turn).padStart(2)} [${phase}] ${"─".repeat(50)}`);
      console.log(`📍 ${event.location}  ›  ${special}${event.title}`);
      const desc = event.description.length > 85
        ? event.description.slice(0, 85) + "…"
        : event.description;
      console.log(`   ${desc}`);
      console.log(`▶  [${event.tag}] "${choice.text}"`);
      const res = choice.resultText.length > 90
        ? choice.resultText.slice(0, 90) + "…"
        : choice.resultText;
      console.log(`   💬 ${res}`);
      console.log(`   변화: ${deltas || "없음"}`);
      console.log(`   ${resourceLine(after)}`);
    }

    ending = checkGameEnd(state);
    if (ending) {
      state = transitionToEnd(state, ending);
    }
  }

  // figure out death cause
  const r = state.resources;
  let deathReason = "";
  if (ending === "infected") deathReason = "체력 소진";
  else if (ending === "starvation") deathReason = "식량 소진";
  else if (ending === "alone") deathReason = "생존자 전멸";
  else if (ending === "breakdown") deathReason = "멘탈 붕괴";
  else deathReason = "—";

  if (verbose) {
    const info = ENDINGS[ending];
    console.log(`\n${"━".repeat(78)}`);
    console.log(`🏁 ENDING: ${info.title}  (${ending})  — ${state.turn}턴 완료`);
    console.log(`   ${info.description}`);
    console.log(`   최종: ${resourceLine(r)}`);
    console.log(`${"━".repeat(78)}`);
  }

  return { ending, turns: state.turn, finalResources: state.resources, deathReason };
}

// ── main ─────────────────────────────────────────────────────────────────────

const VERBOSE_RUNS = 1;   // full per-turn log
const SILENT_RUNS  = 49;  // stats only
const TOTAL        = VERBOSE_RUNS + SILENT_RUNS;

type Stats = {
  count: number;
  totalTurns: number;
  byEnding: Partial<Record<EndingType, number>>;
  byDept: Record<string, { wins: number; losses: number }>;
  healthDeaths: number;
  foodDeaths: number;
  survivorDeaths: number;
  mentalDeaths: number;
};

const stats: Stats = {
  count: 0,
  totalTurns: 0,
  byEnding: {},
  byDept: {},
  healthDeaths: 0,
  foodDeaths: 0,
  survivorDeaths: 0,
  mentalDeaths: 0,
};

for (let i = 0; i < TOTAL; i++) {
  const dept = pickRandom(DEPARTMENTS);
  const verbose = i < VERBOSE_RUNS;
  const result = simulateGame(dept, verbose);

  stats.count++;
  stats.totalTurns += result.turns;
  stats.byEnding[result.ending] = (stats.byEnding[result.ending] ?? 0) + 1;

  const dk = dept.id;
  if (!stats.byDept[dk]) stats.byDept[dk] = { wins: 0, losses: 0 };
  const victories: EndingType[] = ["perfect_rescue", "rescued", "narrow_escape"];
  if (victories.includes(result.ending)) {
    stats.byDept[dk].wins++;
  } else {
    stats.byDept[dk].losses++;
    if (result.ending === "infected")   stats.healthDeaths++;
    if (result.ending === "starvation") stats.foodDeaths++;
    if (result.ending === "alone")      stats.survivorDeaths++;
    if (result.ending === "breakdown")  stats.mentalDeaths++;
  }
}

// ── print summary ─────────────────────────────────────────────────────────────

const victories: EndingType[] = ["perfect_rescue", "rescued", "narrow_escape"];
const totalWins = victories.reduce((s, e) => s + (stats.byEnding[e] ?? 0), 0);
const totalLoss = TOTAL - totalWins;
const winRate = ((totalWins / TOTAL) * 100).toFixed(1);
const avgTurns = (stats.totalTurns / TOTAL).toFixed(1);

console.log(`\n${"═".repeat(60)}`);
console.log(`📊 플레이테스트 결과  (${TOTAL}게임)`);
console.log(`${"═".repeat(60)}`);
console.log(`승률: ${winRate}%  (${totalWins}승 / ${totalLoss}패)`);
console.log(`평균 생존 턴: ${avgTurns}`);

console.log(`\n[엔딩 분포]`);
const allEndings: EndingType[] = [
  "perfect_rescue", "rescued", "narrow_escape",
  "infected", "starvation", "alone", "breakdown",
];
for (const e of allEndings) {
  const n = stats.byEnding[e] ?? 0;
  if (n === 0) continue;
  const pct = ((n / TOTAL) * 100).toFixed(1);
  const icon = victories.includes(e) ? "🏆" : "💀";
  console.log(`  ${icon} ${ENDINGS[e].title.padEnd(14)} ${String(n).padStart(3)}회  (${pct}%)`);
}

console.log(`\n[사망 원인]`);
if (totalLoss > 0) {
  const causes = [
    { label: "체력(감염)", n: stats.healthDeaths },
    { label: "식량(아사)", n: stats.foodDeaths },
    { label: "생존자(고립)", n: stats.survivorDeaths },
    { label: "멘탈(붕괴)", n: stats.mentalDeaths },
  ];
  for (const c of causes) {
    const pct = ((c.n / totalLoss) * 100).toFixed(1);
    const bar2 = "█".repeat(Math.round((c.n / totalLoss) * 20));
    console.log(`  ${c.label.padEnd(12)} ${String(c.n).padStart(3)}회  ${bar2} ${pct}%`);
  }
}

console.log(`\n[학과별 성과]`);
for (const dept of DEPARTMENTS) {
  const d = stats.byDept[dept.id];
  if (!d) continue;
  const total = d.wins + d.losses;
  const wr = total > 0 ? ((d.wins / total) * 100).toFixed(0) : "—";
  console.log(`  ${dept.icon} ${dept.name.padEnd(16)} ${String(total).padStart(2)}게임  ${d.wins}승 ${d.losses}패  승률 ${wr}%`);
}

console.log(`${"═".repeat(60)}\n`);
