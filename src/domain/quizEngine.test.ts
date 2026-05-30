import {
  ROUND_SIZE,
  generateRound,
  acceptedAnswers,
  checkAnswer,
  type Question,
} from './quizEngine';

describe('checkAnswer', () => {
  it('accepts the exact canonical name', () => {
    expect(checkAnswer(5, 'pentagon')).toBe(true);
  });

  it('ignores case and surrounding whitespace', () => {
    expect(checkAnswer(8, '  OCTAGON ')).toBe(true);
  });

  it('accepts known synonyms', () => {
    expect(checkAnswer(4, 'square')).toBe(true);
    expect(checkAnswer(9, 'enneagon')).toBe(true);
  });

  it('rejects wrong, empty or whitespace-only answers', () => {
    expect(checkAnswer(5, 'hexagon')).toBe(false);
    expect(checkAnswer(5, '')).toBe(false);
    expect(checkAnswer(5, '   ')).toBe(false);
  });
});

describe('acceptedAnswers', () => {
  it('lists the canonical name first', () => {
    expect(acceptedAnswers(6)[0]).toBe('hexagon');
  });
});

describe('generateRound', () => {
  it('creates a round of the requested size (default ROUND_SIZE = 5)', () => {
    expect(generateRound()).toHaveLength(ROUND_SIZE);
    expect(generateRound(3)).toHaveLength(3);
  });

  it('only uses valid polygons (3..20 sides)', () => {
    for (const q of generateRound(10)) {
      expect(q.sides).toBeGreaterThanOrEqual(3);
      expect(q.sides).toBeLessThanOrEqual(20);
    }
  });

  it('never repeats a polygon within one round', () => {
    const sides = generateRound(10).map((q) => q.sides);
    expect(new Set(sides).size).toBe(sides.length);
  });

  it('pairs every question with an answer that passes checkAnswer', () => {
    for (const q of generateRound(5)) {
      expect(checkAnswer(q.sides, q.answer)).toBe(true);
    }
  });

  it('is deterministic when given an injected RNG (dependency injection)', () => {
    const alwaysFirst = () => 0;
    const round: Question[] = generateRound(3, alwaysFirst);
    expect(round.map((q) => q.sides)).toEqual([3, 4, 5]);
  });
});
