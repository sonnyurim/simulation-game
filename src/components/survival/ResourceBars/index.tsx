"use client";

import { RESOURCE_ICONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import type { Resources, ResourceKey } from "@/types/survival";

interface ResourceBarsProps {
  readonly resources: Resources;
}

const RESOURCE_KEYS: ResourceKey[] = ["health", "food", "survivors", "mental"];

export function ResourceBars({ resources }: ResourceBarsProps) {
  return (
    <div className="flex justify-between tabular-nums">
      {RESOURCE_KEYS.map((key) => {
        const value = resources[key];
        const isCritical = value <= 25;
        const isWarning = value <= 50 && !isCritical;

        return (
          <span
            key={key}
            className={cn(
              "flex items-center gap-1 text-xs",
              isCritical && "animate-pulse font-bold text-destructive",
              isWarning && "text-warning",
              !isCritical && !isWarning && "text-muted-foreground/50",
            )}
          >
            {RESOURCE_ICONS[key]} {value}%
          </span>
        );
      })}
    </div>
  );
}
