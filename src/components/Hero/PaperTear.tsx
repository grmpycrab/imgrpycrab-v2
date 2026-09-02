// Deterministic pseudo-random noise, seeded per strip index only —
// computed once via useMemo, never recomputed on scroll, so edges stay stable.
const seededNoise = (seed: number, x: number): number => {
  const v = Math.sin(seed * 12.9898 + x * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/** Generates a jagged clip-path polygon for one vertical "torn paper" strip. */
export const generateStripClipPath = (index: number, total: number): string => {
  const stripWidth = 100 / total;
  const left = index * stripWidth;
  const segments = 6;
  const top: string[] = [];
  const bottom: string[] = [];

  for (let s = 0; s <= segments; s++) {
    const x = left + (stripWidth * s) / segments;
    const jitter = (seededNoise(index + 1, s) - 0.5) * 3; // +-1.5%
    top.push(`${x + jitter}% ${jitter}%`);
  }
  for (let s = segments; s >= 0; s--) {
    const x = left + (stripWidth * s) / segments;
    const jitter = (seededNoise(index + 99, s) - 0.5) * 3;
    bottom.push(`${x + jitter}% ${100 + jitter}%`);
  }

  return `polygon(${top.join(', ')}, ${bottom.join(', ')})`;
};