"use client";

import { Button } from "@/components/ui/button";

interface IntroScreenProps {
  readonly onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-14 px-8 text-center">
      <div className="space-y-4">
        <h1 className="text-7xl font-extrabold tracking-tight text-primary">
          지금 우리 학교는
        </h1>
        <p className="text-3xl font-semibold text-muted-foreground">: 연암</p>
      </div>

      <div className="max-w-xl space-y-7 text-xl text-muted-foreground">
        <p>
          연암공과대학교에 좀비 바이러스가 퍼졌다.
          <br />
          52일간 생존하면 구조대가 도착한다.
        </p>
        <p>
          체력, 식량, 생존자, 멘탈 — 4가지 자원을 관리하며
          <br />
          매 턴 주어지는 선택으로 운명을 결정하라.
        </p>
        <p className="text-2xl font-semibold text-destructive">
          자원이 0%에 도달하면 게임 오버.
        </p>
      </div>

      <Button size="lg" onClick={onStart} className="mt-3 px-16 py-8 text-2xl">
        생존 시작
      </Button>
    </div>
  );
}
