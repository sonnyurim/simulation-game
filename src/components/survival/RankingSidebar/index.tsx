"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { getRankingApi } from "@/features/survival/api";
import { DEPARTMENTS } from "@/lib/constants";

import type { RankingEntry } from "@/features/survival/types";

function getDeptIcon(deptId: string): string {
  return DEPARTMENTS.find((d) => d.id === deptId)?.icon ?? "🎓";
}

export function RankingSidebar() {
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

  // Re-fetch when a new result is saved
  useEffect(() => {
    function handleUpdate() {
      fetchData();
    }
    window.addEventListener("ranking-updated", handleUpdate);
    return () => window.removeEventListener("ranking-updated", handleUpdate);
  }, [fetchData]);

  return (
    <div className="hidden w-56 shrink-0 pr-6 lg:block">
      <div className="sticky top-8 pt-8">
        <h3 className="text-sm font-bold text-muted-foreground">
          🏆 TOP 10
        </h3>

        {isLoading ? (
          <p className="mt-3 text-xs text-muted-foreground">불러오는 중...</p>
        ) : entries.length === 0 ? (
          <p className="mt-3 text-xs text-muted-foreground">기록 없음</p>
        ) : (
          <ol className="mt-3 space-y-2">
            {entries.map((entry, index) => (
              <li
                key={`${entry.nickname}-${entry.created_at}`}
                className="flex items-center gap-2 text-xs"
              >
                <span className="w-4 text-center font-mono font-bold text-muted-foreground">
                  {index + 1}
                </span>
                <span className="text-sm">{getDeptIcon(entry.department)}</span>
                <span className="min-w-0 flex-1 truncate font-medium">
                  {entry.nickname}
                </span>
                <span className="font-mono font-bold">{entry.score}</span>
              </li>
            ))}
          </ol>
        )}

        <Link
          href="/ranking"
          className="mt-4 block text-xs text-muted-foreground underline-offset-2 hover:underline"
        >
          전체 랭킹 →
        </Link>
      </div>
    </div>
  );
}
