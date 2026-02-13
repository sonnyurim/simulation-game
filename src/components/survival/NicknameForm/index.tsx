"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { sanitizeNickname, validateNickname } from "@/lib/validation";

interface NicknameFormProps {
  readonly onSubmit: (nickname: string) => void;
  readonly isLoading: boolean;
}

export function NicknameForm({ onSubmit, isLoading }: NicknameFormProps) {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = sanitizeNickname(nickname);
    const validationError = validateNickname(cleaned);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onSubmit(cleaned);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Input
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setError(null);
          }}
          maxLength={10}
          disabled={isLoading}
          className="text-center animate-soft-blink"
        />
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "저장 중..." : "기록 저장"}
      </Button>
    </form>
  );
}
