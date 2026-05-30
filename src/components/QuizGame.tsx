// ── Step 5, GREEN ────────────────────────────────────────────────────────────
// The interactive component. It owns the round's state with React hooks and
// composes the pieces we already built and tested: PolygonSvg (Step 3) and the
// quiz engine (Step 4). Because those are proven, this component only has to
// orchestrate them.
import { useState, type FormEvent } from 'react';
import { PolygonSvg } from './PolygonSvg';
import { checkAnswer, generateRound, type Question } from '../domain/quizEngine';

export type QuizGameProps = {
  // How to build a round. Defaults to real randomness; tests inject a fixed
  // round. This is the same dependency-injection idea as in the engine.
  createRound?: () => Question[];
};

// The outcome of answering the current question: not yet answered, or the
// graded result. A union of string literals means TypeScript knows the only
// possible values are these three — typos like 'correctt' won't compile.
type Result = 'unanswered' | 'correct' | 'incorrect';

export function QuizGame({ createRound = () => generateRound() }: QuizGameProps) {
  const [round, setRound] = useState<Question[]>(createRound);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState<Result>('unanswered');
  const [isComplete, setIsComplete] = useState(false);

  const total = round.length;
  const isLastQuestion = index === total - 1;

  function resetRound(nextRound: Question[]) {
    setRound(nextRound);
    setIndex(0);
    setScore(0);
    setGuess('');
    setResult('unanswered');
    setIsComplete(false);
  }

  // ── Round complete screen ──────────────────────────────────────────────────
  if (isComplete) {
    return (
      <section aria-labelledby="result-heading">
        <h2 id="result-heading">Round complete!</h2>
        <p>
          You scored {score} of {total}.
        </p>
        <button type="button" onClick={() => resetRound(createRound())}>
          Play again
        </button>
      </section>
    );
  }

  // `round[index]` is typed `Question | undefined` because of
  // noUncheckedIndexedAccess; guarding here proves to TypeScript it exists.
  const current = round[index];
  if (current === undefined) {
    return <p>No questions available.</p>;
  }
  // Destructure the now-guaranteed values into primitives. TypeScript keeps the
  // narrowing for these consts even inside the handler closures below, whereas
  // it would widen `current` itself back to `Question | undefined` there.
  const { sides, answer } = current;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (result !== 'unanswered') return;
    const correct = checkAnswer(sides, guess);
    setResult(correct ? 'correct' : 'incorrect');
    if (correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (isLastQuestion) {
      setIsComplete(true);
      return;
    }
    setIndex((i) => i + 1);
    setGuess('');
    setResult('unanswered');
  }

  return (
    <section aria-labelledby="question-heading">
      <p id="question-heading">
        Question {index + 1} of {total}
      </p>

      <PolygonSvg sides={sides} />

      {result === 'unanswered' ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="answer">Your answer</label>
          <br />
          <input
            id="answer"
            name="answer"
            autoComplete="off"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button type="submit" disabled={guess.trim() === ''}>
            Submit
          </button>
        </form>
      ) : (
        <div>
          <p>{result === 'correct' ? '✓ Correct!' : '✗ Not quite.'}</p>
          <p>
            The answer is <strong>{answer}</strong>.
          </p>
          <button type="button" onClick={handleNext}>
            {isLastQuestion ? 'See results' : 'Next'}
          </button>
        </div>
      )}
    </section>
  );
}
