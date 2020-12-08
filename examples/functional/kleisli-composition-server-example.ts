// Force file to be treated like a module to avoid redeclaration-conflicts
// with other files, see: https://stackoverflow.com/a/41300413/1065654
export let undefined

type HttpMethod = 'GET' | 'PUT' | 'POST' | 'DELETE'

interface HttpRequest {
  method: HttpMethod
  path: string
}

interface HttpResponse {
  status: number
  body: string
}

interface HttpContext {
  request: HttpRequest
  response: HttpResponse
}

type WebPart = (ctx: HttpContext) => HttpContext | null

function ok(body: string): WebPart {
  return (ctx: HttpContext) => ({
    request: ctx.request,
    response: {
      status: 200,
      body,
    },
  })
}

function filter(predicate: (ctx: HttpContext) => boolean): WebPart {
  return ctx => (predicate(ctx) ? ctx : null)
}

function path(pathAfterDomain: string): WebPart {
  return filter(ctx => ctx.request.path === pathAfterDomain)
}

const isRequestMethod = (method: HttpMethod) => (ctx: HttpContext) =>
  ctx.request.method === method

const filterRequestMethod = (method: HttpMethod) =>
  filter(isRequestMethod(method))

const GET: WebPart = filterRequestMethod('GET')
const PUT: WebPart = filterRequestMethod('PUT')
const POST: WebPart = filterRequestMethod('POST')
const DELETE: WebPart = filterRequestMethod('DELETE')

const isNullOrUndefined = x => x === null || typeof x === 'undefined'
const bind = f => m => (isNullOrUndefined(m) ? m : f(m))

function kc(current: WebPart, next: WebPart): WebPart {
  return (ctx: HttpContext) => bind(next)(current(ctx))
}

function kcn(...webParts: [WebPart, WebPart, ...WebPart[]]): WebPart
function kcn(head: WebPart, ...tail: [WebPart, ...WebPart[]]): WebPart {
  return (ctx: HttpContext) =>
    tail.reduce(
      (previous: HttpContext | null, current: WebPart) =>
        bind(current)(previous),
      head(ctx),
    )
}

// function choose([current, next]: WebPart[]): WebPart {
//   return (ctx: HttpContext) => current(ctx) || next(ctx)
// }

function choose(webParts: WebPart[]): WebPart {
  return (ctx: HttpContext) =>
    webParts.reduce(
      (previous: HttpContext | null, current: WebPart) =>
        previous || current(ctx),
      null,
    )
}

/*
 * Note: All following app definitions (app, app2, app3) are equivalent.
 */

const app = choose([
  kc(
    GET,
    choose([
      kc(path('/hello'), ok('Hello')),
      kc(path('/goodbye'), ok('Goodbye')),
    ]),
  ),
  kc(
    POST,
    choose([
      kc(path('/hello'), ok('Hello POST')),
      kc(path('/goodbye'), ok('Goodbye POST')),
    ]),
  ),
])

const app2 = choose([
  kc(
    path('/hello'),
    choose([kc(GET, ok('Hello')), kc(POST, ok('Hello POST'))]),
  ),
  kc(
    path('/goodbye'),
    choose([kc(GET, ok('Goodbye')), kc(POST, ok('Goodbye POST'))]),
  ),
])

const app3 = choose([
  kcn(GET, path('/hello'), ok('Hello')),
  kcn(POST, path('/hello'), ok('Hello POST')),
  kcn(GET, path('/goodbye'), ok('Goodbye')),
  kcn(POST, path('/goodbye'), ok('Goodbye POST')),
])

const emptyResponse: HttpResponse = {
  status: -1,
  body: '',
}

function createRequest(method: HttpMethod, path: string) {
  return {
    request: {
      method,
      path,
    },
    response: emptyResponse,
  }
}

const requestGetHello: HttpContext = createRequest('GET', '/hello')
const requestPostHello: HttpContext = createRequest('POST', '/hello')
const requestGetGodbye: HttpContext = createRequest('GET', '/goodbye')
const requestPostGodbye: HttpContext = createRequest('POST', '/goodbye')

console.clear()

const format = obj => JSON.stringify(obj, null, 4)

function printAssert(actual, expected, message = '') {
  const actualFormatted = JSON.stringify(actual)
  const expectedFormatted = JSON.stringify(expected)
  if (actualFormatted !== expectedFormatted) {
    console.error(`${actualFormatted} !== ${expectedFormatted}`)
  } else {
    console.log(actualFormatted)
  }
}

function testApp(app: WebPart) {
  printAssert(app(requestGetHello), {
    request: { method: 'GET', path: '/hello' },
    response: { status: 200, body: 'Hello' },
  })
  printAssert(app(requestPostHello), {
    request: { method: 'POST', path: '/hello' },
    response: { status: 200, body: 'Hello POST' },
  })
  printAssert(app(requestGetGodbye), {
    request: { method: 'GET', path: '/goodbye' },
    response: { status: 200, body: 'Goodbye' },
  })
  printAssert(app(requestPostGodbye), {
    request: { method: 'POST', path: '/goodbye' },
    response: { status: 200, body: 'Goodbye POST' },
  })
}

console.log('app')
testApp(app)

console.log('app2')
testApp(app2)

console.log('app3')
testApp(app3)
