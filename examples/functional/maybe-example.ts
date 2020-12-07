// Force file to be treated like a module to avoid redeclaration-conflicts
// with other files, see: https://stackoverflow.com/a/41300413/1065654
export let undefined

const pipe = (...fns) => x => fns.reduce((res, f) => f(res), x)

const isNullOrUndefined = x => x === null || typeof x === 'undefined'
const bindMaybe = f => m => (isNullOrUndefined(m) ? m : f(m))
const prop = key => bindMaybe(obj => obj[key])
const path = keys => pipe(...keys.map(prop))
const getStateCode = pipe(prop('user'), prop('address'), prop('state'))
const getStateCode2 = path(['user', 'address', 'state'])

console.log(getStateCode({ user: { address: { state: 'ny' } } })) // ny
console.log(getStateCode({})) // undefined
console.log(getStateCode2({ user: { address: { state: 'ny' } } })) // ny
console.log(getStateCode2({})) // undefined
