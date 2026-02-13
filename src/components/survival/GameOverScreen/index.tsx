"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { NicknameForm } from "@/components/survival/NicknameForm";

import { saveResultApi } from "@/features/survival/api";
import { ENDINGS, GAME_CONFIG } from "@/lib/constants";
import { calculateScore } from "@/lib/scoring";

import type { EndingType, Resources } from "@/types/survival";

interface GameOverScreenProps {
  readonly ending: EndingType;
  readonly turn: number;
  readonly resources: Resources;
  readonly emergencyUsed: number;
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
  department,
  onRestart,
}: GameOverScreenProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const endingData = ENDINGS[ending];
  const score = calculateScore(turn, resources, emergencyUsed);
  const icon = ENDING_ICONS[ending] ?? "📉";

  async function handleSave(nickname: string) {
    setIsLoading(true);
    const { error } = await saveResultApi({
      nickname,
      department,
      score: score.totalScore,
      turnsSurvived: turn,
      ending,
    });
    setIsLoading(false);
    if (!error) {
      setIsSaved(true);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card p-10 text-center">
        {/* Icon */}
        <div className="text-7xl">{icon}</div>

        {/* Title */}
        <h1 className="mt-5 text-5xl font-extrabold text-destructive">
          {endingData.title}!
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg text-foreground">
          {turn}일차에 쓰러졌습니다. (총 {GAME_CONFIG.TOTAL_TURNS}일 중)
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {endingData.description}
        </p>

        {/* Score */}
        <p className="mt-5 text-sm text-muted-foreground">
          최종 점수: <span className="text-lg font-bold text-foreground">{score.totalScore}점</span>
        </p>

        {/* Nickname form */}
        {!isSaved ? (
          <div className="mt-6 space-y-3">
            <NicknameForm onSubmit={handleSave} isLoading={isLoading} />
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <p className="text-base text-success">기록 저장 완료!</p>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 py-6 text-lg" onClick={onRestart}>
                다시 도전
              </Button>
              <Button variant="secondary" className="flex-1 py-6 text-lg" asChild>
                <a href="/ranking">랭킹 보기</a>
              </Button>
            </div>
          </div>
        )}

        {/* Restart button (before save) */}
        {!isSaved && (
          <Button
            onClick={onRestart}
            className="mt-6 w-full py-6 text-lg bg-warning text-warning-foreground hover:bg-warning/90"
          >
            다시 시작
          </Button>
        )}
      </div>
    </div>
  );
}
