"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { NicknameForm } from "@/components/survival/NicknameForm";

import { saveResultApi } from "@/features/survival/api";
import { ENDINGS, GAME_CONFIG, RESOURCE_ICONS, RESOURCE_LABELS } from "@/lib/constants";
import { calculateScore } from "@/lib/scoring";

import type { EndingType, Resources, ResourceKey } from "@/types/survival";

interface VictoryScreenProps {
  readonly ending: EndingType;
  readonly turn: number;
  readonly resources: Resources;
  readonly emergencyUsed: number;
  readonly department: string;
  readonly onRestart: () => void;
}

const RESOURCE_KEYS: ResourceKey[] = ["health", "food", "survivors", "mental"];

export function VictoryScreen({
  ending,
  turn,
  resources,
  emergencyUsed,
  department,
  onRestart,
}: VictoryScreenProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const endingData = ENDINGS[ending];
  const score = calculateScore(turn, resources, emergencyUsed);
  const isPerfect = ending === "perfect_rescue";

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
        <div className="text-7xl">{isPerfect ? "🏆" : "🚁"}</div>

        {/* Title */}
        <h1 className={`mt-5 text-5xl font-extrabold ${isPerfect ? "text-warning" : "text-success"}`}>
          {endingData.title}!
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg text-foreground">
          {GAME_CONFIG.TOTAL_TURNS}일간 생존에 성공했습니다!
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {endingData.description}
        </p>

        {/* Score */}
        <p className="mt-5 text-4xl font-extrabold text-warning">
          {score.totalScore}점
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
          <span>턴 {score.turnScore}</span>
          <span>자원 +{score.resourceBonus}</span>
          {isPerfect && <span className="text-warning">완벽 +{score.perfectBonus}</span>}
          {score.emergencyPenalty > 0 && <span className="text-destructive">보급 -{score.emergencyPenalty}</span>}
        </div>

        {/* Final resources */}
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          {RESOURCE_KEYS.map((key) => (
            <span key={key}>
              {RESOURCE_ICONS[key]} {RESOURCE_LABELS[key]} {resources[key]}%
            </span>
          ))}
        </div>

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

        {/* Actions (before save) */}
        {!isSaved && (
          <div className="mt-6 flex gap-4">
            <Button variant="outline" className="flex-1 py-6 text-lg" onClick={onRestart}>
              다시 도전
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
