import Link from "next/link";

import { Button } from "@/components/ui/button";

import { HallOfFameTable } from "@/components/survival/HallOfFameTable";

export default function RankingPage() {
  return (
    <div className="mx-auto flex h-dvh max-w-2xl flex-col gap-8 px-6 py-10">
      <div className="shrink-0 text-center">
        <h1 className="text-4xl font-bold">🏆 명예의 전당</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          연암공대 좀비 서바이벌 최고 기록
        </p>
      </div>

      <div className="scrollbar-horror min-h-0 flex-1 overflow-y-auto">
        <HallOfFameTable />
      </div>

      <div className="shrink-0 flex gap-4 pb-6">
        <Button variant="outline" className="flex-1 py-6 text-lg" asChild>
          <Link href="/">홈으로</Link>
        </Button>
        <Button className="flex-1 py-6 text-lg" asChild>
          <Link href="/survival">도전하기</Link>
        </Button>
      </div>
    </div>
  );
}
