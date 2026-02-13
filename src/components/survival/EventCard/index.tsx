"use client";

import type { GameEvent } from "@/types/survival";

interface EventCardProps {
  readonly event: GameEvent;
}

const TAG_ICONS: Record<string, string> = {
  combat: "⚔️",
  scavenge: "🔍",
  social: "🤝",
  medical: "🏥",
  explore: "🗺️",
  craft: "🔧",
  defense: "🛡️",
  morale: "💬",
};

export function EventCard({ event }: EventCardProps) {
  const icon = TAG_ICONS[event.tag] ?? "⚠️";

  if (event.isSpecial) {
    return (
      <div className="space-y-4">
        <div className="inline-block rounded-md bg-destructive/20 px-3 py-1 text-sm font-bold text-destructive">
          ⚠️ 긴급 상황
        </div>
        <h2 className="text-3xl font-bold text-destructive">
          {event.title}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {event.description}
        </p>
        <p className="text-base font-medium text-muted-foreground">
          대응 방안 선택:
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-warning">
        {icon} {event.title}
      </h2>
      <p className="text-base leading-relaxed text-muted-foreground">
        {event.description}
      </p>
      <p className="text-base font-medium text-muted-foreground">
        대응 방안 선택:
      </p>
    </div>
  );
}
