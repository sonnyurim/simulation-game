"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DEPARTMENTS, DEPARTMENT_SKILLS } from "@/lib/constants";

import type { Department } from "@/types/survival";

interface DepartmentSelectProps {
  readonly onSelect: (dept: Department) => void;
}

export function DepartmentSelect({ onSelect }: DepartmentSelectProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 py-6">
      <div className="text-center">
        <h2 className="text-lg font-bold sm:text-xl">학과 선택</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          학과마다 고유 스킬과 이벤트 보너스가 다릅니다
        </p>
      </div>

      <div className="grid w-full gap-2">
        {DEPARTMENTS.map((dept) => {
          const skill = DEPARTMENT_SKILLS.find(
            (s) => s.departmentId === dept.id,
          );
          return (
            <Card
              key={dept.id}
              className="cursor-pointer py-1 transition-colors hover:border-primary/50 hover:bg-card/80"
              onClick={() => onSelect(dept)}
            >
              <CardHeader className="pb-0 pt-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="text-base">{dept.icon}</span>
                    {dept.name}
                  </span>
                  {skill && (
                    <span className="text-xs text-muted-foreground font-normal">
                      {skill.icon} {skill.name} ×{skill.maxUses}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3 pt-1">
                <p className="text-xs text-muted-foreground">
                  {dept.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        학과를 선택하면 게임이 시작됩니다
      </p>
    </div>
  );
}
