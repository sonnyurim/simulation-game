"use client";

import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string, speed = 22) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  function clear() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function skip() {
    clear();
    setDisplayed(text);
    setIsDone(true);
  }

  useEffect(() => {
    clear();
    setDisplayed("");
    setIsDone(false);
    indexRef.current = 0;

    if (!text) {
      setIsDone(true);
      return;
    }

    intervalRef.current = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));

      if (indexRef.current >= text.length) {
        clear();
        setIsDone(true);
      }
    }, speed);

    return clear;
  // speed is a constant — intentionally excluded from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return { displayed, isDone, skip };
}
