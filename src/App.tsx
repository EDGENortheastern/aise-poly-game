import { QuizGame } from './components/QuizGame';

// The top-level component. It just frames the page and hands control to
// QuizGame, which owns the round. Each piece below it was built test-first.
export default function App() {
  return (
    <main>
      <h1>Polygon Quiz</h1>
      <p className="tagline">Count the sides, name the shape.</p>
      <QuizGame />
    </main>
  );
}
