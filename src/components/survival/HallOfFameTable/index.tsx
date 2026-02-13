"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";

import { getRankingApi } from "@/features/survival/api";
import { DEPARTMENTS, ENDINGS } from "@/lib/constants";

import type { RankingEntry } from "@/features/survival/types";

function getDeptIcon(deptId: string): string {
  return DEPARTMENTS.find((d) => d.id === deptId)?.icon ?? "🎓";
}

function getEndingLabel(endingType: string): string {
  const ending = ENDINGS[endingType as keyof typeof ENDINGS];
  return ending?.title ?? endingType;
}

export function HallOfFameTable() {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getRankingApi();
      setEntries(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-lg text-muted-foreground">
        불러오는 중...
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-lg text-muted-foreground">
        아직 기록이 없습니다. 첫 번째 생존자가 되어주세요!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry, index) => (
        <div
          key={`${entry.nickname}-${entry.created_at}`}
          className="flex items-center gap-3 rounded-lg border border-border px-4 py-2.5"
        >
          {/* Rank */}
          <span className="w-6 text-center font-mono text-sm font-bold text-muted-foreground">
            {index + 1}
          </span>

          {/* Department icon */}
          <span className="text-lg">{getDeptIcon(entry.department)}</span>

          {/* Nickname */}
          <span className="min-w-0 flex-1 truncate text-sm font-semibold">
            {entry.nickname}
            <span className="text-sm text-muted-foreground">
              {" • "}
              {entry.turns_survived}일 생존
            </span>
          </span>

          {/* Ending */}
          <Badge variant="outline" className="text-xs px-2 py-0">
            {getEndingLabel(entry.ending)}
          </Badge>

          {/* Score */}
          <span className="w-14 text-right font-mono text-sm font-bold">
            {entry.score}점
          </span>
        </div>
      ))}
    </div>
  );
}
