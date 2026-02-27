"use client";

import Link from "next/link";

import { GAME_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TurnCounterProps {
  readonly turn: number;
}

export function TurnCounter({ turn }: TurnCounterProps) {
  const remaining = GAME_CONFIG.TOTAL_TURNS - turn;
  const isLate = remaining <= 6;

  return (
    <div className="relative">
      <p className="mb-2 text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40">
        지금 우리 학교는
      </p>
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span
          className={cn(
            "text-sm font-bold tabular-nums tracking-widest",
            isLate ? "animate-pulse text-destructive" : "text-muted-foreground/60",
          )}
        >
          {turn}일째
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Link
        href="/ranking"
        className="absolute right-0 top-0 text-xs text-muted-foreground/40 transition-colors hover:text-muted-foreground"
      >
        🏆
      </Link>
    </div>
  );
}
