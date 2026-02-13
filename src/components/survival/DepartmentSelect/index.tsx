"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DEPARTMENTS } from "@/lib/constants";

import type { Department } from "@/types/survival";

interface DepartmentSelectProps {
  readonly onSelect: (dept: Department) => void;
}

export function DepartmentSelect({ onSelect }: DepartmentSelectProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">학과 선택</h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          학과에 따라 특수 선택지와 보너스가 달라집니다
        </p>
      </div>

      <div className="grid w-full max-w-lg gap-3">
        {DEPARTMENTS.map((dept) => (
          <Card
            key={dept.id}
            className="cursor-pointer transition-colors hover:border-primary/50 hover:bg-card/80"
            onClick={() => onSelect(dept)}
          >
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center justify-center gap-2 text-base sm:text-lg">
                <span className="text-2xl">{dept.icon}</span>
                {dept.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="-mt-3 pt-0 text-center">
              <p className="text-sm text-muted-foreground">
                {dept.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        학과를 선택하면 게임이 시작됩니다
      </p>
    </div>
  );
}
