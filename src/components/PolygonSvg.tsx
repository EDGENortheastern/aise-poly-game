export type PolygonSvgProps = {
  sides: number;
  size?: number;
  colorIndex?: number;
};

const COLOR_PAIRS = [
  { fill: '#c8eaf7', stroke: '#0d3353' },
  { fill: '#bfe2c6', stroke: '#1b4538' },
  { fill: '#faae80', stroke: '#d74b19' },
  { fill: '#ffe1a5', stroke: '#e2a854' },
];

function computeVertices(
  sides: number,
  cx: number,
  cy: number,
  radius: number,
): Array<[number, number]> {
  const vertices: Array<[number, number]> = [];
  const startAngle = -Math.PI / 2;
  for (let i = 0; i < sides; i++) {
    const angle = startAngle + (i * 2 * Math.PI) / sides;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    vertices.push([Math.round(x * 100) / 100, Math.round(y * 100) / 100]);
  }
  return vertices;
}

export function PolygonSvg({ sides, size = 240, colorIndex = 0 }: PolygonSvgProps) {
  const center = size / 2;
  const radius = size * 0.45;
  const { fill, stroke } = COLOR_PAIRS[colorIndex % COLOR_PAIRS.length]!;

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
        fill={fill}
        stroke={stroke}
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </svg>
  );
}
