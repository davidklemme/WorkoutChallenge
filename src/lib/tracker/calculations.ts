import type { Exercise, TrainingPlan, TrainingSession } from "./types";

export function totalBanked(session: Pick<TrainingSession, "sets">) {
  return session.sets.reduce((sum, set) => sum + set.amount, 0);
}

export function remainingTarget(session: Pick<TrainingSession, "target" | "sets">) {
  return Math.max(session.target - totalBanked(session), 0);
}

export function completionPercent(session: Pick<TrainingSession, "target" | "sets">) {
  if (session.target <= 0) {
    return 0;
  }

  return Math.min(Math.round((totalBanked(session) / session.target) * 100), 100);
}

export function isSessionComplete(session: Pick<TrainingSession, "target" | "sets">) {
  return totalBanked(session) >= session.target;
}

export function hasSeedExercise(exercises: Exercise[], id: string) {
  return exercises.some((exercise) => exercise.id === id);
}

export function hasFourPhasePlan(plan: Pick<TrainingPlan, "phases">) {
  return plan.phases.length === 4;
}

export function hasBreaksBetweenFirstThreePhases(plan: Pick<TrainingPlan, "phases">) {
  return plan.phases.slice(0, 3).every((phase) => phase.breakAfter) && plan.phases[3]?.breakAfter === false;
}
