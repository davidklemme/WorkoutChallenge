import { describe, expect, it } from "vitest";
import {
  completionPercent,
  hasBreaksBetweenFirstThreePhases,
  hasFourPhasePlan,
  hasSeedExercise,
  isSessionComplete,
  remainingTarget,
  totalBanked,
} from "./calculations";
import { demoPlan, seededExercises, todaySession } from "./seed";

const completeSession = {
  ...todaySession,
  sets: [
    ...todaySession.sets,
    { id: "set-4", sessionId: todaySession.id, amount: 55, createdAt: "2026-07-04T16:00:00.000Z" },
  ],
};

describe("tracker calculations", () => {
  it("sums the sets banked in a training session", () => {
    expect(totalBanked(todaySession)).toBe(45);
  });

  it("calculates the remaining amount without going below zero", () => {
    expect(remainingTarget(todaySession)).toBe(55);
    expect(remainingTarget(completeSession)).toBe(0);
  });

  it("caps completion percentage at 100", () => {
    expect(completionPercent(todaySession)).toBe(45);
    expect(completionPercent(completeSession)).toBe(100);
  });

  it("marks sessions complete only when banked sets meet the target", () => {
    expect(isSessionComplete(todaySession)).toBe(false);
    expect(isSessionComplete(completeSession)).toBe(true);
  });
});

describe("seeded exercise library", () => {
  it("starts with push-ups, planks, and squats", () => {
    expect(hasSeedExercise(seededExercises, "push-ups")).toBe(true);
    expect(hasSeedExercise(seededExercises, "planks")).toBe(true);
    expect(hasSeedExercise(seededExercises, "squats")).toBe(true);
  });

  it("uses exercise-appropriate units", () => {
    expect(seededExercises.find((exercise) => exercise.id === "push-ups")?.unit).toBe("reps");
    expect(seededExercises.find((exercise) => exercise.id === "planks")?.unit).toBe("seconds");
    expect(seededExercises.find((exercise) => exercise.id === "squats")?.unit).toBe("reps");
  });
});

describe("monthly plan shape", () => {
  it("uses four phases", () => {
    expect(hasFourPhasePlan(demoPlan)).toBe(true);
  });

  it("places a break after the first three phases only", () => {
    expect(hasBreaksBetweenFirstThreePhases(demoPlan)).toBe(true);
  });
});
