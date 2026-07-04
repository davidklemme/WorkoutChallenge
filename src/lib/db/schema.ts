import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const exercises = pgTable("exercises", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  unit: text("unit").notNull(),
  defaultDailyTarget: integer("default_daily_target").notNull(),
  quickAddPresets: jsonb("quick_add_presets").$type<number[]>().notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const trainingPlans = pgTable("training_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  exerciseId: uuid("exercise_id").notNull().references(() => exercises.id),
  startsOn: text("starts_on").notNull(),
  endsOn: text("ends_on").notNull(),
  monthlyTarget: integer("monthly_target").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const planPhases = pgTable("plan_phases", {
  id: uuid("id").defaultRandom().primaryKey(),
  planId: uuid("plan_id").notNull().references(() => trainingPlans.id),
  name: text("name").notNull(),
  startsOn: text("starts_on").notNull(),
  endsOn: text("ends_on").notNull(),
  target: integer("target").notNull(),
  breakAfter: boolean("break_after").notNull().default(false),
});

export const trainingSessions = pgTable("training_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: text("date").notNull(),
  exerciseId: uuid("exercise_id").notNull().references(() => exercises.id),
  planId: uuid("plan_id").references(() => trainingPlans.id),
  phaseId: uuid("phase_id").references(() => planPhases.id),
  target: integer("target").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const exerciseSets = pgTable("exercise_sets", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id").notNull().references(() => trainingSessions.id),
  amount: integer("amount").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
