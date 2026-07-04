export type ExerciseUnit = "reps" | "seconds" | "minutes" | "custom";

export type Exercise = {
  id: string;
  name: string;
  unit: ExerciseUnit;
  defaultDailyTarget: number;
  quickAddPresets: number[];
  notes?: string;
};

export type PlanPhase = {
  id: string;
  name: string;
  startsOn: string;
  endsOn: string;
  target: number;
  breakAfter: boolean;
};

export type TrainingPlan = {
  id: string;
  name: string;
  exerciseId: string;
  startsOn: string;
  endsOn: string;
  monthlyTarget: number;
  phases: PlanPhase[];
};

export type ExerciseSet = {
  id: string;
  sessionId: string;
  amount: number;
  createdAt: string;
  note?: string;
};

export type TrainingSession = {
  id: string;
  date: string;
  exerciseId: string;
  planId?: string;
  phaseId?: string;
  target: number;
  sets: ExerciseSet[];
  status: "not_started" | "partial" | "complete" | "break" | "rest";
};
