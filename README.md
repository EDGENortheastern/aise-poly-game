# Polygon Quiz — a TDD teaching project

A small single-page app (SPA) that quizzes you on polygon names. It **draws an
SVG polygon with N sides**, you **type its name**, and it **reveals the correct
answer**. A round is **5 questions**.

The real goal of this repo is to **demonstrate Test-Driven Development (TDD)**
with **React + TypeScript**, built one small, committable step at a time.

## Tech stack & why

| Tool | Role |
|------|------|
| **React** | Builds the UI from small, composable components. |
| **TypeScript** | Adds static types on top of JavaScript — errors are caught at compile time, before the code runs. |
| **Vite** | Fast dev server and build tool. |
| **Vitest** | Test runner. Reuses Vite's config, so tests and app are transformed identically. |
| **React Testing Library (RTL)** | Renders components and lets us query them *the way a user would* (by role, label, visible text) instead of by implementation details. |
| **jsdom** | A fake browser DOM so RTL can run in Node without a real browser. |

## What is TDD? The Red → Green → Refactor loop

We never write production code without a failing test first:

1. **🔴 Red** — write a test describing the behaviour you want. Run it. It fails
   (often it doesn't even compile — that counts as red, and TypeScript makes
   "red" appear earlier than in plain JS).
2. **🟢 Green** — write the *minimum* code to make the test pass. No more.
3. **🔵 Refactor** — improve the code's shape while the test keeps it correct.

Each numbered build step in this project is one or more turns of that loop, and
ends as a single git commit.

## Why TypeScript matters here

TypeScript describes the *shape* of our data and functions:

- A polygon-name lookup is typed `(sides: number) => string`, so calling it with
  a string is a compile error, not a runtime surprise.
- The quiz's data model (`Question`, `RoundState`) is expressed as `type`s, so
  the compiler guarantees every component receives exactly the props it expects.
- Editor autocomplete and refactoring become reliable because the types are the
  source of truth.

You'll see these types introduced step by step, each one motivated by a test.

## Commands

```bash
npm install        # install dependencies
npm test           # run Vitest in watch mode (the TDD driver's seat)
npm run test:run   # run the suite once (CI-style)
npm run dev        # start the app at http://localhost:5173
npm run build      # type-check + production build
```

## Build log (committable steps)

1. **Scaffold + tooling** — Vite/React/TS, Vitest + RTL wired up, this README,
   and a first sanity test proving the red→green loop works.
2. **polygonNames domain logic** — pure `getPolygonName` / `isPolygon`,
   demonstrating typed lookup tables and `noUncheckedIndexedAccess`.
3. **PolygonSvg component** — draws an N-sided SVG; typed props; RTL queries.
4. **Quiz engine** — `Question` model, forgiving `checkAnswer`, and
   `generateRound` with an injected RNG for deterministic tests.
5. **QuizGame component** — the interactive 5-question round, driven in tests
   with `user-event`; reveals the answer and tracks the score.
6. **App wiring + styles** — App hands off to QuizGame; the game is styled.

A note on the "0 to 20" range: a polygon needs **at least 3 sides**, so the quiz
draws shapes with **3–20 sides**. The naming function still covers the whole
range and explains why 0/1/2 aren't polygons.
