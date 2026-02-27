"use client";

import { useState, useCallback, useEffect } from "react";

import { GameContainer } from "@/components/survival/GameContainer";
import { RankingSidebar } from "@/components/survival/RankingSidebar";

import type { Screen } from "@/types/survival";

function Flashlight({ active }: { active: boolean }) {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    if (!active) return;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!moved) setMoved(true);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [active, moved]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        background: moved
          ? `radial-gradient(circle 420px at ${pos.x}px ${pos.y}px, transparent 0%, transparent 50%, rgba(0,0,0,0.92) 100%)`
          : "rgba(0,0,0,0.92)",
        transition: "background 0.05s linear",
      }}
    />
  );
}

export default function SurvivalPage() {
  const [screen, setScreen] = useState<Screen>("departmentSelect");
  const [flashlightMode, setFlashlightMode] = useState(false);
  const handleScreenChange = useCallback((s: Screen) => setScreen(s), []);
  const handleFlashlightModeChange = useCallback(() => setFlashlightMode(true), []);

  const showSidebar = screen === "departmentSelect";

  return (
    <div className="flex min-h-dvh">
      <Flashlight active={flashlightMode} />
      {/* Left spacer to keep game centered */}
      <div className="hidden w-56 shrink-0 lg:block" />
      <div className="mx-auto w-full max-w-lg">
        <GameContainer
          onScreenChange={handleScreenChange}
          onFlashlightModeChange={handleFlashlightModeChange}
        />
      </div>
      {showSidebar ? <RankingSidebar /> : <div className="hidden w-56 shrink-0 lg:block" />}
    </div>
  );
}
