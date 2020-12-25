import { pipe } from './pipe'

type Either<T> = T | Error

function bindEither<I, R>(f: (x: I) => Either<R>) {
  return (m: Either<I>) => (m instanceof Error ? m : f(m))
}
const decrDivide: (x: number) => Either<number> = pipe(
  bindEither(x => x - 1),
  bindEither(x => (x === 0 ? Error('can not divide by zero') : 100 / x)),
)
const decrDivideTwice: (x: number) => Either<number> = pipe(
  bindEither(decrDivide),
  bindEither(decrDivide),
)

// decrDivide(x)  ->  100 / (x - 1)
console.log(decrDivide(11)) // 100 / (11 - 1)  ->  10
console.log(decrDivide(101)) // 100 / (101 - 1)  ->  1
console.log(decrDivide(1)) // 100 / (1 - 1)  ->  Error: can not divide by zero

// decrDivideTwice(x)  ->  100 / ((100 / (x - 1)) - 1)

console.log(decrDivideTwice(101))
// 100 / ((100 / (101 - 1)) - 1)
// ->  100 / (1 - 1)
// ->  Error: can not divide by zero

console.log(decrDivideTwice(1001))
// 100 / ((100 / (1001 - 1)) - 1)
// ->  100 / (0.1 - 1)
// ->  -111.11111111111111
