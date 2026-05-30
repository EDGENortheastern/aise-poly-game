export type PolygonSvgProps = {
  sides: number;
  size?: number;
};

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

export function PolygonSvg({ sides, size = 240 }: PolygonSvgProps) {
  const center = size / 2;
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
        fill="#c8eaf7"
        stroke="#2d7496"
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </svg>
  );
}
