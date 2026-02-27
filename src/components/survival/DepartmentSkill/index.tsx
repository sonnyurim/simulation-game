"use client";

import { DEPARTMENT_SKILLS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import type { Department } from "@/types/survival";

interface DepartmentSkillProps {
  readonly department: Department;
  readonly skillUsed: number;
  readonly onUse: () => void;
}

export function DepartmentSkill({ department, skillUsed, onUse }: DepartmentSkillProps) {
  const skill = DEPARTMENT_SKILLS.find((s) => s.departmentId === department.id);
  if (!skill) return null;

  const remaining = skill.maxUses - skillUsed;
  const isDisabled = remaining <= 0;

  return (
    <button
      onClick={onUse}
      disabled={isDisabled}
      className={cn(
        "w-full py-3 text-left text-xs transition-colors",
        isDisabled
          ? "cursor-not-allowed text-muted-foreground/25"
          : "text-muted-foreground/50 hover:text-muted-foreground",
      )}
    >
      <span className="mr-2 text-muted-foreground/30">·</span>
      {skill.icon} {skill.name}
      <span className="ml-2 tabular-nums">({remaining}/{skill.maxUses})</span>
    </button>
  );
}
