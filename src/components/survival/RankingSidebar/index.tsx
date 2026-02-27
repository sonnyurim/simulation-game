"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { getRankingApi } from "@/features/survival/api";
import { DEPARTMENTS } from "@/lib/constants";

import type { RankingEntry } from "@/features/survival/types";

function getDeptIcon(deptId: string): string {
  return DEPARTMENTS.find((d) => d.id === deptId)?.icon ?? "🎓";
}

interface RankingSidebarProps {
  readonly card?: boolean;
}

export function RankingSidebar({ card = false }: RankingSidebarProps) {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const { data } = await getRankingApi(10);
    setEntries(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    function handleUpdate() {
      fetchData();
    }
    window.addEventListener("ranking-updated", handleUpdate);
    return () => window.removeEventListener("ranking-updated", handleUpdate);
  }, [fetchData]);

  const list = (
    <>
      {isLoading ? (
        <p className="py-2 font-mono text-[11px] text-muted-foreground/30">
          확인 중...
        </p>
      ) : entries.length === 0 ? (
        <p className="py-2 font-mono text-[11px] text-muted-foreground/30">
          생존자 없음
        </p>
      ) : (
        <ol>
          {entries.map((entry, index) => (
            <li
              key={`${entry.nickname}-${entry.created_at}`}
              className="flex items-baseline gap-1.5 border-b border-border/15 py-2"
            >
              <span
                className={
                  index === 0
                    ? "w-3.5 shrink-0 font-mono text-[10px] font-bold text-destructive/80"
                    : "w-3.5 shrink-0 font-mono text-[10px] text-muted-foreground/45"
                }
              >
                {index + 1}
              </span>
              <span className="shrink-0 text-[11px]">
                {getDeptIcon(entry.department)}
              </span>
              <span
                className={
                  index === 0
                    ? "min-w-0 flex-1 truncate font-mono text-[11px] text-foreground/90"
                    : "min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground/65"
                }
              >
                {entry.nickname}
              </span>
              <span
                className={
                  index === 0
                    ? "shrink-0 font-mono text-[11px] font-semibold text-foreground/80"
                    : "shrink-0 font-mono text-[11px] text-muted-foreground/50"
                }
              >
                {entry.score}
              </span>
            </li>
          ))}
        </ol>
      )}
    </>
  );

  /* ── Card variant (home page) ───────────────────────── */
  if (card) {
    return (
      <div className="border border-border/50 bg-card/80 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
        <div className="mb-3 flex items-center gap-2 border-b border-border/40 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            생존자 명단
          </span>
          <div className="h-px flex-1 bg-border/20" />
        </div>
        <div>{list}</div>
        <Link
          href="/ranking"
          className="mt-3 flex items-center gap-1 font-mono text-[10px] text-muted-foreground/25 transition-colors hover:text-muted-foreground/60"
        >
          <span>→</span>
          <span>전체 기록</span>
        </Link>
      </div>
    );
  }

  /* ── Sidebar variant (survival page) ───────────────── */
  return (
    <div className="hidden w-56 shrink-0 border-l border-border/20 lg:block">
      <div className="sticky top-8 py-8 pr-6 pl-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/40">
            생존 현황
          </span>
          <div className="h-px flex-1 bg-border/20" />
        </div>
        <div>{list}</div>
        <Link
          href="/ranking"
          className="mt-4 flex items-center gap-1.5 font-mono text-xs text-muted-foreground/25 transition-colors hover:text-muted-foreground/60"
        >
          <span>→</span>
          <span>전체 명단</span>
        </Link>
      </div>
    </div>
  );
}
