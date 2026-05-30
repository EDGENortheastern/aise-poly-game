import { QuizGame } from './components/QuizGame';

export default function App() {
  return (
    <main>
      <h1>Polygon Quiz</h1>
      <p className="tagline">Count the sides, name the shape.</p>
      <QuizGame />
    </main>
  );
}
