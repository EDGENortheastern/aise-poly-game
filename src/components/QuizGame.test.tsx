// ── Step 5, RED ──────────────────────────────────────────────────────────────
// The interactive component. We drive it the way a real player would, using
// `@testing-library/user-event`: type into the box, click buttons, and assert
// on what the screen shows. We never reach into component state — only the
// rendered output, exactly what a user perceives.
//
// To keep tests deterministic we inject a fixed round via the `createRound`
// prop instead of relying on real randomness.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuizGame } from './QuizGame';
import type { Question } from '../domain/quizEngine';

const FIXED_ROUND: Question[] = [
  { sides: 3, answer: 'triangle' },
  { sides: 4, answer: 'quadrilateral' },
  { sides: 5, answer: 'pentagon' },
  { sides: 6, answer: 'hexagon' },
  { sides: 8, answer: 'octagon' },
];

function renderGame() {
  // Return a fresh copy each time so the component can never mutate our fixture.
  return render(<QuizGame createRound={() => FIXED_ROUND.map((q) => ({ ...q }))} />);
}

// Helper: answer the current question and advance to the next screen.
async function answerCurrent(
  user: ReturnType<typeof userEvent.setup>,
  guess: string,
  isLast = false,
) {
  await user.type(screen.getByLabelText(/your answer/i), guess);
  await user.click(screen.getByRole('button', { name: /submit/i }));
  await user.click(
    screen.getByRole('button', { name: isLast ? /see results/i : /next/i }),
  );
}

describe('QuizGame', () => {
  it('shows the first question, the counter and a polygon', () => {
    renderGame();
    expect(screen.getByText(/question 1 of 5/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('confirms a correct guess and reveals the answer', async () => {
    const user = userEvent.setup();
    renderGame();

    await user.type(screen.getByLabelText(/your answer/i), 'triangle');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/correct!/i)).toBeInTheDocument();
    expect(screen.getByText(/triangle/i)).toBeInTheDocument();
  });

  it('reveals the correct answer even when the guess is wrong', async () => {
    const user = userEvent.setup();
    renderGame();

    await user.type(screen.getByLabelText(/your answer/i), 'circle');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/not quite/i)).toBeInTheDocument();
    // The answer to question 1 (a triangle) is shown regardless.
    expect(screen.getByText(/triangle/i)).toBeInTheDocument();
  });

  it('advances to the next question', async () => {
    const user = userEvent.setup();
    renderGame();

    await answerCurrent(user, 'triangle');

    expect(screen.getByText(/question 2 of 5/i)).toBeInTheDocument();
  });

  it('scores correct answers and ends the round after 5 questions', async () => {
    const user = userEvent.setup();
    renderGame();

    await answerCurrent(user, 'triangle'); // correct
    await answerCurrent(user, 'wrong'); // wrong
    await answerCurrent(user, 'pentagon'); // correct
    await answerCurrent(user, 'wrong'); // wrong
    await answerCurrent(user, 'octagon', true); // correct (last)

    expect(screen.getByText(/round complete/i)).toBeInTheDocument();
    expect(screen.getByText(/3 of 5/i)).toBeInTheDocument();
  });

  it('lets the player start a new round', async () => {
    const user = userEvent.setup();
    renderGame();

    for (let i = 0; i < FIXED_ROUND.length; i++) {
      await answerCurrent(user, 'whatever', i === FIXED_ROUND.length - 1);
    }
    await user.click(screen.getByRole('button', { name: /play again/i }));

    expect(screen.getByText(/question 1 of 5/i)).toBeInTheDocument();
  });
});
