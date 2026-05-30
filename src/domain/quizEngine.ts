// ── Step 4, GREEN ────────────────────────────────────────────────────────────
// Pure game logic. Builds on Step 2's polygonNames module — note how the typed
// boundary between modules lets us compose with confidence.
import {
  getPolygonName,
  MIN_POLYGON_SIDES,
  MAX_POLYGON_SIDES,
} from './polygonNames';

/** How many questions make up one round. The brief: 5 per round. */
export const ROUND_SIZE = 5;

/**
 * A single quiz question. `Question` is our data model — every component that
 * displays a question can rely on exactly these fields existing, with these
 * types. That is the core value of TypeScript: the shape of data is checked.
 */
export type Question = {
  /** Number of sides of the polygon to identify (3..20). */
  sides: number;
  /** The canonical correct name, shown when the answer is revealed. */
  answer: string;
};

// Extra answers we accept beyond the canonical name, keyed by side count.
// The drawn polygons are regular, so e.g. a 4-sided regular polygon really is a
// square — accepting it keeps the quiz friendly. `enneagon` is just an older
// spelling of nonagon, etc.
const SYNONYMS: Record<number, string[]> = {
  3: ['trigon'],
  4: ['square', 'tetragon', 'quadrangle'],
  9: ['enneagon'],
  11: ['undecagon'],
  12: ['duodecagon'],
  13: ['triskaidecagon'],
  19: ['nonadecagon'],
};

/** Lowercase, trim, and collapse internal whitespace for forgiving comparison. */
function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Every spelling we will accept for a polygon, canonical name first. */
export function acceptedAnswers(sides: number): string[] {
  return [getPolygonName(sides), ...(SYNONYMS[sides] ?? [])];
}

/** Is `guess` an acceptable name for a polygon with this many sides? */
export function checkAnswer(sides: number, guess: string): boolean {
  const normalizedGuess = normalize(guess);
  if (normalizedGuess === '') return false;
  return acceptedAnswers(sides).some(
    (candidate) => normalize(candidate) === normalizedGuess,
  );
}

/**
 * Build a round of `size` distinct random polygons.
 *
 * The random number generator is a *parameter* (defaulting to Math.random).
 * Injecting it is a classic testability technique: production uses real
 * randomness, tests pass a predictable function and assert exact output.
 */
export function generateRound(
  size: number = ROUND_SIZE,
  rng: () => number = Math.random,
): Question[] {
  // Pool of every valid polygon side-count: [3, 4, ..., 20].
  const available: number[] = [];
  for (let s = MIN_POLYGON_SIDES; s <= MAX_POLYGON_SIDES; s++) {
    available.push(s);
  }

  const questions: Question[] = [];
  for (let i = 0; i < size && available.length > 0; i++) {
    const index = Math.floor(rng() * available.length);
    // splice removes and returns the picked side-count; it can't be undefined
    // because `index` is always a valid position in a non-empty array.
    const sides = available.splice(index, 1)[0]!;
    questions.push({ sides, answer: getPolygonName(sides) });
  }

  return questions;
}
