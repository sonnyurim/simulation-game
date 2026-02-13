"use client";

import { useState, useEffect, useCallback, useRef } from "react";

import { ChoiceButton } from "@/components/survival/ChoiceButton";
import { DepartmentSelect } from "@/components/survival/DepartmentSelect";
import { EmergencySupply } from "@/components/survival/EmergencySupply";
import { EventCard } from "@/components/survival/EventCard";
import { GameOverScreen } from "@/components/survival/GameOverScreen";
import { ResourceBars } from "@/components/survival/ResourceBars";
import { TurnCounter } from "@/components/survival/TurnCounter";
import { VictoryScreen } from "@/components/survival/VictoryScreen";

import { selectEvent } from "@/lib/event-engine";
import {
  createInitialState,
  selectDepartment,
  applyChoice,
  applyEmergencySupply,
  checkGameEnd,
  transitionToEnd,
  setCurrentEvent,
  saveToSession,
  loadFromSession,
  clearSession,
} from "@/lib/game-logic";

import type { GameState, Choice, Department, EndingType } from "@/types/survival";

function getInitialState(): GameState {
  const saved = loadFromSession();
  return saved ?? createInitialState();
}

export function GameContainer() {
  const [state, setState] = useState<GameState>(getInitialState);
  const [ending, setEnding] = useState<EndingType | null>(null);
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

  // Advance to next event when needed — triggered lazily
  const ensureEvent = useCallback(() => {
    if (state.screen === "playing" && !state.currentEvent) {
      const event = selectEvent(state);
      setState((prev) => setCurrentEvent(prev, event));
    }
  }, [state]);

  // Trigger event selection after render when no event is present
  useEffect(() => {
    if (state.screen === "playing" && !state.currentEvent) {
      queueMicrotask(ensureEvent);
    }
  }, [state.screen, state.currentEvent, ensureEvent]);

  const handleDepartmentSelect = useCallback((dept: Department) => {
    setState((prev) => selectDepartment(prev, dept));
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

  const handleEmergencySupply = useCallback(() => {
    setState((prev) => applyEmergencySupply(prev));
  }, []);

  const handleRestart = useCallback(() => {
    clearSession();
    setEnding(null);
    setState({ ...createInitialState(), screen: "departmentSelect" });
  }, []);

  // --- Screen rendering ---

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
        department={state.department?.id ?? "free_major"}
        onRestart={handleRestart}
      />
    );
  }

  // --- Playing screen ---
  const eventToShow = state.currentEvent;

  return (
    <div className="flex min-h-dvh flex-col justify-center gap-5 py-6">
      <TurnCounter turn={state.turn} />
      <ResourceBars resources={state.resources} />
      <EmergencySupply
        emergencyUsed={state.emergencyUsed}
        onUse={handleEmergencySupply}
      />

      {eventToShow && (
        <div className="rounded-xl border border-border bg-card p-5">
          <EventCard event={eventToShow} />
          <div className="mt-4 space-y-2.5">
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
          </div>
        </div>
      )}

    </div>
  );
}
