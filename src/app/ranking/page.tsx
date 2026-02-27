import Link from "next/link";

import { HallOfFameTable } from "@/components/survival/HallOfFameTable";

export default function RankingPage() {
  return (
    <div className="relative flex h-dvh flex-col px-6 py-10">
      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, oklch(0.05 0.01 15 / 0.88) 100%)",
        }}
      />
      {/* Scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-2xl flex-col gap-8">
        <div className="shrink-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40">
            연암공과대학교 좀비 서바이벌
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-foreground">
            생존자 명단
          </h1>
        </div>

        <div className="scrollbar-horror min-h-0 flex-1 overflow-y-auto">
          <HallOfFameTable />
        </div>

        <div className="shrink-0 border-t border-border/30 pt-6">
          <Link
            href="/"
            className="group flex items-center gap-3 py-1 transition-colors"
          >
            <span className="font-mono text-xs text-muted-foreground/40 transition-colors group-hover:text-destructive">
              ←
            </span>
            <span className="font-mono text-sm text-foreground/70 transition-colors group-hover:text-foreground">
              홈으로
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
