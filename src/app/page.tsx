import { Activity, CalendarDays, Dumbbell, Plus, TimerReset } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { demoPlan, seededExercises, todaySession, totalBanked } from "@/lib/tracker/seed";

const activeExercise = seededExercises.find((exercise) => exercise.id === todaySession.exerciseId) ?? seededExercises[0];
const banked = totalBanked(todaySession);
const remaining = Math.max(todaySession.target - banked, 0);
const progress = Math.min(Math.round((banked / todaySession.target) * 100), 100);
const activePhase = demoPlan.phases.find((phase) => phase.id === todaySession.phaseId) ?? demoPlan.phases[0];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#e4f0df,_transparent_35%),var(--background)] px-4 py-5 sm:px-6">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5">
        <header className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm text-muted-foreground">Saturday, July 4</p>
            <h1 className="text-2xl font-semibold tracking-tight">Today&apos;s session</h1>
          </div>
          <Badge>Private</Badge>
        </header>

        <Card className="overflow-hidden border-primary/20 bg-card/95">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>{activeExercise.name}</CardTitle>
                <CardDescription>{activeExercise.notes}</CardDescription>
              </div>
              <div className="rounded-2xl bg-accent p-3 text-accent-foreground">
                <Dumbbell className="h-5 w-5" aria-hidden />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-3xl bg-secondary/70 p-5">
              <p className="text-sm text-muted-foreground">Banked today</p>
              <div className="mt-1 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-tight">{banked}</span>
                <span className="pb-2 text-muted-foreground">/ {todaySession.target} {activeExercise.unit}</span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-background" aria-label={`${progress}% complete`}>
                <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {remaining > 0 ? `${remaining} ${activeExercise.unit} left. Small sets still count.` : "Goal banked for today. That counts."}
              </p>
            </div>

            <section aria-labelledby="quick-add-heading" className="space-y-3">
              <h2 id="quick-add-heading" className="text-sm font-medium text-muted-foreground">Quick add a set</h2>
              <div className="grid grid-cols-4 gap-2">
                {activeExercise.quickAddPresets.map((amount) => (
                  <Button key={amount} variant="secondary" className="h-12 text-base">+{amount}</Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input inputMode="numeric" placeholder="Custom" aria-label="Custom set amount" />
                <Button aria-label="Add custom set"><Plus className="h-4 w-4" aria-hidden /> Add</Button>
              </div>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5" aria-hidden /> Monthly plan</CardTitle>
            <CardDescription>{demoPlan.name}: one exercise, four phases, one break day between phases.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-muted p-4">
              <div>
                <p className="font-medium">{activePhase.name}</p>
                <p className="text-sm text-muted-foreground">Current phase target: {activePhase.target} {activeExercise.unit}</p>
              </div>
              <Badge>Phase 1</Badge>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {demoPlan.phases.map((phase, index) => (
                <div key={phase.id} className="rounded-2xl border bg-background p-3 text-center">
                  <p className="text-xs text-muted-foreground">P{index + 1}</p>
                  <p className="font-semibold">{phase.target}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" aria-hidden /> Exercises</CardTitle>
            <CardDescription>Start with three defaults. Add custom exercises when the core loop feels right.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {seededExercises.map((exercise) => (
              <div key={exercise.id} className="flex items-center justify-between rounded-2xl border bg-background p-3">
                <div>
                  <p className="font-medium">{exercise.name}</p>
                  <p className="text-sm text-muted-foreground">Target {exercise.defaultDailyTarget} {exercise.unit}</p>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TimerReset className="h-5 w-5" aria-hidden /> Recent sets</CardTitle>
            <CardDescription>Fast, correctable logs. No shame, no leaderboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {todaySession.sets.map((set) => (
              <div key={set.id} className="flex items-center justify-between rounded-2xl bg-muted p-3">
                <span>{set.amount} {activeExercise.unit}</span>
                <span className="text-sm text-muted-foreground">{new Date(set.createdAt).toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" })}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
