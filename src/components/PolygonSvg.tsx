// ── Step 3, GREEN ────────────────────────────────────────────────────────────
// A presentational component: it takes data in (props) and draws SVG out. It
// holds no state and makes no decisions about the quiz — that separation keeps
// it trivial to test and reuse.

// A `type` alias describes the exact shape of this component's props. `sides` is
// required; `size` is optional (the `?`). Pass the wrong prop type — or forget
// `sides` — and TypeScript reports it at compile time, in the editor.
export type PolygonSvgProps = {
  sides: number;
  /** Width/height of the square SVG canvas, in pixels. */
  size?: number;
};

/**
 * Compute the (x, y) corners of a regular polygon, evenly spaced around a
 * circle. We start at the top (-90°) so shapes look upright, then step around
 * by a full turn (2π) divided into `sides` equal slices.
 */
function computeVertices(
  sides: number,
  cx: number,
  cy: number,
  radius: number,
): Array<[number, number]> {
  const vertices: Array<[number, number]> = [];
  const startAngle = -Math.PI / 2; // straight up
  for (let i = 0; i < sides; i++) {
    const angle = startAngle + (i * 2 * Math.PI) / sides;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    // Round to 2 decimals to keep the points string tidy.
    vertices.push([Math.round(x * 100) / 100, Math.round(y * 100) / 100]);
  }
  return vertices;
}

export function PolygonSvg({ sides, size = 240 }: PolygonSvgProps) {
  const center = size / 2;
  // 0.45 * size leaves a small margin so the stroke never clips the edge,
  // which also guarantees every vertex stays inside the 0..size viewport.
  const radius = size * 0.45;

  const points = computeVertices(sides, center, center, radius)
    .map(([x, y]) => `${x},${y}`)
    .join(' ');

  return (
    <svg
      role="img"
      aria-label="A polygon to identify — count its sides"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <polygon
        points={points}
        fill="#c7d2fe"
        stroke="#4338ca"
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </svg>
  );
}
