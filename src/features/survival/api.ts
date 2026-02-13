import { logger } from "@/lib/logger";

import type { SaveResultRequest, SaveResultResponse, RankingEntry, RankingResponse } from "./types";

export async function saveResultApi(
  data: SaveResultRequest,
): Promise<{ data: SaveResultResponse | null; error: string | null }> {
  try {
    const res = await fetch("/api/survival/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { data: null, error: "저장에 실패했습니다" };
    }

    const json = (await res.json()) as SaveResultResponse;
    // Notify ranking sidebar to refresh
    window.dispatchEvent(new Event("ranking-updated"));
    return { data: json, error: null };
  } catch (err) {
    logger.error("Failed to save result", err);
    return { data: null, error: "네트워크 오류" };
  }
}

export async function getRankingApi(limit?: number): Promise<{
  data: RankingEntry[];
  error: string | null;
}> {
  try {
    const query = limit ? `?limit=${limit}` : "";
    const res = await fetch(`/api/survival/ranking${query}`);

    if (!res.ok) {
      return { data: [], error: "데이터 조회 실패" };
    }

    const json = (await res.json()) as RankingResponse;
    return { data: json.rankings, error: null };
  } catch (err) {
    logger.error("Failed to fetch ranking", err);
    return { data: [], error: "네트워크 오류" };
  }
}
