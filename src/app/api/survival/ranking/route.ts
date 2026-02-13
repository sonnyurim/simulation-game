import { type NextRequest, NextResponse } from "next/server";

import { logger } from "@/lib/logger";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = request.nextUrl;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Math.min(Number(limitParam), 200) : 200;

    const { data, error } = await supabase
      .from("survival_results")
      .select("nickname, department, score, turns_survived, ending, created_at")
      .order("score", { ascending: false })
      .limit(limit);

    if (error) {
      logger.error("Failed to fetch ranking", error);
      return NextResponse.json({ error: "데이터 조회 실패" }, { status: 500 });
    }

    const rankings = (data ?? []).map((entry, index) => ({
      rank: index + 1,
      ...entry,
    }));

    return NextResponse.json({ rankings });
  } catch (err) {
    logger.error("Unexpected error in ranking API", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
