import { useState, type FormEvent } from 'react';
import { PolygonSvg } from './PolygonSvg';
import { checkAnswer, generateRound, type Question } from '../domain/quizEngine';

export type QuizGameProps = {
  createRound?: () => Question[];
};

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

  if (isComplete) {
    return (
      <section aria-labelledby="result-heading">
        <h2 id="result-heading">Round complete!</h2>
        <p className="score">
          You scored {score} of {total}.
        </p>
        <button type="button" onClick={() => resetRound(createRound())}>
          Play again
        </button>
      </section>
    );
  }

  const current = round[index];
  if (current === undefined) {
    return <p>No questions available.</p>;
  }
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

      <PolygonSvg sides={sides} colorIndex={index} />

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
          <p
            className={
              result === 'correct'
                ? 'feedback feedback--correct'
                : 'feedback feedback--incorrect'
            }
          >
            {result === 'correct' ? '✓ Correct!' : '✗ Not quite.'}
          </p>
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
