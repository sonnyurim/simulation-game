"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { sanitizeNickname, validateNickname } from "@/lib/validation";

const BLOOD_DRIPS = [
  { left: "4%",  width: 5, height: 88  },
  { left: "10%", width: 3, height: 44  },
  { left: "17%", width: 6, height: 115 },
  { left: "25%", width: 4, height: 62  },
  { left: "33%", width: 3, height: 38  },
  { left: "44%", width: 5, height: 72  },
  { left: "54%", width: 4, height: 52  },
  { left: "63%", width: 6, height: 96  },
  { left: "73%", width: 3, height: 48  },
  { left: "81%", width: 5, height: 130 },
  { left: "89%", width: 4, height: 58  },
  { left: "95%", width: 6, height: 80  },
];

export default function Home() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleStart() {
    const cleaned = sanitizeNickname(nickname);
    const validationError = validateNickname(cleaned);
    if (validationError) {
      setError(validationError);
      return;
    }
    sessionStorage.setItem("game-nickname", cleaned);
    router.push("/survival");
  }

  return (
    <div className="animate-notice-flicker relative flex min-h-dvh flex-col items-center justify-center px-6 overflow-hidden">

      {/* ── Background layers ── */}

      {/* Top blood glow */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-0"
        style={{
          height: "45%",
          background:
            "linear-gradient(to bottom, oklch(0.28 0.24 25 / 0.45) 0%, oklch(0.18 0.18 25 / 0.12) 55%, transparent 100%)",
        }}
      />

      {/* Bottom ember glow */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-0"
        style={{
          height: "30%",
          background:
            "linear-gradient(to top, oklch(0.16 0.16 25 / 0.35) 0%, transparent 100%)",
        }}
      />

      {/* Side bleeds */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 80% at 0% 50%, oklch(0.22 0.20 25 / 0.25), transparent)," +
            "radial-gradient(ellipse 40% 80% at 100% 50%, oklch(0.22 0.20 25 / 0.2), transparent)",
        }}
      />

      {/* Blood drips from top */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0">
        {BLOOD_DRIPS.map((drip, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: drip.left,
              top: 0,
              width: drip.width,
              height: drip.height,
              background:
                "linear-gradient(to bottom, oklch(0.40 0.26 25 / 0.9), oklch(0.30 0.22 25 / 0.3))",
              borderRadius: "0 0 50% 50%",
            }}
          />
        ))}
      </div>

      {/* Dark red vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 45%, oklch(0.05 0.04 25 / 0.88) 100%)",
        }}
      />

      {/* Scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-xs space-y-10">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground drop-shadow-[0_0_30px_oklch(0.45_0.25_25/0.6)]">
            지금 우리 학교는
          </h1>
          <p className="mt-2 font-mono text-[11px] tracking-[0.25em] text-muted-foreground/75">
            연암공과대학교
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 border-b border-border/50 py-2 transition-colors focus-within:border-border/80">
              <span className="font-mono text-xs text-muted-foreground/40">▸</span>
              <input
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                maxLength={10}
                placeholder="이름 입력 (2~10자)"
                className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/45 focus:outline-none"
              />
            </div>
            {error && (
              <p className="font-mono text-[11px] text-destructive">{error}</p>
            )}
          </div>

          <button
            onClick={handleStart}
            className="group flex items-center gap-3 py-1 transition-colors"
          >
            <span className="font-mono text-xs text-muted-foreground/40 transition-colors group-hover:text-destructive">
              →
            </span>
            <span className="font-mono text-sm text-foreground/90 transition-colors group-hover:text-foreground">
              시작하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
