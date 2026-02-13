import Link from "next/link";

import { Button } from "@/components/ui/button";

import { RankingSidebar } from "@/components/survival/RankingSidebar";

export default function Home() {
  return (
    <div className="flex min-h-dvh">
      {/* Left spacer */}
      <div className="hidden w-56 shrink-0 lg:block" />

    <div className="relative flex min-h-dvh flex-1 flex-col items-center justify-center overflow-hidden px-8 text-center">
      {/* Background glow effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-destructive/10 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 h-60 w-60 rounded-full bg-warning/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Zombie icons row */}
        <div className="flex items-center gap-6 text-5xl">
          <span className="animate-float opacity-60">🧟</span>
          <span className="animate-float-delay opacity-40">🧟‍♂️</span>
          <span className="animate-float opacity-60">🧟‍♀️</span>
        </div>

        {/* Hero title */}
        <div className="space-y-3">
          <h1 className="animate-flicker text-7xl font-extrabold tracking-tight text-primary drop-shadow-[0_0_30px_rgba(200,50,50,0.3)]">
            지금 우리 학교는
          </h1>
          <p className="text-3xl font-semibold text-muted-foreground">
            : 연암공과대학교
          </p>
        </div>

        {/* Story card */}
        <div className="w-full max-w-xl space-y-6 rounded-2xl border border-border/60 bg-card/60 p-8 backdrop-blur-sm">
          <p className="text-xl leading-relaxed text-muted-foreground">
            연암공과대학교에 좀비 바이러스가 퍼졌다.
          </p>
          <div className="mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-destructive/40 to-transparent" />
          <p className="text-2xl font-bold text-foreground">
            <span className="text-primary">52일</span>간 생존하면
            <br />
            구조대가 도착한다.
          </p>
          <div className="mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-destructive/40 to-transparent" />

          {/* Resource icons with labels */}
          <div className="flex justify-center gap-8 text-base text-muted-foreground">
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl">🫁</span>
              <span>체력</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl">🍞</span>
              <span>식량</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl">👥</span>
              <span>생존자</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl">🧠</span>
              <span>멘탈</span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground">
            4가지 자원을 관리하며 매 턴 선택으로 운명을 결정하라.
          </p>
          <p className="animate-pulse-glow text-xl font-bold text-destructive">
            ⚠️ 자원이 0%에 도달하면 게임 오버
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            className="px-20 py-8 text-2xl shadow-[0_0_30px_rgba(200,50,50,0.2)] transition-shadow hover:shadow-[0_0_40px_rgba(200,50,50,0.4)]"
            asChild
          >
            <Link href="/survival">🎮 생존 시작</Link>
          </Button>
          <Button
            variant="ghost"
            className="text-lg text-muted-foreground"
            asChild
          >
            <Link href="/ranking">🏆 명예의 전당</Link>
          </Button>
        </div>
      </div>
    </div>

      <RankingSidebar />
    </div>
  );
}
