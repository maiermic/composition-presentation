<style>
footer {
  font-size: 50%;
  color: gray;
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
.lego-cropped {
  width: 619px;
  height: 284px;
  object-fit: cover;
  object-position: 0 -1px;
}
</style>

# Composition

<!-- ![](https://media.giphy.com/media/l0JMrPWRQkTeg3jjO/giphy.gif) -->

![](https://media.giphy.com/media/3oEdv37iUqkLHDbGg0/giphy.gif) <!-- .element: class="lego-cropped" -->

&shy;<!-- .element: class="fragment" -->
How to combine functionality in a flexible and understandable way?

Note:
- lateinisch *compositio* "Zusammenstellung, Zusammensetzung"
- Reise zur Wurzel
- Vererbung kann auch als eine Form von Komposition gesehen werden
- Beziehungen zwischen Bausteinen
  - viele wiederverwendbare/kombinierbare kleine Teile
  - statt lauter Spezialteile

---

## Terms

----

### State
#### Object vs. Parameter

<!-- TODO how to show code blocks side by side -->

```js
object = new Object(state)
renderer.drawRect(x, y, w, h)
```

```js
drawRect(renderer, x, y, w, h)
```

```ts
let globalState = ...

function f(stateRequiredByFunction) { ... }

class MyObject {
  constructor(private stateSharedByMethods) { ... }

  a(stateRequiredByMethodA) { ... }
  b(stateRequiredByMethodB) { ... }
}  
```

----

### Polymorphism

----

### Static vs. Dynamic Dispatching

Note:
- Static Dispatching is possible when your IDE jumps to the definition of a
  method and not only the declaration ;-)

---

### Complexity

&shy;<!-- .element: class="fragment"  data-fragment-index="1" -->
Word of Latin origin: *cum plectere*

&shy;<!-- .element: class="fragment"  data-fragment-index="2" -->
Translatable as *entangled* or *interlinked*

&shy;<!-- .element: class="fragment"  data-fragment-index="3" -->
[![everything is connected](img/everything-is-connected.gif)](https://66.media.tumblr.com/a608e05057248b57ffa1be1f95c2c335/tumblr_ofgmk70nUh1r9zeo4o1_500.gif)

<footer class="fragment" data-fragment-index="3">
    From the TV series <em>Dirk Gently's Holistic Detective Agency</em>
</footer>

Note:
- hard to understand
- many connections
- many potentially possible execution path

Zum Zitat:
- "Alles ist miteinander verflochten"
- In der TV-Serie die Ereignisse und Handlungsstränge der Protagonisten
- Im Code können viele Abhängigkeiten bzw. Verbindungen von Komponenten zu
  vielen möglichen Ausführungspfaden führen, die schwer zu überblicken sein
  können
- Ich beziehe mich mit dem Begriff Komplexität in diesem Vortrag also nicht auf
  Aufwand oder Kosten eines Algorithmus

----

#### Entangled Code

[![spaghetti code magic](img/spaghetti-code-magic.png)](https://www.reddit.com/r/ProgrammerHumor/comments/82gvzc/another/)

----

#### Disentangle
[![untangle spaghetti](img/untangle-spaghetti.jpg)](https://medium.com/@AhoiNadjeschda/sorting-the-spaghetti-or-the-aware-ego-process-book-snippet-29-971dcd6c0c2b)

---

[![composition over inheritance](img/composition-over-inheritance.jpg)](http://www.quickmeme.com/p/3w53xj)

----

![composition vs. inheritance](img/inheritance-composition-association.svg)  <!-- .element: style="filter: invert(90%);" -->

----

![composition vs. inheritance](img/inheritance-composition-calls.svg)  <!-- .element: style="filter: invert(90%);" -->

----

![looks familiar](https://memegenerator.net/img/instances/65571860.jpg)

----

[![untangle spaghetti](img/untangle-spaghetti.jpg)](https://medium.com/@AhoiNadjeschda/sorting-the-spaghetti-or-the-aware-ego-process-book-snippet-29-971dcd6c0c2b)

---

## Inheritance

Note:
- Java/PHP: final class and method

---

### Class Based Inheritance

---

### Diamond Problem

---

### Mixin Based Inheritance

> Und wegen des Fehlens geeigneter Kompositionsoperatoren, welche dabei helfen, Namenskonflikte zwischen miteinander konkurrierenden Methoden zu lösen, erfolgt Mixin-Komposition immer geradlinig in geordeter Reihenfolge.

http://peterseliger.blogspot.com/2014/06/die-vielen-talente-von-javascript.html#mixins

---

### Trait Based Inheritance

http://peterseliger.blogspot.com/2014/06/die-vielen-talente-von-javascript.html#traits

---

## Composition

---

### [Object Composition](https://en.wikipedia.org/wiki/Object_composition)

#### Combine & Delegate

#### Association vs. Aggregation

----

#### Delegation

Built-in syntax in Kotlin

---

### [Functional Composition](https://en.wikipedia.org/wiki/Function_composition_(computer_science))

----

### Notations

### Method
```js
values.map(fn)
```

### Function
```js
map(fn, values)
```

### Curried Function
```js
map(fn)(values)
```

----

```js
map(x => x + 1, [1, 2, 3]) // [2, 3, 4]
```

---

### RxJS Example

```js
import { range } from 'rxjs'
import { map, filter, take, toArray } from 'rxjs/operators'

const source$ = range(0, 10)

source$
  .pipe(
    filter(x => x % 2 === 0),
    map(x => x + x),
    take(3),
    toArray()
  )
  .subscribe(x => console.log(x))

// Logs:
// [0, 4, 8]
```

---

The End.


---

Your code is inspiring

&shy;<!-- .element: class="fragment" -->
![](https://memegenerator.net/img/instances/75257409.jpg)

<footer class="fragment">
 If you write spaghetti code, your colleagues will likely, too
 <span class="emoji">😉</span>
</footer>

---

## [Talents: Dynamically Composable Units of Reuse](http://scg.unibe.ch/archive/papers/Ress11a-Talents.pdf)

> … object-specific units of reuse which model features that an object can acquire at run-time. Like a trait, a talent represents a set of methods that constitute part of the behavior of an object. Unlike traits, talents can be acquired (or lost) dynamically. When a talent is applied to an object, no other instance of the object’s class are affected. Talents may be composed of other talents, however, as with traits, the composition order is irrelevant. Conflicts must be explicitly resolved.
>  
>  Like traits, talents can be flattened, either by incorporating the talent into an existing class, or by introducing a new class with the new methods. However, flattening is purely static and results in the loss of the dynamic description of the talent on the object. Flattening is not mandatory, on the contrary, it is just a convenience feature which shows how traits are a subset of talents.

---

## Composition in Angular
 
### Directive
### Decorator?
