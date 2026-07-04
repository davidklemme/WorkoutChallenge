# WorkoutChallenge

WorkoutChallenge is a mobile-first personal challenge tracker for daily movement sets. It is inspired by the approachable community energy of short-form fitness challenges, but is designed for ongoing everyday health rather than a one-off campaign or public performance.

The first product goal is to make it usable fast as a free personal progressive web app (PWA): choose a daily goal, log short sets throughout the day, bank progress, finish the day, and build a motivating long-term record.

## Product direction

* **Personal first:** private by default, no social comparison, no leaderboards in the MVP.
* **Daily continuity:** every day has a clear goal and a clean completion loop.
* **Exercise structure:** start with exercises, log sets, complete daily training sessions, and optionally follow a monthly plan.
* **Short sets:** logging should take seconds and fit between ordinary moments.
* **Encouraging, not tacky:** calm copy, practical nudges, and meaningful progress cues.
* **Long-term health:** consistency, recovery, adaptation, and sustainability matter more than showing off.
* **Free by default:** core tracking and history stay free.

## Specification

The initial BMAD-style product specification and delivery workflow lives in [`docs/product-spec.md`](docs/product-spec.md).

## App stack

* Next.js App Router with TypeScript.
* Tailwind CSS with shadcn-style local UI components.
* Neon Postgres-ready schema through Drizzle ORM.
* Mobile-first PWA shell.

Copy `.env.example` to `.env.local` and set `DATABASE_URL` to a Neon Postgres connection string before running database migrations.
