// ── Step 3, RED ──────────────────────────────────────────────────────────────
// Now we test a *component* instead of a plain function. React Testing Library
// renders it into the jsdom DOM and we assert on what ended up in the document.
//
// The behaviour we want: given `sides`, draw an SVG <polygon> that has exactly
// one vertex per side, and keep every vertex inside the SVG viewport.
import { render } from '@testing-library/react';
import { PolygonSvg } from './PolygonSvg';

// Helper: parse an SVG `points="x1,y1 x2,y2 ..."` attribute into number pairs.
function parsePoints(polygon: SVGPolygonElement): Array<[number, number]> {
  const raw = polygon.getAttribute('points')?.trim() ?? '';
  return raw
    .split(/\s+/)
    .filter(Boolean)
    .map((pair) => {
      const [x, y] = pair.split(',').map(Number);
      return [x, y] as [number, number];
    });
}

describe('PolygonSvg', () => {
  it('renders an accessible SVG image', () => {
    const { getByRole } = render(<PolygonSvg sides={5} />);
    expect(getByRole('img')).toBeInTheDocument();
  });

  it('draws a polygon with exactly one vertex per side', () => {
    const { container } = render(<PolygonSvg sides={6} />);
    const polygon = container.querySelector('polygon');
    expect(polygon).not.toBeNull();
    expect(parsePoints(polygon!)).toHaveLength(6);
  });

  it('produces the right vertex count across the supported range', () => {
    for (const sides of [3, 4, 8, 12, 20]) {
      const { container } = render(<PolygonSvg sides={sides} />);
      const polygon = container.querySelector('polygon')!;
      expect(parsePoints(polygon)).toHaveLength(sides);
    }
  });

  it('keeps every vertex inside the SVG viewport', () => {
    const size = 200;
    const { container } = render(<PolygonSvg sides={7} size={size} />);
    const polygon = container.querySelector('polygon')!;
    for (const [x, y] of parsePoints(polygon)) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(size);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(size);
    }
  });
});
