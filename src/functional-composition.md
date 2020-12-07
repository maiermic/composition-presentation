<style>
footer, .footer {
  font-size: 50%;
  color: gray;
}
strong {
  color: #d67500;
}
em {
  color: yellow;
}
.reveal pre code {
  max-height: 80%;
}
.reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6 {
  text-transform: none;
}
.emoji {
  font-family: apple color emoji,segoe ui emoji,noto color emoji,android emoji,emojisymbols,emojione mozilla,twemoji mozilla,segoe ui symbol;
}
.image-container {
  position: relative;
  text-align: center;
  color: darkred;
}
.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.arrow-text {
  font-size: 50%;
}
.arrow {
  margin-top: -10px;
  transform: scale(1.5,1);
}
.m0 {
  margin: 0 !important;
}
code {
  padding: 0 0.1em;
  background: #3f3f3f;
  color: #dcdcdc;
}
.half-image {
  display: inline-block;
  width: 48%;
}
</style>

## Functional Composition

![railway track](img/functional-composition/railway-track.png)

---

Inspired by the talk _The Power Of Composition_ by&nbsp;Scott&nbsp;Wlaschin
([video](https://youtu.be/vDe-4o8Uwl8),
[slides](https://www.slideshare.net/ScottWlaschin/the-power-of-composition))

---

## The philosophy of composition
- All pieces are designed to be connected
- Connect two pieces together and get another "piece"
   that can still be connected
- The pieces are reusable in many contexts

<p>
  <img src="img/functional-composition/railway-track-pieces.png"
       class="half-image">
  <img src="img/functional-composition/railway-track.png"
       class="half-image">
</p>

----

## Philosophy in short
- connectable
- no adapters
- reusable parts

<p>
  <img src="img/functional-composition/railway-track-pieces.png"
       class="half-image">
  <img src="img/functional-composition/railway-track.png"
       class="half-image">
</p>

----

### For composition to work properly
- immutable data 
- self contained:
    - no side-effects
    - no I/O
    - no globals
    - etc.

---

## Functions

![function](img/functional-composition/function.png)

----

## Reduce/Unify Parameter Count

```ts
const f = (x, y, z) => x + y * z
// partial application of f
const p = (x, y) => z => f(x, y, z)
// curried f
const c = x => y => z => f(x, y, z)
```

&shy;<!-- .element: class="fragment footer" -->
Parameters of outer functions are captured by inner functions (closures).

---

## Composition Operators

---

### Basic Composition

<div class="image-container">
  <img src="img/functional-composition/composition.png">
  <div class="centered-text">
    <div class="arrow-text">compose</div>
    <div class="arrow">←</div>
  </div>
</div>

<div class="image-container">
  <img src="img/functional-composition/composition.png">
  <div class="centered-text">
    <div class="arrow-text">pipe</div>
    <div class="arrow">→</div>
  </div>
</div>

```ts
const compose = (g, f) => x => g(f(x))
const pipe    = (g, f) => x => f(g(x))
```

---

## How do we compose these?
![](img/functional-composition/function-1-in-2-out.png)

<ol>
  <li>
    <p>
      bind
      <img src="img/functional-composition/bind.png"
           alt="bind"
           class="m0 fragment"
           data-fragment-index="1">
      <img src="img/functional-composition/2-track.png"
           alt="2-track"
           class="m0 fragment"
           data-fragment-index="1">
    </p>
  </li>
  <li>
    <p>
      kleisli
      <img src="img/functional-composition/kleisli.png"
           alt="bind"
           class="m0 fragment"
           data-fragment-index="2">
    </p>
  </li>
</ol>

---

### bind

![](img/functional-composition/bind-slide-1.png) <!-- .element: style="width: 80%;" -->

----

### bind

![](img/functional-composition/bind-slide-2.png)

----

### bind

![](img/functional-composition/bind-slide-3.png)

----

### bind

![](img/functional-composition/bind.png)  

#### Implementations

```ts
const bindPromise = f => p => p.then(f)
const bindMaybe = f => m => isNullOrUndefined(m) ? m : f(m)
```

#### Example
```ts
const prop = key => bindMaybe(obj => obj[key])
const getStateCode = pipe(prop('address'), prop('state'))
getStateCode({ address: { state: 'ny' } }) // ny
getStateCode({}) // undefined
```

---

### Kleisli Composition

![](img/functional-composition/kleisli.png)

#### Implementation (Maybe)

```ts
// bind: Maybe
const bind = f => m => isNullOrUndefined(m) ? m : f(m)

// Kleisli Composition: Maybe
const kc = (current, next) => (ctx) => bind(next)(current(ctx))
```
<!-- .element: style="width: 93%;" -->

----

#### Kleisli Composition in Action

##### Web Server Example
```ts
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
```

----

### Choose HTTP Method

```ts
/**
 * The choose combinator is implemented such that it will
 * execute each webpart in the list until one returns success.
 */
declare function choose(webParts: WebPart[]): WebPart;

const app = choose([
  kc(GET, choose([...])),
  kc(POST, choose([...])),
])
```
<!-- .element: style="width: 91%;" -->

![](img/functional-composition/server-example_choose-method.png)

----

### Complete Railway

```ts
const app = choose([
  kc(GET, choose([
    kc(path('/hello'), ok('Hello')),
    kc(path('/goodbye'), ok('Goodbye')),
  ])),
  kc(POST, choose([
    kc(path('/hello'), ok('Hello POST')),
    kc(path('/goodbye'), ok('Goodbye POST')),
  ])),
])
```

![](img/functional-composition/server-example_visualization.png)

----

### [Source Code](https://github.com/maiermic/composition-presentation/tree/master/examples/functional/kleisli-composition-server-example.ts)

---

## Overview

```ts
const compose = (g, f) => x => g(f(x))
const pipe    = (g, f) => x => f(g(x))
// bind
const bindPromise = f => p => p.then(f)
const bindMaybe = f => m => isNullOrUndefined(m) ? m : f(m)
// Kleisli Composition: Maybe
const kc = (current, next) => (ctx) =>
  bindMaybe(next)(current(ctx))
```

---

# End <!-- .element: style="color: orangered;" -->

---

## Bonus

---

### [Functional Promise Implementation](https://github.com/maiermic/composition-presentation/tree/master/examples/functional/functional-promise-example.ts)

---

### [Haskell Monad Definition](https://wiki.haskell.org/Monad#Monad_class)

#### Monad

```haskell
class Monad m where
  (>>=)  :: m a -> (  a -> m b) -> m b
  (>>)   :: m a ->  m b         -> m b
  return ::   a                 -> m a
  fail   :: String -> m a
  
  m >> k =  m >>= \_ -> k
```

#### Monad Laws

```haskell
return a >>= k                  =  k a
m        >>= return             =  m
m        >>= (\x -> k x >>= h)  =  (m >>= k) >>= h
```

----

### Monad Functions

![](img/functional-composition/monad-return-function.png)
![](img/functional-composition/monad-fail-function.png)

----

### Monad Operators

#### Bind
![](img/functional-composition/monad-bind-operator.png)

----

### Monad Operators

#### Composition
![](img/functional-composition/monad-composition-operator.png)
