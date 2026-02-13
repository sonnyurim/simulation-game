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
        "w-full rounded-lg bg-secondary/60 px-6 py-4 text-left transition-colors hover:bg-secondary",
        disabled && "pointer-events-none opacity-50",
      )}
      onClick={() => onSelect(choice)}
      disabled={disabled}
    >
      <p className="text-base font-semibold text-foreground">
        {choice.text}
      </p>

      {!hideEffects && badges.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                badge.isPositive
                  ? "bg-emerald-900/60 text-emerald-300"
                  : "bg-red-900/60 text-red-300",
              )}
            >
              {badge.icon} {badge.label} {badge.isPositive ? "↗" : "↘"}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
