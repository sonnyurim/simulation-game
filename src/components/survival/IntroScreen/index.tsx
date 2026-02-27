"use client";

import { useState, useEffect, useMemo } from "react";

import { Button } from "@/components/ui/button";

import { DEPARTMENT_INTROS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import type { Department } from "@/types/survival";

interface IntroScreenProps {
  readonly department: Department;
  readonly onStart: () => void;
}

const TEXT_INTERVAL_MS = 700;

export function IntroScreen({ department, onStart }: IntroScreenProps) {
  const lines = DEPARTMENT_INTROS[department.id] ?? [];
  const [visibleCount, setVisibleCount] = useState(0);
  const isComplete = useMemo(() => visibleCount >= lines.length, [visibleCount, lines.length]);

  useEffect(() => {
    if (visibleCount >= lines.length) return;

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, TEXT_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [visibleCount, lines.length]);

  function handleSkip() {
    setVisibleCount(lines.length);
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-lg space-y-8">
        {/* Department badge */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">{department.icon}</span>
          <span className="text-sm font-medium text-muted-foreground">{department.name}</span>
        </div>

        {/* Narrative text */}
        <div className="space-y-4 min-h-[180px]">
          {lines.slice(0, visibleCount).map((line, i) => (
            <p
              key={i}
              className={cn(
                "text-base leading-relaxed text-foreground transition-opacity duration-700",
                i === visibleCount - 1 ? "opacity-100" : "opacity-60",
              )}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {!isComplete ? (
            <button
              onClick={handleSkip}
              className="text-xs text-muted-foreground underline-offset-2 hover:underline"
            >
              건너뛰기
            </button>
          ) : (
            <span />
          )}

          {isComplete && (
            <Button variant="cta" size="game-md" onClick={onStart}>
              생존 시작 →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
