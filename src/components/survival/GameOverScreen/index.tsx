"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { saveResultApi } from "@/features/survival/api";
import { ENDINGS, GAME_CONFIG } from "@/lib/constants";
import { clearSession } from "@/lib/game-logic";
import { getStyleVariant } from "@/lib/game-logic";
import { calculateScore } from "@/lib/scoring";

import type { EndingType, Resources } from "@/types/survival";

interface GameOverScreenProps {
  readonly ending: EndingType;
  readonly turn: number;
  readonly resources: Resources;
  readonly emergencyUsed: number;
  readonly skillUsed: number;
  readonly department: string;
  readonly onRestart: () => void;
}

const ENDING_ICONS: Partial<Record<EndingType, string>> = {
  infected: "🧟",
  starvation: "💀",
  alone: "🚶",
  breakdown: "😵",
};

export function GameOverScreen({
  ending,
  turn,
  resources,
  emergencyUsed,
  skillUsed,
  department,
  onRestart,
}: GameOverScreenProps) {
  const router = useRouter();
  const endingData = ENDINGS[ending];
  const score = calculateScore(turn, resources, emergencyUsed);
  const icon = ENDING_ICONS[ending] ?? "📉";
  const styleVariant = getStyleVariant(skillUsed, resources, false);
  const styleSuffix = endingData.styleSuffixes?.[styleVariant];

  useEffect(() => {
    const nickname = sessionStorage.getItem("game-nickname") ?? "익명";
    saveResultApi({
      nickname,
      department,
      score: score.totalScore,
      turnsSurvived: turn,
      ending,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-10">
      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, oklch(0.05 0.01 15 / 0.92) 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center text-7xl">{icon}</div>

        <h1
          className="mt-6 text-center text-4xl font-extrabold text-destructive"
          style={{ textShadow: "0 0 24px oklch(0.45 0.25 25 / 0.55)" }}
        >
          {endingData.title}
        </h1>

        <p className="mt-4 text-center font-mono text-sm text-muted-foreground">
          {turn}일차에 쓰러졌습니다 — {GAME_CONFIG.TOTAL_TURNS}일 중
        </p>

        <p className="mt-3 text-center text-sm text-foreground/70">
          {endingData.description}
        </p>
        {styleSuffix && (
          <p className="mt-2 text-center text-xs italic text-muted-foreground/40">
            {styleSuffix}
          </p>
        )}

        <div className="mt-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40">
            최종 점수
          </p>
          <p className="mt-1 font-mono text-5xl font-bold text-foreground">
            {score.totalScore}
          </p>
        </div>

        <div className="mt-10 flex gap-3 border-t border-border/30 pt-6">
          <button
            onClick={() => router.push("/ranking")}
            className="group flex flex-1 items-center justify-center gap-2 py-2 transition-colors"
          >
            <span className="font-mono text-xs text-muted-foreground/40 transition-colors group-hover:text-muted-foreground">
              →
            </span>
            <span className="font-mono text-sm text-foreground/70 transition-colors group-hover:text-foreground">
              생존자 명단
            </span>
          </button>
          <div className="w-px bg-border/30" />
          <button
            onClick={() => { clearSession(); router.push("/"); }}
            className="group flex flex-1 items-center justify-center gap-2 py-2 transition-colors"
          >
            <span className="font-mono text-xs text-muted-foreground/40 transition-colors group-hover:text-destructive">
              →
            </span>
            <span className="font-mono text-sm text-foreground/70 transition-colors group-hover:text-foreground">
              다시 시작
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
