import { render, screen } from '@testing-library/react';
import App from './App';

// ── Our first TDD step: a "sanity" test ──────────────────────────────────────
// The whole point of this test is NOT the assertion itself — it's to prove the
// machinery works end to end: Vitest runs, jsdom provides a DOM, React Testing
// Library renders a real component, and jest-dom matchers are available.
//
// The TDD rhythm we follow in every later step:
//   1. RED    — write a failing test that describes the behaviour we want.
//   2. GREEN  — write the minimum code to make it pass.
//   3. REFACTOR — clean up, with the test guarding against regressions.
describe('App', () => {
  it('renders the game title', () => {
    render(<App />);

    // `getByRole` queries the DOM the way a user (or screen reader) sees it:
    // an <h1> is the page's level-1 heading. This is the accessibility-first
    // query style RTL pushes you toward.
    const heading = screen.getByRole('heading', { level: 1, name: /polygon quiz/i });

    expect(heading).toBeInTheDocument();
  });
});
