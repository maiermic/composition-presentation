export function zip<X, Y>(xs: ArrayLike<X>, ys: ArrayLike<Y>): [X, Y][] {
  const zipped: [X, Y][] = []
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]])
  }
  return zipped
}
