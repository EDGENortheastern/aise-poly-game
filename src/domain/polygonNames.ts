export const MIN_POLYGON_SIDES = 3;

export const MAX_POLYGON_SIDES = 20;

const POLYGON_NAMES: Record<number, string> = {
  3: 'triangle',
  4: 'quadrilateral',
  5: 'pentagon',
  6: 'hexagon',
  7: 'heptagon',
  8: 'octagon',
  9: 'nonagon',
  10: 'decagon',
  11: 'hendecagon',
  12: 'dodecagon',
  13: 'tridecagon',
  14: 'tetradecagon',
  15: 'pentadecagon',
  16: 'hexadecagon',
  17: 'heptadecagon',
  18: 'octadecagon',
  19: 'enneadecagon',
  20: 'icosagon',
};

export function isPolygon(sides: number): boolean {
  return sides >= MIN_POLYGON_SIDES;
}

export function getPolygonName(sides: number): string {
  if (sides < MIN_POLYGON_SIDES) {
    throw new RangeError(
      `A shape with ${sides} side(s) is not a polygon — polygons need at least ${MIN_POLYGON_SIDES} sides.`,
    );
  }

  const name = POLYGON_NAMES[sides];
  if (name === undefined) {
    throw new RangeError(
      `${sides} sides is outside the supported range (${MIN_POLYGON_SIDES}–${MAX_POLYGON_SIDES}).`,
    );
  }

  return name;
}
