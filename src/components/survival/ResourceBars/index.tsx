"use client";

import { Progress } from "@/components/ui/progress";

import { RESOURCE_LABELS, RESOURCE_ICONS, RESOURCE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import type { Resources, ResourceKey } from "@/types/survival";

interface ResourceBarsProps {
  readonly resources: Resources;
}

const RESOURCE_KEYS: ResourceKey[] = ["health", "food", "survivors", "mental"];

export function ResourceBars({ resources }: ResourceBarsProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        {RESOURCE_KEYS.map((key) => {
          const value = resources[key];
          const isCritical = value <= 25;

          return (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={cn(
                  "flex items-center gap-1.5 text-sm font-medium",
                  isCritical && "text-destructive font-bold",
                )}>
                  <span className="text-lg">{RESOURCE_ICONS[key]}</span>
                  {RESOURCE_LABELS[key]}
                </span>
                <span className={cn(
                  "text-lg font-bold tabular-nums",
                  isCritical ? "text-destructive" : "text-foreground",
                )}>
                  {value}%
                </span>
              </div>
              <Progress
                value={value}
                className={cn("h-4", isCritical && "animate-pulse")}
                indicatorClassName={cn(
                  RESOURCE_COLORS[key],
                  isCritical && "opacity-80",
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
