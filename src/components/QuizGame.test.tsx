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
  return render(<QuizGame createRound={() => FIXED_ROUND.map((q) => ({ ...q }))} />);
}

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

    await answerCurrent(user, 'triangle');
    await answerCurrent(user, 'wrong');
    await answerCurrent(user, 'pentagon');
    await answerCurrent(user, 'wrong');
    await answerCurrent(user, 'octagon', true);

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
