type F<P, R> = (p: P) => R

type Pipe2<T1, T2, R> = [F<T1, T2>, F<T2, R>]
type Pipe3<T1, T2, T3, R> = [F<T1, T2>, ...Pipe2<T2, T3, R>]
type Pipe4<T1, T2, T3, T4, R> = [F<T1, T2>, ...Pipe3<T2, T3, T4, R>]
type Pipe5<T1, T2, T3, T4, T5, R> = [F<T1, T2>, ...Pipe4<T2, T3, T4, T5, R>]
type Pipe6<T1, T2, T3, T4, T5, T6, R> = [
  F<T1, T2>,
  ...Pipe5<T2, T3, T4, T5, T6, R>
]

export function pipe<T1, R>(f1: F<T1, R>): F<T1, R>
export function pipe<T1, T2, R>(...fns: Pipe2<T1, T2, R>): F<T1, R>
export function pipe<T1, T2, T3, R>(...fns: Pipe3<T1, T2, T3, R>): F<T1, R>
export function pipe<T1, T2, T3, T4, R>(
  ...fns: Pipe4<T1, T2, T3, T4, R>
): F<T1, R>
export function pipe<T1, T2, T3, T4, T5, R>(
  ...fns: Pipe5<T1, T2, T3, T4, T5, R>
): F<T1, R>
export function pipe<T1, T2, T3, T4, T5, T6, R>(
  ...fns: Pipe6<T1, T2, T3, T4, T5, T6, R>
): F<T1, R>
export function pipe(...fns) {
  return x => fns.reduce((res, f) => f(res), x)
}
