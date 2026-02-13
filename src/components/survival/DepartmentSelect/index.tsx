"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DEPARTMENTS } from "@/lib/constants";

import type { Department } from "@/types/survival";

interface DepartmentSelectProps {
  readonly onSelect: (dept: Department) => void;
}

export function DepartmentSelect({ onSelect }: DepartmentSelectProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 py-6">
      <div className="text-center">
        <h2 className="text-xl font-bold sm:text-2xl">학과 선택</h2>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          학과에 따라 특수 선택지와 보너스가 달라집니다
        </p>
      </div>

      <div className="grid w-full max-w-md gap-2">
        {DEPARTMENTS.map((dept) => (
          <Card
            key={dept.id}
            className="cursor-pointer py-1 transition-colors hover:border-primary/50 hover:bg-card/80"
            onClick={() => onSelect(dept)}
          >
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center justify-center gap-2 text-sm sm:text-base">
                <span className="text-lg">{dept.icon}</span>
                {dept.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="-mt-3 pt-0 text-center">
              <p className="text-xs text-muted-foreground">
                {dept.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        학과를 선택하면 게임이 시작됩니다
      </p>
    </div>
  );
}
