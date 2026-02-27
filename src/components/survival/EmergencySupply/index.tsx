"use client";

import { GAME_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface EmergencySupplyProps {
  readonly emergencyUsed: number;
  readonly onUse: () => void;
}

export function EmergencySupply({ emergencyUsed, onUse }: EmergencySupplyProps) {
  const remaining = GAME_CONFIG.MAX_EMERGENCY_USES - emergencyUsed;
  const isDisabled = remaining <= 0;

  return (
    <div className="flex justify-center">
      <button
        onClick={onUse}
        disabled={isDisabled}
        className={cn(
          "flex items-center gap-4 rounded-full px-8 py-4 text-base font-medium transition-colors",
          isDisabled
            ? "cursor-not-allowed bg-muted text-muted-foreground opacity-50"
            : "bg-warning text-warning-foreground hover:bg-warning/90 active:bg-warning/80",
        )}
      >
        <span>🆘 긴급 구조 팩 ({remaining}회 남음)</span>
        <span className={cn(
          "font-semibold",
          isDisabled ? "text-muted-foreground" : "text-warning-foreground",
        )}>
          최종 점수 -100점
        </span>
      </button>
    </div>
  );
}
