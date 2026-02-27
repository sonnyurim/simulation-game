"use client";

import { useEffect, useRef } from "react";

import { useTypewriter } from "@/hooks/use-typewriter";

import type { GameEvent } from "@/types/survival";

interface EventCardProps {
  readonly event: GameEvent;
  readonly previousResult?: string | null;
  readonly onTypingComplete?: () => void;
}

export function EventCard({ event, previousResult, onTypingComplete }: EventCardProps) {
  const { displayed, isDone, skip } = useTypewriter(event.description);

  // Stable ref so the callback never causes re-run
  const onCompleteRef = useRef(onTypingComplete);
  useEffect(() => {
    onCompleteRef.current = onTypingComplete;
  });

  useEffect(() => {
    if (isDone) onCompleteRef.current?.();
  }, [isDone]);

  const cursor = !isDone ? (
    <span className="inline-block w-px h-[0.9em] bg-muted-foreground animate-pulse align-middle ml-0.5" />
  ) : null;

  if (event.isSpecial) {
    return (
      <div className="space-y-4 py-2" onClick={skip} role="presentation">
        {previousResult && (
          <p className="pb-6 mb-2 text-base leading-relaxed text-muted-foreground/50 border-b border-border/20">
            {previousResult}
          </p>
        )}
        <p className="text-xs uppercase tracking-widest text-destructive">
          ⚠ 긴급 상황
        </p>
        <h2 className="text-4xl font-extrabold leading-tight text-destructive">
          {event.title}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {displayed}
          {cursor}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-2" onClick={skip} role="presentation">
      {previousResult && (
        <p className="pb-6 mb-2 text-base leading-relaxed text-muted-foreground/50 border-b border-border/20">
          {previousResult}
        </p>
      )}
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        {event.location}
      </p>
      <h2 className="text-4xl font-extrabold leading-tight text-foreground">
        {event.title}
      </h2>
      <p className="text-base leading-relaxed text-muted-foreground">
        {displayed}
        {cursor}
      </p>
    </div>
  );
}
