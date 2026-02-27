"use client";

import { useState, useEffect, useMemo } from "react";

import { cn } from "@/lib/utils";

interface BroadcastScreenProps {
  readonly onComplete: () => void;
}

const BROADCAST_LINES = [
  "[교내 방송 시스템 — 긴급 공지]",
  "삐— 삐— 삐—",
  "여기는 군 제3야전공병단 방재본부입니다.",
  "20XX년 4월. 연암공과대학교 캠퍼스 전역에 정체불명의 감염 사태가 확인되었습니다.",
  "2시간 만에 전 구역으로 확산. 캠퍼스는 완전 격리 구역으로 지정됩니다.",
  "도로 전면 봉쇄. 외부 통신 제한.",
  "구조 작전은 안전 지대 확보 완료 후 즉시 개시됩니다.",
  "예상 기한 — 30일.",
  "그때까지 버티십시오.",
  "[방송 종료]",
];

const LINE_INTERVAL_MS = 750;

export function BroadcastScreen({ onComplete }: BroadcastScreenProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const isComplete = useMemo(
    () => visibleCount >= BROADCAST_LINES.length,
    [visibleCount],
  );

  useEffect(() => {
    if (visibleCount >= BROADCAST_LINES.length) return;
    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, LINE_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  function handleSkip() {
    setVisibleCount(BROADCAST_LINES.length);
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-lg">
        {/* Broadcast header */}
        <div className="mb-8 flex items-center gap-2">
          <span className="animate-pulse font-mono text-[10px] text-destructive/70">●</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
            Emergency Broadcast
          </span>
        </div>

        {/* Lines */}
        <div className="min-h-[280px] space-y-3">
          {BROADCAST_LINES.slice(0, visibleCount).map((line, i) => (
            <p
              key={i}
              className={cn(
                "font-mono text-sm leading-relaxed transition-opacity duration-700",
                line.startsWith("[")
                  ? "text-destructive/70"
                  : line === "삐— 삐— 삐—"
                    ? "text-muted-foreground/40"
                    : line === "그때까지 버티십시오."
                      ? "font-semibold text-foreground"
                      : i === visibleCount - 1
                        ? "text-foreground/90"
                        : "text-foreground/60",
              )}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-10 flex items-center justify-between border-t border-border/30 pt-6">
          {!isComplete ? (
            <button
              onClick={handleSkip}
              className="font-mono text-[11px] text-muted-foreground/30 transition-colors hover:text-muted-foreground/60"
            >
              건너뛰기
            </button>
          ) : (
            <span />
          )}

          {isComplete && (
            <button
              onClick={onComplete}
              className="group flex items-center gap-3 py-1 transition-colors"
            >
              <span className="font-mono text-xs text-muted-foreground/50 transition-colors group-hover:text-foreground">
                →
              </span>
              <span className="font-mono text-sm text-foreground/85 transition-colors group-hover:text-foreground">
                시작
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
