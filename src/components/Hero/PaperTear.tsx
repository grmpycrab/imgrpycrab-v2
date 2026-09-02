const seededNoise = (seed: number, x: number): number => {
  const v = Math.sin(seed * 12.9898 + x * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

const SEGMENTS = 6;
const OVERLAP = 1.5; // % — strips overlap slightly so rounding never leaves a visible gap

// One shared jitter value per internal dividing line, reused by the strip
// on both sides of it — so neighboring edges always meet exactly.
const boundaryJitter = (total: number) => {
  const top: number[] = [];
  const bottom: number[] = [];
  for (let b = 0; b <= total; b++) {
    top.push((seededNoise(1, b) - 0.5) * 3);
    bottom.push((seededNoise(99, b) - 0.5) * 3);
  }
  return { top, bottom };
};

/** Generates jagged, seam-free clip-path polygons for all strips at once. */
export const generateStrips = (total: number): string[] => {
  const stripWidth = 100 / total;
  const { top: topJ, bottom: bottomJ } = boundaryJitter(total);

  return Array.from({ length: total }, (_, i) => {
    const left = i * stripWidth - (i === 0 ? 0 : OVERLAP);
    const right = (i + 1) * stripWidth + (i === total - 1 ? 0 : OVERLAP);

    const topStart = topJ[i];
    const topEnd = topJ[i + 1];
    const bottomStart = bottomJ[i];
    const bottomEnd = bottomJ[i + 1];

    const top: string[] = [];
    const bottom: string[] = [];

    for (let s = 0; s <= SEGMENTS; s++) {
      const t = s / SEGMENTS;
      const x = left + (right - left) * t;
      top.push(`${x}% ${topStart + (topEnd - topStart) * t}%`);
    }
    for (let s = SEGMENTS; s >= 0; s--) {
      const t = s / SEGMENTS;
      const x = left + (right - left) * t;
      bottom.push(`${x}% ${100 + bottomStart + (bottomEnd - bottomStart) * t}%`);
    }

    return `polygon(${top.join(', ')}, ${bottom.join(', ')})`;
  });
};