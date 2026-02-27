"use client";

import { RESOURCE_LABELS, RESOURCE_ICONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import type { Choice, Department, ResourceEffect, ResourceKey } from "@/types/survival";

interface ChoiceButtonProps {
  readonly choice: Choice;
  readonly department: Department | null;
  readonly onSelect: (choice: Choice) => void;
  readonly disabled: boolean;
  readonly hideEffects?: boolean;
}

const EFFECT_KEYS: ResourceKey[] = ["health", "food", "survivors", "mental"];

interface EffectBadge {
  readonly icon: string;
  readonly label: string;
  readonly value: number;
  readonly isPositive: boolean;
}

function getEffectBadges(effect: ResourceEffect, extraEffect?: ResourceEffect): EffectBadge[] {
  const badges: EffectBadge[] = [];

  for (const key of EFFECT_KEYS) {
    const base = effect[key] ?? 0;
    const extra = extraEffect?.[key] ?? 0;
    const total = base + extra;
    if (total === 0) continue;

    badges.push({
      icon: RESOURCE_ICONS[key],
      label: RESOURCE_LABELS[key],
      value: total,
      isPositive: total > 0,
    });
  }

  return badges;
}

export function ChoiceButton({
  choice,
  department,
  onSelect,
  disabled,
  hideEffects = false,
}: ChoiceButtonProps) {
  const hasDeptBonus =
    choice.departmentBonus &&
    department &&
    choice.departmentBonus.departmentId === department.id;

  const badges = getEffectBadges(
    choice.effect,
    hasDeptBonus ? choice.departmentBonus?.extraEffect : undefined,
  );

  return (
    <button
      className={cn(
        "group w-full border-b border-border/30 py-4 text-left last:border-0",
        "transition-all duration-150",
        disabled && "pointer-events-none opacity-40",
      )}
      onClick={() => onSelect(choice)}
      disabled={disabled}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground">
          →
        </span>
        <div className="flex-1 space-y-2">
          <p className="text-sm leading-relaxed text-foreground/90 transition-colors group-hover:text-foreground">
            {choice.text}
          </p>

          {!hideEffects && badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums",
                    badge.isPositive
                      ? "bg-success/15 text-success"
                      : "bg-destructive/15 text-destructive",
                  )}
                >
                  {badge.icon} {badge.label} {badge.isPositive ? "+" : ""}{badge.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
