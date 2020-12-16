import { pipe } from './pipe'

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
