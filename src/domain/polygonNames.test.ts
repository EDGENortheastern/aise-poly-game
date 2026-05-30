import {
  getPolygonName,
  isPolygon,
  MIN_POLYGON_SIDES,
  MAX_POLYGON_SIDES,
} from './polygonNames';

describe('getPolygonName', () => {
  it('names the common polygons', () => {
    expect(getPolygonName(3)).toBe('triangle');
    expect(getPolygonName(4)).toBe('quadrilateral');
    expect(getPolygonName(5)).toBe('pentagon');
    expect(getPolygonName(6)).toBe('hexagon');
    expect(getPolygonName(8)).toBe('octagon');
    expect(getPolygonName(10)).toBe('decagon');
    expect(getPolygonName(20)).toBe('icosagon');
  });

  it('has a single lowercase word for every polygon from 3 to 20 sides', () => {
    for (let sides = MIN_POLYGON_SIDES; sides <= MAX_POLYGON_SIDES; sides++) {
      expect(getPolygonName(sides)).toMatch(/^[a-z]+$/);
    }
  });

  it('rejects shapes with fewer than 3 sides — they are not polygons', () => {
    expect(() => getPolygonName(0)).toThrow(/not a polygon/i);
    expect(() => getPolygonName(1)).toThrow(/not a polygon/i);
    expect(() => getPolygonName(2)).toThrow(/not a polygon/i);
  });

  it('rejects more than 20 sides as outside the supported range', () => {
    expect(() => getPolygonName(21)).toThrow(/range/i);
  });
});

describe('isPolygon', () => {
  it('is true when a shape has at least 3 sides', () => {
    expect(isPolygon(3)).toBe(true);
    expect(isPolygon(7)).toBe(true);
    expect(isPolygon(20)).toBe(true);
  });

  it('is false for 0, 1 or 2 sides', () => {
    expect(isPolygon(0)).toBe(false);
    expect(isPolygon(1)).toBe(false);
    expect(isPolygon(2)).toBe(false);
  });
});
