// Force file to be treated like a module to avoid redeclaration-conflicts
// with other files, see: https://stackoverflow.com/a/41300413/1065654
export let undefined

// const pipe = (g, f) => x => f(g(x))
function pipe(...fns) {
  return x => fns.reduce((res, f) => f(res), x)
}

type Task<R, E> = (callbacks: {
  resolve: (result: R) => void
  reject: (error: E) => void
}) => any

function sleep(seconds): Task<number, never> {
  return ({ resolve, reject }) =>
    setTimeout(() => resolve(seconds), seconds * 1000)
}

// function future<R, E>(
//   f: (resolve: (result: R) => void,
//       reject: (error: E) => void) => Task<R, E>
// ): Task<R, E> {
//   return callbacks => f(callbacks.resolve, callbacks.reject)
// }

// Monad `bind` definition
const bindTask = f => task => ({ resolve, reject }) =>
  task({
    resolve: result => f(result)({ resolve, reject }),
    reject,
  })

const catchError = f => task => ({ resolve, reject }) =>
  task({
    resolve,
    reject: error => f(error)({ resolve, reject }),
  })

// bindTask(x => x + 1)(sleep(1))({
//   resolve: x => console.log(`task finished with result ${x}`),
//   reject: e => console.log(`task finished with error ${e}`),
// })

// bindTask(x => ({ resolve, reject }) => resolve(x + 10))(sleep(1))({
//   resolve: x => console.log(`task finished with result ${x}`),
//   reject: e => console.log(`task finished with error ${e}`),
// })

// bindTask(x => ({ resolve, reject }) => reject(x + ' is invalid'))(sleep(1))({
//   resolve: x => console.log(`task finished with result ${x}`),
//   reject: e => console.log(`task finished with error ${e}`),
// })

pipe(
  bindTask(x => ({ resolve, reject }) => resolve(x + 10)),
  bindTask(x => ({ resolve, reject }) => reject('some error')),
  bindTask(x => ({ resolve, reject }) => resolve(x * 2)),
  catchError(error => ({ resolve, reject }) => resolve(0)),
  bindTask(x => ({ resolve, reject }) => resolve(x + 100)),
)(sleep(1))({
  resolve: x => console.log(`task finished with result ${x}`),
  reject: e => console.log(`task finished with error ${e}`),
})

// Monad `return` definition (success case)
const resolveTask = x => ({ resolve, reject }) => resolve(x)
// Monad `fail` definition
const rejectTask = e => ({ resolve, reject }) => reject(e)

pipe(
  bindTask(x => resolveTask(x + 10)),
  bindTask(x => rejectTask('some error')),
  bindTask(x => resolveTask(x * 2)),
  catchError(error => resolveTask(0)),
  bindTask(x => resolveTask(x + 100)),
)(sleep(1))({
  resolve: x => console.log(`task finished with result ${x}`),
  reject: e => console.log(`task finished with error ${e}`),
})

// function bind<R, E>(next: (result: R, error: E) => any) {
//   return function bound<E>(task: Task<R, E>) {
//     return (value: R) => task(next, reject)
//   }
// }

const bind = f => p => p.then(f)

// pipe(
//   bind(x => x + 1),
//   bind(x => x * 2),
// )((resolve, reject) => resolve(4))

const result: Promise<any> = pipe(
  bind(x => x + 1),
  bind(x => x * 2),
  // )(Promise.resolve(4))
)(Promise.reject(4))

result.then(
  x => console.log(`Promise finished with result: ${x}`),
  e => console.error(`Promise finished with result: ${e}`),
)

// const bindOptional = <T>(f: (value: T) => any) => (value: T) =>
