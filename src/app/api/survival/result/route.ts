import { NextResponse } from "next/server";

import { logger } from "@/lib/logger";
import { createServerClient } from "@/lib/supabase/server";
import { sanitizeNickname, validateNickname, validateResultBody } from "@/lib/validation";

import type { SaveResultRequest } from "@/features/survival/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SaveResultRequest;

    const bodyError = validateResultBody(body);
    if (bodyError) {
      return NextResponse.json({ error: bodyError }, { status: 400 });
    }

    const cleaned = sanitizeNickname(body.nickname);
    const validationError = validateNickname(cleaned);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const supabase = createServerClient();

    const { error } = await supabase.from("survival_results").insert({
      nickname: cleaned,
      department: body.department,
      score: body.score,
      turns_survived: body.turnsSurvived,
      ending: body.ending,
    });

    if (error) {
      logger.error("Failed to insert survival result", error);
      return NextResponse.json({ error: "저장에 실패했습니다" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    logger.error("Unexpected error in result API", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
