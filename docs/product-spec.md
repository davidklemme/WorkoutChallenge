# WorkoutChallenge Product Spec

## 1. Vision

Create a mobile-first PWA that helps a person complete a small daily movement challenge through short sets spread across the day, bank each set toward a daily goal, and build a long-term private health record.

The experience should feel like a steady companion: encouraging, useful, and calm. It should avoid guilt, hype, public comparison, or performative sharing.

## 2. Inspiration and differentiation

WorkoutChallenge is heavily inspired by the motivational structure of the Australian Push-Up Challenge / Push for Better: a clear daily target, bite-sized activity, progress banking, and a feeling of participating in something positive.

Key differences:

* It is **ongoing**, not a one-off campaign.
* It is **personal first**, not public first.
* It supports **daily habit formation** and long-term health tracking.
* It can later support optional sharing, but sharing must never become the core motivation.

## 3. Product principles

1. **Fast to use:** logging a set should take less than 10 seconds.
2. **Mobile-first:** the primary interaction is one-handed use on a phone.
3. **Private by default:** personal progress is not visible to others unless the user later opts in.
4. **Encouraging, not tacky:** use grounded, human feedback instead of gamified noise.
5. **Health over streak pressure:** support consistency while allowing rest, illness, and adaptation.
6. **Free and accessible:** the core tracker remains free and simple.
7. **Progressive disclosure:** start simple; reveal planning, insights, and sharing only when useful.

## 4. Target user

### Primary persona: Personal health builder

* Wants to become stronger or more consistent without committing to long workouts.
* Has a busy day and needs movement that can fit into small openings.
* Likes the clarity of a daily target but dislikes public bragging or competitive fitness apps.
* Wants to see long-term progress and feel gently encouraged.

### Early use cases

* Add supported exercises such as push-ups, planks, and squats to a personal exercise library.
* Start from a monthly goal that is split into four manageable phases with recovery space.
* Set today's goal to 100 push-ups, 180 plank seconds, 100 squats, or another configured exercise target.
* Complete a small set between meetings and bank it immediately into today's training session.
* See how much remains today and how the current phase is progressing.
* Finish the daily goal and get a calm completion moment.
* Review completed days, missed days, break days, and trends over time.

## 5. MVP scope

The MVP should be usable as a personal daily tracker before any account, sync, or sharing features are added.

### In scope

* PWA installability for mobile.
* Local-first data storage.
* Exercise creation and selection.
* Daily goal creation from an exercise target.
* Quick set logging.
* Today's progress summary.
* Completion state when the daily goal is reached.
* Basic history view.
* Simple settings for default goal and exercise label.
* Encouraging microcopy.
* Data export as JSON or CSV.

### Out of scope for MVP

* Public leaderboards.
* Paid plans.
* Social feeds.
* Complex coaching plans.
* Wearable integrations.
* Cloud accounts and sync.
* Multiple simultaneous public challenges.
* Advanced exercise programming or generated coaching plans.

## 6. Core user journeys

### Journey A: Start today

1. User opens the PWA.
2. User sees a simple setup screen if no goal exists.
3. User chooses an exercise name and daily target.
4. App creates today's training session and lands on the daily tracker.

Acceptance criteria:

* Setup can be completed in under one minute.
* The app works without account creation.
* The next obvious action is to log the first set.

### Journey B: Bank a set

1. User opens the app during the day.
2. User taps a quick-add amount or enters a custom amount.
3. App immediately updates progress, remaining amount, and today's log.
4. User closes the app.

Acceptance criteria:

* Common set amounts are available as one-tap actions.
* Custom values are supported.
* Progress persists after refresh or app relaunch.
* The app prevents accidental negative totals.

### Journey C: Finish the daily goal

1. User logs enough sets to reach or exceed the daily target.
2. App marks the day complete.
3. User receives a calm completion message.
4. Extra reps are recorded but do not create pressure to overperform tomorrow.

Acceptance criteria:

* Completion is clearly visible.
* Copy avoids guilt or excessive hype.
* Over-target progress is preserved.

### Journey D: Review history

1. User opens history.
2. User sees recent days with completion state and total banked amount.
3. User can identify consistency over time.

Acceptance criteria:

* History works from local data.
* Completed, partial, missed, and rest days can be represented.
* Empty states explain what will appear after use.

## 7. Feature breakdown

### Daily tracker

The daily tracker is the home screen. A day tracks one active training session made up of one or more logged sets for the selected exercise.

Required elements:

* Date.
* Exercise label.
* Daily target.
* Banked total.
* Remaining amount.
* Progress indicator.
* Quick-add set buttons.
* Custom set input.
* Recent set list.
* Completion message.

### Exercise library

The first implementation should allow users to create and edit exercises before building more advanced plans.

Initial suggested exercises:

* **Push-ups** using reps.
* **Planks** using seconds.
* **Squats** using reps.

These three provide a simple upper-body, core, and lower-body starting set while keeping logging easy. The library should also support a custom exercise name and unit so the product is not locked to these defaults.

Exercise fields:

* Name.
* Unit: reps, seconds, minutes, or custom.
* Default daily target.
* Quick-add presets.
* Optional notes or form cues.

### Goal settings

Users can configure:

* Exercise label, e.g. push-ups, squats, lunges, minutes walking, plank seconds.
* Unit.
* Daily target number.
* Quick-add presets.
* Optional rest-day behavior.

### History

History should initially include:

* Day.
* Target.
* Total banked.
* Completion state.
* Number of sets.

Later history can include weekly and monthly insights.

### Data export

Users should be able to export their personal data. This reinforces trust and avoids lock-in.

## 8. Concept model

The app should use a clear hierarchy so it can start simple and later support richer programming without rewriting the product language.

```text
Exercise -> Set -> Training Session -> Plan
```

### Exercise

An exercise is a reusable movement definition, such as push-ups, planks, or squats. It defines the name, unit, default target, and quick-add presets.

### Set

A set is one banked effort for an exercise. For push-ups and squats, a set is usually a rep count. For planks, a set is usually seconds. Sets should be fast to add and easy to delete if entered by mistake.

### Training session

A training session is the collection of sets for a given exercise on a given day. The original daily tracker maps to today's active training session.

### Plan

A plan defines a longer goal and splits it into daily or phase-based targets. The first plan concept should support a monthly goal divided into four phases with a one-day break between phases.

Recommended first plan shape:

* Month-long goal for one exercise.
* Four phases of roughly one week each.
* One planned break day between phases.
* Phase targets that can ramp gently, stay flat, or deload.
* Daily targets generated from the current phase but editable by the user.

## 9. Data model draft

```ts
type ExerciseUnit = 'reps' | 'seconds' | 'minutes' | 'custom';

type Exercise = {
  id: string;
  name: string;
  unit: ExerciseUnit;
  defaultDailyTarget: number;
  quickAddPresets: number[];
  notes?: string;
};

type UserSettings = {
  defaultExerciseId?: string;
  encouragementTone: 'calm';
};

type TrainingPlan = {
  id: string;
  name: string;
  exerciseId: string;
  startsOn: string;
  endsOn: string;
  monthlyTarget: number;
  phases: PlanPhase[];
};

type PlanPhase = {
  id: string;
  planId: string;
  name: string;
  startsOn: string;
  endsOn: string;
  target: number;
  breakAfter: boolean;
};

type TrainingSession = {
  id: string;
  date: string; // YYYY-MM-DD in user's local timezone
  exerciseId: string;
  planId?: string;
  phaseId?: string;
  target: number;
  sets: ExerciseSet[];
  status: 'not_started' | 'partial' | 'complete' | 'break' | 'rest';
};

type ExerciseSet = {
  id: string;
  sessionId: string;
  amount: number;
  createdAt: string;
  note?: string;
};
```

Derived values:

* `totalBanked = sum(sets.amount)`
* `remaining = max(target - totalBanked, 0)`
* `percentComplete = min(totalBanked / target, 1)`

## 10. UX and tone

### Tone words

* Steady
* Capable
* Warm
* Practical
* Respectful
* Quietly motivating

### Avoid

* Shame language.
* Fitness influencer energy.
* Excessive confetti or badges.
* Ranking people.
* Copy that implies rest is failure.

### Example copy

* Start: "Set a small target for today. You can bank it in pieces."
* Partial: "Nice work. A few small sets can still add up."
* Complete: "Goal banked for today. That counts."
* Missed day: "Some days need space. You can start again today."
* Rest day: "Rest supports progress too."

## 11. Information architecture

MVP navigation should be minimal:

1. **Today** - primary training session tracker.
2. **Exercises** - exercise library and defaults.
3. **Plan** - current monthly goal and four-phase progress.
4. **History** - past days and consistency.
5. **Settings** - presets, export, reset, and app preferences.

## 12. Technical direction

Recommended initial stack:

* Next.js app with TypeScript.
* Mobile-first responsive CSS.
* PWA manifest and service worker support.
* Local storage or IndexedDB for the first release.
* Lightweight state management using React state plus persistence helpers.
* No backend for MVP.

Non-functional requirements:

* Works offline after first load.
* Lighthouse PWA fundamentals should pass before launch.
* Initial load should stay small.
* Accessibility should be considered from the first screen: semantic HTML, labels, focus states, and sufficient color contrast.

## 13. BMAD-style workflow

This project should use a lightweight BMAD-inspired workflow: define the business value, map the user and market need, outline architecture, then design and deliver incrementally.

### B - Business and behavior brief

Goal: clarify why the product exists and what behavior it should support.

Artifacts:

* Vision statement.
* Product principles.
* MVP scope.
* Success metrics.

Decisions:

* Personal-first tracker before social features.
* Long-term health before short-term competition.
* Free core product.

### M - Market and motivation model

Goal: identify the motivating loop without copying a campaign product wholesale.

Artifacts:

* Persona.
* User journeys.
* Tone guidelines.
* Differentiation notes.

Decisions:

* Motivation comes from completion, visibility of progress, and self-trust.
* Sharing is deferred until the product is useful privately.

### A - Architecture and app plan

Goal: choose the simplest technical shape that can ship quickly and evolve.

Artifacts:

* Stack choice.
* Data model.
* Navigation map.
* Offline/local-first persistence plan.

Decisions:

* Next.js PWA.
* Local-first storage for MVP.
* No auth or backend until sharing/sync is needed.

### D - Design and delivery loop

Goal: turn the spec into small, testable increments.

Artifacts:

* Screen checklist.
* Story backlog.
* Acceptance criteria.
* Release checklist.

Decisions:

* Build the exercise library and Today screen first.
* Add the monthly plan and history second.
* Add settings/export third.

## 14. Initial backlog

### Epic 1: App foundation

* Create Next.js TypeScript app structure.
* Add mobile-first layout shell.
* Add PWA manifest metadata.
* Add app icons placeholder.
* Add offline-readiness plan.

### Epic 2: Exercise library MVP

* Seed push-ups, planks, and squats.
* Add create exercise flow.
* Add edit exercise defaults.
* Add unit-specific quick-add presets.
* Persist exercises locally.

### Epic 3: Daily tracker MVP

* Create setup flow for default exercise and daily target.
* Render today's training session.
* Add quick-add set buttons.
* Add custom set input.
* Allow deleting mistaken sets.
* Persist daily training sessions locally.
* Show progress, remaining amount, and completion state.

### Epic 4: Monthly plan MVP

* Create a monthly goal for one exercise.
* Split the month into four phases.
* Add one planned break day between phases.
* Show current phase progress.
* Generate editable daily session targets from phase targets.

### Epic 5: History

* Store daily records by local date.
* Show recent daily summaries.
* Support completed, partial, missed, and rest states.
* Add empty state copy.

### Epic 6: Settings and ownership

* Edit default exercise label and target.
* Edit quick-add presets.
* Export data.
* Reset local data with confirmation.

### Epic 7: Later sharing, optional only

* Explore private share cards.
* Explore invite-only accountability circles.
* Avoid public ranking by default.

## 15. Success metrics

MVP success should be measured by whether a single person can use the tracker repeatedly without friction.

Suggested metrics once analytics are available:

* Time to first logged set.
* Daily completion rate.
* Number of sets per completed day.
* Return usage after 7 and 30 days.
* Export usage and reset usage.
* Qualitative feedback on tone.

No analytics should be added before there is a clear privacy policy and user consent approach.

## 16. Product decisions

1. **One active exercise per day for MVP:** users can maintain an exercise library, but today tracks one active training session to keep the mobile flow fast.
2. **Seed push-ups, planks, and squats:** this gives upper-body, core, and lower-body coverage while still allowing custom exercises.
3. **Monthly goal distribution:** split the month into four phases with a gentle ramp by default, while allowing users to edit phase targets.
4. **Break days:** include one planned break day between phases and allow extra manual rest days when needed.
5. **Missed days:** infer missed days in history rather than eagerly creating empty records.
6. **Name:** keep WorkoutChallenge as the working product and repo name until the first usable prototype proves the core loop.
7. **Notifications:** defer push notifications until the tracker is useful without interruption or permission friction.
8. **Database:** use Neon Postgres for the cloud-ready persistence model, with local-first UI behavior still treated as the experience goal.
