import { pipe } from './pipe'

// The term Monad is used in comments of this file as defined in Haskell, i.e.
//
//     class Monad m where
//       (>>=)  :: m a -> (  a -> m b) -> m b
//       (>>)   :: m a ->  m b         -> m b
//       return ::   a                 -> m a
//       fail   :: String -> m a
//
//       m >> k =  m >>= \_ -> k
//
// See https://wiki.haskell.org/Monad#Monad_class

// ----------------------------------------------------------
// Functional Promise (called Task to avoid naming conflicts)
// ----------------------------------------------------------

type Task<R, E> = (callbacks: {
  /** Monad `return` definition */
  resolve: (result: R) => void
  /** Monad `fail` definition */
  reject: (error: E) => void
}) => any

// Example that creates a Task
function sleep(seconds): Task<number, never> {
  return ({ resolve, reject }) =>
    setTimeout(() => resolve(seconds), seconds * 1000)
}

// Monad `bind` definition of Task with
//   * `resolve` as Monad `return` definition
//   * `reject` as Monad `fail` definition
//
// ---\--- return --[ bind(x => fn(x)) ]--\-- resolve --->
//     \-- fail ---------------------------\--- reject --->
const bindTask = f => task => ({ resolve, reject }) =>
  task({
    resolve: result => f(result)({ resolve, reject }),
    reject,
  })

// Not part of the Monad definition or rather another `bind` implementation
// that is the inverted version of the regular `bind` definition above with
//   * `reject` as Monad `return` definition
//   * `resolve` as Monad `fail` definition
//
// ---\--- return -----------------------------/-- resolve -->
//     \-- fail --[ catchError(e => fn(e)) ]--/--- reject --->
const catchError = f => task => ({ resolve, reject }) =>
  task({
    resolve,
    reject: error => f(error)({ resolve, reject }),
  })

const taskExamplePipe = pipe(
  bindTask(x => ({ resolve, reject }) => resolve(x + 10)),
  bindTask(x => ({ resolve, reject }) => reject('some error')),
  bindTask(x => ({ resolve, reject }) => resolve(x * 2)),
  catchError(error => ({ resolve, reject }) => resolve(0)),
  bindTask(x => ({ resolve, reject }) => resolve(x + 100)),
)

taskExamplePipe(sleep(1))({
  resolve: x => console.log(`task finished with result ${x}`),
  reject: e => console.log(`task finished with error ${e}`),
})

// Helper similar to `Promise.resolve`
const resolveTask = x => ({ resolve, reject }) => resolve(x)
// Helper similar to `Promise.reject`
const rejectTask = e => ({ resolve, reject }) => reject(e)

// Example with helpers
const taskExample2Pipe = pipe(
  bindTask(x => resolveTask(x + 10)),
  bindTask(x => rejectTask('some error')),
  bindTask(x => resolveTask(x * 2)),
  catchError(error => resolveTask(0)),
  bindTask(x => resolveTask(x + 100)),
)

taskExample2Pipe(sleep(1))({
  resolve: x => console.log(`task finished with result ${x}`),
  reject: e => console.log(`task finished with error ${e}`),
})

// ---------------
// Regular Promise
// ---------------

// Monad `bind` definition of Promise with
//   * `Promise.resolve` as Monad `return` definition
//   * `Promise.reject` as Monad `fail` definition
//
// ---\--- return --[ bind(x => fn(x)) ]--\-- resolve --->
//     \-- fail ---------------------------\--- reject --->
const bind = f => p => p.then(f)

// Not part of the Monad definition or rather another `bind` implementation
// that is the inverted version of the regular `bind` definition above with
//   * `Promise.reject` as Monad `return` definition
//   * `Promise.resolve` as Monad `fail` definition
//
// ---\--- return ------------------------/-- resolve -->
//     \-- fail --[ catch(e => fn(e)) ]--/--- reject --->
const catchPromiseError = f => p => p.catch(f)

const promiseExamplePipe = pipe(
  // Function passed to bind (then-method) of Promise is aware of Monad context,
  // i.e. returns a Promise
  bind(x => Promise.resolve(x + 1)),
  // but bind is overloaded and calls resolve internally if passed function is
  // not aware of Monad context, i.e. returns a non-Promise value that is passed
  // internally to resolve.
  bind(x => x * 2),
  // If function is aware of Monad context, it may fail (reject).
  // Otherwise, it can not fail.
  bind(x =>
    x >= 0 ? x : Promise.reject(`expected positive number, but got ${x}`),
  ),
  // No helpers used
  bind(x => new Promise((resolve, reject) => resolve(x + 1))),
  bind(x => console.log(`Promise finished with result: ${x}`)),
  catchPromiseError(e => console.error(`Promise finished with error: ${e}`)),
)

// Examples

promiseExamplePipe(Promise.resolve(4))
// Promise finished with result: 10

promiseExamplePipe(Promise.resolve(-4))
// Promise finished with error: expected positive number, but got -6

promiseExamplePipe(Promise.reject('initial error'))
// Promise finished with error: initial error
