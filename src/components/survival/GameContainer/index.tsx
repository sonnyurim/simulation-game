"use client";

import { useState, useEffect, useCallback, useRef } from "react";

import { BroadcastScreen } from "@/components/survival/BroadcastScreen";
import { ChoiceButton } from "@/components/survival/ChoiceButton";
import { DepartmentSelect } from "@/components/survival/DepartmentSelect";
import { DepartmentSkill } from "@/components/survival/DepartmentSkill";
import { EventCard } from "@/components/survival/EventCard";
import { GameOverScreen } from "@/components/survival/GameOverScreen";
import { ResourceBars } from "@/components/survival/ResourceBars";
import { TurnCounter } from "@/components/survival/TurnCounter";
import { VictoryScreen } from "@/components/survival/VictoryScreen";

import { cn } from "@/lib/utils";
import { selectEvent } from "@/lib/event-engine";
import {
  createInitialState,
  selectDepartment,
  applyChoice,
  applySkill,
  checkGameEnd,
  transitionToEnd,
  setCurrentEvent,
  saveToSession,
  loadFromSession,
  clearSession,
} from "@/lib/game-logic";

import type { GameState, Choice, Department, EndingType, Screen } from "@/types/survival";

function getInitialState(): GameState {
  const saved = loadFromSession();
  return saved ?? createInitialState();
}

interface GameContainerProps {
  readonly onScreenChange?: (screen: Screen) => void;
  readonly onFlashlightModeChange?: (active: boolean) => void;
}

export function GameContainer({ onScreenChange, onFlashlightModeChange }: GameContainerProps = {}) {
  const [state, setState] = useState<GameState>(getInitialState);
  const [ending, setEnding] = useState<EndingType | null>(null);
  const [choicesVisible, setChoicesVisible] = useState(false);
  const initialized = useRef(false);

  // On mount: check if restored state has an ending
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const endCheck = checkGameEnd(state);
    if (endCheck) {
      setEnding(endCheck);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist state on change
  useEffect(() => {
    saveToSession(state);
  }, [state]);

  // Notify parent when screen changes
  useEffect(() => {
    onScreenChange?.(state.screen);
  }, [state.screen, onScreenChange]);

  // Notify parent when flashlight mode activates
  useEffect(() => {
    if (state.flashlightMode) {
      onFlashlightModeChange?.(true);
    }
  }, [state.flashlightMode, onFlashlightModeChange]);

  // Advance to next event
  const ensureEvent = useCallback(() => {
    if (state.screen === "playing" && !state.currentEvent) {
      const event = selectEvent(state);
      setState((prev) => setCurrentEvent(prev, event));
    }
  }, [state]);

  useEffect(() => {
    if (state.screen === "playing" && !state.currentEvent) {
      queueMicrotask(ensureEvent);
    }
  }, [state.screen, state.currentEvent, ensureEvent]);

  // Reset choices visibility when event changes
  const eventId = state.currentEvent?.id;
  useEffect(() => {
    setChoicesVisible(false);
  }, [eventId]);

  const handleTypingComplete = useCallback(() => {
    setChoicesVisible(true);
  }, []);

  const handleDepartmentSelect = useCallback((dept: Department) => {
    setState((prev) => selectDepartment(prev, dept));
  }, []);

  const handleBroadcastComplete = useCallback(() => {
    setState((prev) => ({ ...prev, screen: "playing" as Screen }));
  }, []);

  const handleChoice = useCallback((choice: Choice) => {
    setState((prev) => {
      if (!prev.currentEvent) return prev;
      const next = applyChoice(prev, prev.currentEvent, choice);
      const endCheck = checkGameEnd(next);
      if (endCheck) {
        setEnding(endCheck);
        return transitionToEnd(next, endCheck);
      }
      return next;
    });
  }, []);

  const handleSkill = useCallback(() => {
    setState((prev) => {
      const next = applySkill(prev);
      const endCheck = checkGameEnd(next);
      if (endCheck) {
        setEnding(endCheck);
        return transitionToEnd(next, endCheck);
      }
      return next;
    });
  }, []);

  const handleRestart = useCallback(() => {
    clearSession();
    setEnding(null);
    setState(createInitialState());
  }, []);

  // --- Screen rendering ---

  if (state.screen === "broadcast") {
    return <BroadcastScreen onComplete={handleBroadcastComplete} />;
  }

  if (state.screen === "departmentSelect") {
    return <DepartmentSelect onSelect={handleDepartmentSelect} />;
  }

  if (state.screen === "gameOver" && ending) {
    return (
      <GameOverScreen
        ending={ending}
        turn={state.turn}
        resources={state.resources}
        emergencyUsed={state.emergencyUsed}
        skillUsed={state.skillUsed}
        department={state.department?.id ?? "free_major"}
        onRestart={handleRestart}
      />
    );
  }

  if (state.screen === "victory" && ending) {
    return (
      <VictoryScreen
        ending={ending}
        turn={state.turn}
        resources={state.resources}
        emergencyUsed={state.emergencyUsed}
        skillUsed={state.skillUsed}
        department={state.department?.id ?? "free_major"}
        onRestart={handleRestart}
      />
    );
  }

  // --- Playing screen ---
  const eventToShow = state.currentEvent;

  return (
    <div className="relative flex min-h-dvh flex-col justify-center px-6 py-5">
      {/* Vignette overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, oklch(0.05 0.01 15 / 0.88) 100%)",
        }}
      />

      <div className="relative z-10">
        <TurnCounter turn={state.turn} />
        <div className="mt-2">
          <ResourceBars resources={state.resources} />
        </div>

        {/* Event + choices */}
        {eventToShow && (
          <div key={eventToShow.id} className="mt-10 animate-fade-in">
            <EventCard
              event={eventToShow}
              previousResult={state.lastChoiceResult}
              onTypingComplete={handleTypingComplete}
            />
            <div
              className={cn(
                "mt-8 border-t border-border transition-all duration-500",
                choicesVisible
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0",
              )}
            >
              {eventToShow.choices.map((choice) => (
                <ChoiceButton
                  key={choice.id}
                  choice={choice}
                  department={state.department}
                  onSelect={handleChoice}
                  disabled={false}
                  hideEffects={eventToShow.isSpecial}
                />
              ))}

              {/* Skill as a subtle bottom option */}
              {state.department && (
                <div className="border-t border-border/20">
                  <DepartmentSkill
                    department={state.department}
                    skillUsed={state.skillUsed}
                    onUse={handleSkill}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
