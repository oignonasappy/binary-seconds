export function findBestPacking(num: number, width: number, height: number) {
  const patterns = Array.from({ length: num }, (_, i) => i + 1)
    .flatMap(r =>
      Array.from({ length: num }, (_, i) => i + 1)
        .map(c => { return { c, r } }))
    .filter(p => p.r * p.c === num);

  const best = patterns.reduce((prev, curr) => {
    const s = Math.min(width / curr.c, height / curr.r);
    return s > (prev.largestArea ?? 0)
      ? { largestArea: s, bestPattern: curr }
      : { largestArea: prev.largestArea, bestPattern: prev.bestPattern }
  }, { largestArea: 0, bestPattern: patterns[0] });

  return {
    sideLength: best.largestArea,
    rows: best.bestPattern.r,
    cols: best.bestPattern.c,
    totalArea: best.largestArea * best.largestArea * num
  }
};