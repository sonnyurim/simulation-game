"use client";

import { GameContainer } from "@/components/survival/GameContainer";
import { RankingSidebar } from "@/components/survival/RankingSidebar";

export default function SurvivalPage() {
  return (
    <div className="flex min-h-dvh">
      {/* Left spacer to keep game centered */}
      <div className="hidden w-56 shrink-0 lg:block" />
      <div className="mx-auto w-full max-w-2xl px-6">
        <GameContainer />
      </div>
      <RankingSidebar />
    </div>
  );
}
