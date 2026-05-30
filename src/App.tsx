import { PolygonSvg } from './components/PolygonSvg';

// `React.FC` is one way to type a component, but the modern, recommended style
// is a plain function whose return type TypeScript infers as JSX.Element.
// For now App shows a preview polygon so we can see the SVG render. The full
// quiz flow gets wired up in a later step (still test-first).
export default function App() {
  return (
    <main>
      <h1>Polygon Quiz</h1>
      <p>Preview — the quiz logic arrives in the next steps.</p>
      <PolygonSvg sides={8} />
    </main>
  );
}
