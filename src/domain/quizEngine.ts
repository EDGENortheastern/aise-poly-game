import {
  getPolygonName,
  MIN_POLYGON_SIDES,
  MAX_POLYGON_SIDES,
} from './polygonNames';

export const ROUND_SIZE = 5;

export type Question = {
  sides: number;
  answer: string;
};

const SYNONYMS: Record<number, string[]> = {
  3: ['trigon'],
  4: ['square', 'tetragon', 'quadrangle'],
  9: ['enneagon'],
  11: ['undecagon'],
  12: ['duodecagon'],
  13: ['triskaidecagon'],
  19: ['nonadecagon'],
};

function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function acceptedAnswers(sides: number): string[] {
  return [getPolygonName(sides), ...(SYNONYMS[sides] ?? [])];
}

export function checkAnswer(sides: number, guess: string): boolean {
  const normalizedGuess = normalize(guess);
  if (normalizedGuess === '') return false;
  return acceptedAnswers(sides).some(
    (candidate) => normalize(candidate) === normalizedGuess,
  );
}

export function generateRound(
  size: number = ROUND_SIZE,
  rng: () => number = Math.random,
): Question[] {
  const available: number[] = [];
  for (let s = MIN_POLYGON_SIDES; s <= MAX_POLYGON_SIDES; s++) {
    available.push(s);
  }

  const questions: Question[] = [];
  for (let i = 0; i < size && available.length > 0; i++) {
    const index = Math.floor(rng() * available.length);
    const sides = available.splice(index, 1)[0]!;
    questions.push({ sides, answer: getPolygonName(sides) });
  }

  return questions;
}
