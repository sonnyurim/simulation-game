"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DEPARTMENTS } from "@/lib/constants";

import type { Department } from "@/types/survival";

interface DepartmentSelectProps {
  readonly onSelect: (dept: Department) => void;
}

export function DepartmentSelect({ onSelect }: DepartmentSelectProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 py-10">
      <div className="text-center">
        <h2 className="text-4xl font-bold">학과 선택</h2>
        <p className="mt-3 text-lg text-muted-foreground">
          학과에 따라 특수 선택지와 보너스가 달라집니다
        </p>
      </div>

      <div className="grid w-full max-w-2xl gap-4">
        {DEPARTMENTS.map((dept) => (
          <Card
            key={dept.id}
            className="cursor-pointer transition-colors hover:border-primary/50 hover:bg-card/80"
            onClick={() => onSelect(dept)}
          >
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center justify-center gap-3 text-xl">
                <span className="text-3xl">{dept.icon}</span>
                {dept.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="-mt-3 pt-0 text-center">
              <p className="text-lg text-muted-foreground">
                {dept.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="text-lg text-muted-foreground"
        disabled
      >
        학과를 선택하면 게임이 시작됩니다
      </Button>
    </div>
  );
}
