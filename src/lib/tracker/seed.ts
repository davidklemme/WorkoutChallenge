import type { Exercise, TrainingPlan, TrainingSession } from "./types";

export const seededExercises: Exercise[] = [
  {
    id: "push-ups",
    name: "Push-ups",
    unit: "reps",
    defaultDailyTarget: 100,
    quickAddPresets: [5, 10, 20, 25],
    notes: "Upper body staple. Keep the logging fast and the form honest.",
  },
  {
    id: "planks",
    name: "Planks",
    unit: "seconds",
    defaultDailyTarget: 180,
    quickAddPresets: [20, 30, 45, 60],
    notes: "Core work tracked in seconds so small holds still count.",
  },
  {
    id: "squats",
    name: "Squats",
    unit: "reps",
    defaultDailyTarget: 100,
    quickAddPresets: [10, 15, 20, 25],
    notes: "Lower-body option for days when push-ups are not the focus.",
  },
];

export const demoPlan: TrainingPlan = {
  id: "july-foundation",
  name: "Foundation Month",
  exerciseId: "push-ups",
  startsOn: "2026-07-01",
  endsOn: "2026-07-31",
  monthlyTarget: 2400,
  phases: [
    { id: "phase-1", name: "Find your rhythm", startsOn: "2026-07-01", endsOn: "2026-07-07", target: 500, breakAfter: true },
    { id: "phase-2", name: "Build gently", startsOn: "2026-07-09", endsOn: "2026-07-15", target: 600, breakAfter: true },
    { id: "phase-3", name: "Steady progress", startsOn: "2026-07-17", endsOn: "2026-07-23", target: 700, breakAfter: true },
    { id: "phase-4", name: "Finish well", startsOn: "2026-07-25", endsOn: "2026-07-31", target: 600, breakAfter: false },
  ],
};

export const todaySession: TrainingSession = {
  id: "today",
  date: "2026-07-04",
  exerciseId: "push-ups",
  planId: demoPlan.id,
  phaseId: "phase-1",
  target: 100,
  status: "partial",
  sets: [
    { id: "set-1", sessionId: "today", amount: 20, createdAt: "2026-07-04T08:20:00.000Z" },
    { id: "set-2", sessionId: "today", amount: 15, createdAt: "2026-07-04T10:45:00.000Z" },
    { id: "set-3", sessionId: "today", amount: 10, createdAt: "2026-07-04T13:15:00.000Z" },
  ],
};
