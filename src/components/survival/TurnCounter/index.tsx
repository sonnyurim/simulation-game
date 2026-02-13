"use client";

import Link from "next/link";

import { GAME_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TurnCounterProps {
  readonly turn: number;
}

export function TurnCounter({ turn }: TurnCounterProps) {
  const remaining = GAME_CONFIG.TOTAL_TURNS - turn;
  const isLate = remaining <= 10;

  return (
    <div className="relative flex flex-col items-center gap-2">
      <h1 className="text-5xl font-extrabold tracking-tight text-primary">
        지금 우리 학교는
      </h1>
      <p
        className={cn(
          "text-xl font-bold",
          isLate ? "text-destructive animate-pulse" : "text-warning",
        )}
      >
        {turn}일차 / {GAME_CONFIG.TOTAL_TURNS}일
      </p>

      <Link
        href="/ranking"
        className="absolute right-0 top-2 flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        🏆 명예의 전당
      </Link>
    </div>
  );
}
