// ── Step 2, GREEN ────────────────────────────────────────────────────────────
// The minimum code to make polygonNames.test.ts pass.
//
// A polygon is a closed shape with straight sides. The fewest sides that can
// close a shape is 3 (a triangle). So 0, 1 and 2 sides are NOT polygons — the
// quiz never asks about them, and this module refuses to name them.

/** Polygons must have at least this many sides. */
export const MIN_POLYGON_SIDES = 3;

/** The largest polygon this app knows how to name and draw. */
export const MAX_POLYGON_SIDES = 20;

// A `Record<number, string>` is TypeScript's type for "an object used as a
// lookup table from numbers to strings". Because tsconfig enables
// `noUncheckedIndexedAccess`, reading POLYGON_NAMES[sides] has type
// `string | undefined` — TypeScript forces us to handle the "missing" case,
// which is exactly the out-of-range guard we want.
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

/**
 * Is a shape with this many sides a polygon at all?
 * @param sides number of sides
 * @returns true when there are at least 3 sides
 */
export function isPolygon(sides: number): boolean {
  return sides >= MIN_POLYGON_SIDES;
}

/**
 * The canonical name of a polygon with the given number of sides.
 * @throws RangeError if `sides` is not a polygon (< 3) or above the supported max (> 20).
 */
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
