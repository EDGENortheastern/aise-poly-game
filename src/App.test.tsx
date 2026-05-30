import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the game title', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1, name: /polygon quiz/i });
    expect(heading).toBeInTheDocument();
  });

  it('mounts the quiz game on the first question', () => {
    render(<App />);
    expect(screen.getByText(/question 1 of 5/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
