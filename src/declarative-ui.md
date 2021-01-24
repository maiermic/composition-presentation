<style>
footer, .footer {
  font-size: 50%;
  color: gray;
}
strong, h4.highlight {
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
code {
  padding: 0 0.1em;
  background: #3f3f3f;
  color: #dcdcdc;
}
.red {
  color: darkred;
}
.blue {
  color: #2a76dd;
}
.logo {
  max-width: 240px !important;
  max-height: 240px !important;
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}
.tooltip .tooltip-text {
    visibility: hidden;
    /* width: 120px; */
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 8px; 
    border-radius: 6px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    bottom: 80%;
    /* left: 27%; */
    /* margin-left: -60px; */
    opacity: 0;
    transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>

# Declarative UI

<div style="margin-top: -30px">
  <div class="tooltip">
    <span class="tooltip-text">
      Jetpack Compose
    </span>
    <a href="https://developer.android.com/jetpack/compose"
       class="">
      <img src="https://sdtimes.com/wp-content/uploads/2020/08/jetpack-compose-icon_RGB.png"
           alt="Jetpack Compose logo"
           class="logo">
    </a>
  </div>
  <div class="tooltip">
    <span class="tooltip-text">
      Angular
    </span>
    <a href="https://angular.io/"
       class="">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png"
           alt="Angular logo"
           class="logo">
    </a>
  </div>
  <div class="tooltip">
    <span class="tooltip-text">
      React
    </span>
    <a href="https://reactjs.org/"
       class="">
      <img src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/026/full/react.png"
           alt="React logo"
           class="logo">
    </a>
  </div>
</div>
<div style="margin-top: -30px">
  <div class="tooltip" style="margin-right: 50px">
    <span class="tooltip-text">
      Flutter
    </span>
    <a href="https://flutter.dev/"
       class="">
      <img src="https://strattonapps.com/wp-content/uploads/2020/02/flutter-logo-5086DD11C5-seeklogo.com_.png"
           alt="Flutter logo"
           class="logo">
    </a>
  </div>
  <div class="tooltip">
    <span class="tooltip-text">
      Vue
    </span>
    <a href="https://vuejs.org"
       class="">
      <img src="https://vuejs.org/images/logo.png"
           alt="Vue logo"
           class="logo">
    </a>
  </div>
</div>

Note:
Wir sehen hier Logos von 5 Bibliotheken bzw. Frameworks zum Erstellen von
deklarativen Benutzeroberflächen (hier englisch abgekürzt als UI für User
Interface):

- Das rote Logo mit dem `A` ist von Angular. Dieses Framework dürfte den meisten
  von euch bekannt sein. Damit haben wir bereits einige Web-Anwendungen
  entwickelt.
- Rechts oben ist das Logo von React
- Rechts unten das Logo von Vue. Diese 3 sind grundsätzlich für das Erstellen
  von Websites ausgelegt bzw. benötigen sie eine JavaScript Runtime.
- Links unten ist das Logo von Flutter (Dart, Cross Plattform)
- Links oben ist das Logo von Jetpack Compose (Android). Laut Homepage:
  > Android’s modern toolkit for building native UI

Umfrage: Wer kennt welches Framework?

---

<h2>
    <span class="red">
        Imperative
    </span>
    vs.
    <span class="blue">
        Declarative
    </span>
</h2>

<h3 class="fragment">
    <span class="red">
        How
    </span>
    vs.
    <span class="blue">
        What
    </span>
</h3>

Note:

- In der Regel lernt man zuerst imperativ zu programmieren
- **\[Next\]** d.h. man beschreibt Schritt für Schritt **!!! wie !!!** das
  Programm zum Ergebnis kommt.
- Bei der deklarativen Programmierung wird hingegen nur das **was** beschrieben,
  d.h. wie das Ergebnis auszusehen hat, aber nicht wie es erreicht wird.

<!-- TODO imperative code example vs. declarative code example -->

----

### All Programs Are Imperative

#### at least under the hood

> CPU \[...\] executes **instructions** that **make up a computer program**.
> The CPU performs basic arithmetic, logic, controlling, and input/output (I/O)
> operations specified by the instructions in the program.

&shy;<!-- .element: class="footer" -->
[Wikipedia: Central processing unit](https://en.wikipedia.org/wiki/Central_processing_unit)

Note:

- Im ersten Vortrag haben wir unter anderem festgehalten, dass ein Computer
  Programm aus Anweisungen besteht, die von der Recheneinheit - also der CPU -
  ausgeührt wird.
- Es wird Schritt für Schritt beschrieben, wie das Programm zum Ergebnis kommt,
  d.h. unter der Haube sind alle Computer Programme imperativ.

----

### How To Write Declarative Programms?

<div class="fragment">

![I'm imperatively telling you to use declarative code.](https://img.devrant.com/devrant/rant/r_1541501_oepL5.jpg)

&shy;<!-- .element: class="footer" -->
Image from
[Declarative Versus Imperative Code](https://medium.com/better-programming/declarative-versus-imperative-code-180c0cf4003b)
by&nbsp;_Martin&nbsp;Novák_

</div>

Note:

- Es stellt sich also die Frage: "Wie kann man dann deklarativ Programmieren?"
- Nun wir müssen dem Computer imperativ sagen, wie er den deklarativen Code
  ausführen muss.
- Dafür muss die deklarative Beschreibung insgesamt in imperative Anweisungen
  übersetzt werden.
- Dies kann entweder durch eine Kompilierung passieren oder zur Laufzeit. Bzw.
  ist natürlich auch eine Mischform möglich.

----

## Declarative UI

&shy;<!-- .element: style="margin: -80px 0;" -->
![](https://flutter.dev/assets/development/data-and-backend/state-mgmt/ui-equals-function-of-state-54b01b000694caf9da439bd3f774ef22b00e92a62d3b2ade4f2e95c8555b8ca7.png)

> When the state of your app changes (for example, the user flips a switch in
> the settings screen), you change the state, and that triggers a redraw of the
> user interface. There is no imperative changing of the UI itself (like
> `widget.setText`) — you **change the state**,
> and the **UI rebuilds from scratch**.
<!-- .element: class="fragment" data-fragment-index="1" style="font-size: xx-large;" -->

&shy;<!-- .element: class="footer fragment" data-fragment-index="1" -->
Image and quote from the [Flutter](https://flutter.dev/) documentation
[Start thinking declaratively](https://flutter.dev/docs/development/data-and-backend/state-mgmt/declarative)

Note:

- Auf der Homepage von Flutter gibt es diese Grafik
- **\[Next\]** In der Beschreibung steht u.a. **\[Quote\]**
- Wenn sich der Zustand der App ändert (z.B. durch eine Benutzer-Interaktion),
  ändert man den Zustand und löst damit das Neu-Zeichnen der UI aus.
- Es gibt im deklarativen Code also keine imperativen Anweisungen, die UI zu
  ändern, d.h. statt auf einem `widget.setText` aufzurufen, beschreiben wir den
  gesamten Zustand des `widget`s bzw. der Anwendungen, um die UI neu zu bauen.
- **\[Graphic\]** Wir übergeben also den aktuellen Zustand an eine Funktion, die
  als Ergebnis die aktuelle UI als Ergebnis zurückgibt.

---

## Web Technology

![we are going to the internet](https://cdn0.kontraband.com/uploads/image/2019/3/1/preview_8b6a8f8d.jpeg)<!--
.element: class="fragment" style="max-height: 50vh;" -->

Note:

- Wir werden uns nun im weiteren Vortrag mit Web-Technologien beschäftigen, da
  mit deren Grundlagen die meisten von euch vertraut sein dürften
- Die grundlegenden Konzepte sollten sich aber auch auf andere Gebiete, wie z.B.
  Flutter übertragen lassen.
- Vielleicht kann Benni am Ende des Vortrags dazu seine Einschätzung geben.
- Während dem Vortrag dürfte es eher ungünstig sein. Da dann die Gefahr besteht
  vom Thema ab zu kommen
- Und nun: **\[Next\]** "Auf ins Internet!"

----

## HTML vs. DOM

<div class="fragment">

> The DOM is an interface to an HTML document. It is used by browsers as a
> first step towards determining what to render in the viewport, and by
> Javascript programs to modify the content, structure, or styling of the page.

&shy;<!-- .element: class="footer" -->
From the article
[What, exactly, is the DOM?](https://bitsofco.de/what-exactly-is-the-dom/)
by&nbsp;_Ire&nbsp;Aderinokun_

</div>

Note:

- Bei Web-Anwendungen beschreibt man die UI in der Regel mit HTML. **\[Next\]**
- Der Browser zeichnet die UI basierend auf dem HTML code und bietet den
  sogenannten DOM als Schnittstelle für JavaScript an, um die UI zu verändern.
- Zur Laufzeit haben wir es also mit dem DOM zu tun, d.h. wir können nicht das
  HTML ändern, sondern nur den DOM
- Die Gemeinsamkeiten zwischen HTML und DOM sind groß.
- Aus Zeitgründen werden wir auf die Unterschiede nur bei Bedarf im weiteren
  Vortrag eingehen

Fragen:

- Ist HTML eine imperative oder deklarative Sprache?
- Ist HTML für dynamische Benutzeroberflächen ausgelegt? Also Anwendungen bei
  denen sich der Zustand ändert.

---

## [Angular](https://angular.io/)

> Angular has change detection that detects changes to the model and only
> updates the parts of the DOM that need to be changed according to the model
> changes.

&shy;<!-- .element: class="footer" -->
by&nbsp;[_Günter&nbsp;Zöchbauer_](https://stackoverflow.com/a/39739739/1065654)

Note:

- Ich habe eingangs das Framework Angular erwähnt, mit dem einige von euch
  bereits vertraut sein dürften.
- Angular ist ein Framework zum Erstellen von dynamischen Benutzeroberflächen
- In Angular beschreibt man die Benutzeroberfläche durch Komponenten
- Komponenten werden u.a. durch ein Model und ein HTML Template beschrieben.
- Das HTML Template beschreibt basierend auf dem Zustand (dem Model), wie die
  Benutzeroberfläche aussieht
- Wenn sich der Zustand ändert, ändert sich automatisch auch die UI
- Wie ist das möglich?
- Wir haben doch gerade festgestellt, dass HTML statisch ist

----

## Incremental DOM

> Every component gets **compiled** into a series of instructions. These
> **instructions create DOM trees and update them** in-place when the data
> changes.

See article
[Understanding Angular Ivy: Incremental DOM and Virtual DOM](https://blog.nrwl.io/understanding-angular-ivy-incremental-dom-and-virtual-dom-243be844bf36)
by&nbsp;_Victor&nbsp;Savkin_

Note:

- Wie ich zuvor erwähnt habe - ich zitiere mich selbst - muss die deklarative
  Beschreibung insgesamt in imperative Anweisungen übersetzt werden.
- Dies kann entweder durch eine Kompilierung passieren oder zur Laufzeit.
- Angular kompiliert die Komponenten inklusive dem HTML Template in Anweisungen
  (d.h. JavaScript Code) der den DOM entsprechend ändert, wenn sich die Daten
  ändern.
- Wer genauer wissen will, wie das funktioniert, kann sich den verlinkten
  Artikel anschauen.
- Da die meisten von euch **nicht** mit dem Compiler-Bau vertraut sein dürften,
  schauen wir uns lieber einen anderen Ansatz an, bei dem die Übersetzung der
  deklarativen Beschreibung in imperative Anweisungen zur Laufzeit passiert

---

## Virtual DOM

Used by [React](https://reactjs.org/), [Vue](https://vuejs.org/) and many other
JavaScript frameworks/libraries to **describe the UI** (current DOM) based on
the (current) state.

<ul>
  <li class="fragment" data-fragment-index="1">
    no compilation required (plain JS may be used)
    <sup class="fragment" data-fragment-index="2">1</sup>
  </li>
  <li class="fragment" data-fragment-index="3">
    value as a result of rendering component (can be used for testing,
    debugging, etc.)
  </li>
</ul>

&shy;<!-- .element: class="footer fragment" data-fragment-index="2" -->
<sup>1</sup> JSX is syntax sugar, TypeScript and other languages may be compiled
to JS for different reasons

Note:

- Dieser andere Ansatz ist der sogenannte *Virtual DOM*, der u.a. von React und
  Vue verwendet wird **\[Next\]**
- Hier kommen wir grundsätzlich ohne Kompilierung oder Code-Generierung aus,
  wobei wir TypeScript verwenden werden **\[Next\]**, da die Typ-Angaben beim
  Verständnis helfen sollten **\[Next\]**
- Zudem können wir die UI in der Konsole vom Browser zeichnen lassen, wovon wir
  später im Praxis-Beispiel gebrauch machen werden

----

### Virtual DOM vs. Browser DOM

![](https://i1.wp.com/programmingwithmosh.com/wp-content/uploads/2018/11/lnrn_0201.png?ssl=1)<!--
.element: style="max-height: 40vh; max-width: 60vw;" -->

&shy;<!-- .element: class="footer" -->
Image from the article
[React Virtual DOM Explained in Simple English](https://programmingwithmosh.com/react/react-virtual-dom-explained/)
by&nbsp;_Mosh&nbsp;Hamedani_

Note:

- Zunächst muss man sich vor Augen halten, dass Änderungen am DOM teuer sind, da
  das Neuzeichnen zeitaufwendig ist
- Deswegen sollten Änderungen am Zustand nicht sofort zu Änderungen am echten
  DOM führen.
- Stattdessen verwalten wir eine Kopie des DOMs als JavaScript Objekt, da
  Änderungen an diesem Objekt verhältnismäßig schnell durchgeführt werden können
- Dieses Objekt wird als *Virtual DOM* bezeichnet
- Genauer gesagt verwaltet wir sogar 2 bzw. mehrere Kopien
- Denn jedes Mal, wenn sich der Zustand ändert **\[zeige auf Grafik\]**,
  erstellen wir eine neue Kopie, d.h. einen neuen Virtual DOM
- Der alte VDOM wird mit dem neuen VDOM verglichen und der Unterschied
  (in der Abbildung rot dargestellt) wird auf den echten DOM des Browsers
  übertragen, wodurch die UI neu gezeichnet wird

----

### Implementing Virtual DOM From Scratch

See commits

- [log example of VirtualElement data](https://github.com/maiermic/composition-presentation/commit/6b4d482fd366491489c75b99f3c5990c0526d282)
- [introduce function createElement](https://github.com/maiermic/composition-presentation/commit/f27a02eacac23a932f42e1ae03d9eb5eb6e651f0)
- [add children to example app element](https://github.com/maiermic/composition-presentation/commit/e36641f3dced299d74c7059d195f00b071d00259)
- [render app in console](https://github.com/maiermic/composition-presentation/commit/4ab326e404fa180d2cbcd84a11af361a1b8a294c)

<!-- - [add missing return type to createElement](https://github.com/maiermic/composition-presentation/commit/864259b566b5bd8387bf3e3b0d134a0a9133736d) -->

- [support text nodes](https://github.com/maiermic/composition-presentation/commit/6487dcba3481c4b8c2d712e261a9a77b5addde37)

<!-- - [add overloads of render function](https://github.com/maiermic/composition-presentation/commit/2643dc1391de879028a18b795b52c648f05fad31) -->

- [render virtual DOM as real DOM](https://github.com/maiermic/composition-presentation/commit/b4f5cf9a8511f5958c80fd8d14df3e3ae2048c3e)
- [add count to app](https://github.com/maiermic/composition-presentation/commit/d2fca35ec3fa52136e0e9cb01c529db8e63abb72)
- [increase count every second](https://github.com/maiermic/composition-presentation/commit/0136893029791bcbf3aec8047297ee4f16804fd2)
- [diff virtual DOM to patch real DOM](https://github.com/maiermic/composition-presentation/commit/f0499b9ab9084138a788c74d16ec7a581e335844)

&shy;<!-- .element: class="footer" -->
Based on _Building a Simple Virtual DOM from Scratch_ by&nbsp;_Jason&nbsp;Yu_
([video](https://youtu.be/85gJMUEcnkc),
[article](https://dev.to/ycmjason/building-a-simple-virtual-dom-from-scratch-3d05))

Note:

- Genug Theorie. Besser versteht man es in der Praxis.
- Daher implementieren wir einen Virtual DOM von Grund auf.
- Kein Framework, keine Bibliothek oder irgendwelcher fremder Code.
- Wir verwenden, wie zuvor erwähnt, nur TypeScript.
- Die gezeigte Implementierung basiert auf dem verlinkten Vortrag, wobei ich den
  Code in TypeScript umgeschrieben habe, d.h. ich habe Typ-Annotationen
  hinzugefügt
- In der aktuellsten Implementierung habe ich noch einige Fehler behoben und
  einige Erweiterungen vorgenommen
- Wir schauen uns nun die Implementierung Schritt für Schritt bzw. Commit für
  Commit an

---

### Performance

&shy;<!-- .element: class="footer" -->
The following section is based on the article
[React’s diff algorithm](https://calendar.perfplanet.com/2013/diff/)
by&nbsp;_Christopher&nbsp;Chedeau_

Note:

- Nun werfen wir noch einen Blick auf die Herausforderungen, die es bezüglich
  Performance-Optimierungen zu bewältigen gibt
- Hierbei orientieren wir uns an den Optimierungen von React aus dem verlinkten
  Artikel

----

#### Finding the minimal number of modifications

> [...] between two arbitrary trees is a
> <strong>O(n<sup>3</sup>)</strong>
> problem. As you can imagine, this isn’t tractable for our use case.
> React uses simple and yet powerful **heuristics** to find a very good
> **approximation** in **O(n)**.

Note:

- Der DOM bzw. der Virtual DOM ist eine Baumstruktur
- Der Vergleich von 2 beliebigen Baumstrukturen ist mit einer Komplexität von O(
  n<sup>3</sup>) sehr aufwendig
- Über einfache Heuristiken kann man jedoch in der Praxis ausreichend gute
  Näherungen finden
- Von diesen schauen wir uns nun einige kurz an

----

### Level by Level

> React only tries to reconcile trees level by level.
<!--
> This drastically reduces the complexity and isn’t a big loss as it is very
> rare in web applications to have a component being moved to a different level
> in the tree. They usually only move laterally among children.
-->
![level by level: before vs. after](https://calendar.perfplanet.com/wp-content/uploads/2013/12/vjeux/1.png)

Note:

- React gleicht Bäume nur auf gleicher Ebene ab
- Denn es ist extrem selten, dass in Anwendungen eine Komponente in der Ebene
  der Baumstruktur verschoben wird
- In einer Liste bewegen sich die Elemente bzw. die Kinder z.B. nur seitlich

----

### List

<!--
Let say that we have a component that on one iteration renders 5 components and the next inserts a new component in the middle of the list. This would be really hard with just this information to know how to do the mapping between the two lists of components.

By default, React associates the first component of the previous list with the first component of the next list, etc. You can provide a key attribute in order to help React figure out the mapping. In practice, this is usually easy to find out a unique key among the children.
-->

#### Problem <!-- .element: class="highlight" -->

- Finding the minimal number of modifications (old vs. new VDOM)
  - diff of two lists is based on **comparing** list elements **as trees**
  - add-, remove-, move-, insert-operations of list elements are
    **costly** to detect

Note:

- Bei einer Liste muss man jedoch erstmal die Elemente vergleichen, um
  herauszufinden, wie sich die Elemente verschoben haben oder anderweitig
  verändert worden sind
- Da die Elemente in der Regel weitestgehend die gleiche Form haben, haben wir
  wieder das ursprüngliche Problem, dass Bäume miteinander aufwendig in der
  Tiefe verglichen werden müssen

----

### List

#### Solution <!-- .element: class="highlight" -->

- define **unique key** to identify list elements
- compare list elements by root (element) of tree
- cheap mapping from VDOM to DOM elements

![without keys vs. with keys](https://calendar.perfplanet.com/wp-content/uploads/2013/12/vjeux/2.png)

Note:

- Dieses Problem lässt sich lösen, indem man jedem Element einen einzigartigen
  Schlüssel zuordnet, der das Element identifiziert
- Dadurch muss man Elemente nur noch in der obersten Ebene anhand ihres
  Schlüssels vergleichen
- Zudem kann über den Schlüssel VDOM und DOM Elemente zueinander zugeordnet
  werden
- Die gleiche Lösung wird übrigens in Angular bei `ngFor` angeboten, um die
  Performance zu verbessern

Fragen:

- Warum ist der Index kein geeigneter Schlüssel?
- Was wäre bei DieSchulApp ein geeigneter Schlüssel bei der Nachrichten-Liste?

----

### Components

<!--
A React app is usually composed of many user defined components that eventually turns into a tree composed mainly of divs. This additional information is being taken into account by the diff algorithm as React will match only components with the same class.

For example if a <Header> is replaced by an <ExampleBlock>, React will remove the header and create an example block. We don’t need to spend precious time trying to match two components that are unlikely to have any resemblance.
-->

- **Problem:** diffing elements of the same tag requires comparison by
  children (trees)
- **Solution:** Use **unique custom tag names** for components

![only <div> vs. <Component>](https://calendar.perfplanet.com/wp-content/uploads/2013/12/vjeux/3.png)

Note:

- Ein ähnlicher Ansatz um den Vergleich von Elementen zu reduzieren, ist für
  Komponenten eigene eindeutige Tag-Namen zu verwenden, obwohl man eigentlich
  bestehende Tags, wie z.B. `div` verwenden könnte
- Dadurch kann man den Vergleich in vielen Fällen auf den Tag-Namen beschränken
- Nebenbei hat es auch noch den Vorteil beim Debuggen, dass der Ursprung des
  dynamischen Inhalts klarer ist, wenn der Name der Komponente im DOM auftaucht

----

#### Event Delegation

- **Problem:**
  Attaching event listeners to DOM nodes is painfully slow and memory-consuming
- **Solution:**
  - attach single event listener to the root of the document
  - use target DOM node of event
  - use hash map (DOM node to VDOM node) to avoid iteration of virtual DOM
    hierarchy
  - re-use of event objects (from pool, objects allocated once)
    to reduces garbage collection

Note:

- Bei den Event-Listenern hat man ebenfalls das Problem, dass die Verwaltung
  über den DOM verhältnismäßig teuer ist
- Kurz gesagt ist es auch hier günstiger, über den Virtual DOM zu gehen
- Man hört auf alle Events global, sucht das target über eine Hash-Map raus,
  welche ohne aufwendige Iteration die DOM- und VDOM-Elemente zuordnen kann
- Zudem kann man die Event-Objekte über einen Pool wiederverwenden, damit der
  Garbage Collector nicht so oft laufen muss

----

### Rendering

#### Batching

- whenever component state changes (call of `setState`), mark component as _
  dirty_
- re-render all dirty components at the end of the event loop

![setState marks components dirty](https://calendar.perfplanet.com/wp-content/uploads/2013/12/vjeux/4.png)

Note:

- Wie zu Beginn erwähnt, ist es besser, Änderungen gesammelt anzuwenden
- Daher markiert sich React die veränderten Komponenten für später, um am Ende
  der Event-Loop diese gesammelt anwenden zu können

----

#### Sub-tree Rendering

> works fine because we’re not touching the actual DOM

> usually [...] changes are localized to where the user interacts

![sub-tree re-rendering](https://calendar.perfplanet.com/wp-content/uploads/2013/12/vjeux/5.png)

Note:

- Dies hat einen weiteren Vorteil beim Rendern von Teil-Bäumen
- Normalerweise wirken sich Änderungen auf alle Kinder aus

----

#### Selective Sub-tree Rendering

prevent some sub-trees to re-render by implementing the method on a component:

```ts
shouldComponentUpdate(nextProps, nextState)
:
boolean
```

ensure computation takes less time than rendering 😉

![Selective Sub-tree Rendering](https://calendar.perfplanet.com/wp-content/uploads/2013/12/vjeux/6.png)

Note:

- Doch wenn man als Entwickler eine eigene Heuristik kennt, kann man Unter-Bäume
  vom Rendern ausschließen
- Häufig ergeben sich solche Heuristiken aus der Art und Weise, wie man den
  Zustand verwaltet
- Durch sein Insider-Wissen kann der Entwickler z.B. bestimmte Annahmen treffen

---

# End <!-- .element: style="color: orangered;" -->

---

## Advanced Example: TODO-List

Based on our custom Virtual DOM implementation:

- [todo.html](https://github.com/maiermic/composition-presentation/blob/master/examples/declarative-ui/src/todo.html)
- [todo.ts](https://github.com/maiermic/composition-presentation/blob/master/examples/declarative-ui/src/todo.ts)

---

## Further Reading

----

## Technologies

- [Jetpack Compose](https://developer.android.com/jetpack/compose)
- [Flutter](https://flutter.dev/)
- [SwiftUI](https://developer.apple.com/xcode/swiftui/)
- [React](https://reactjs.org/)
- [Vue](https://vuejs.org/)
- [Angular](https://angular.io/)

----

## Articles & Videos

- [The future of apps: Declarative UIs with Kotlin MultiPlatform (D-KMP)](https://danielebaroncelli.medium.com/the-future-of-apps-declarative-uis-with-kotlin-multiplatform-d-kmp-part-1-3-c0e1530a5343)
  by&nbsp;_Daniele&nbsp;Baroncelli_
- [Declarative UI patterns (Google I/O'19)](https://youtu.be/VsStyq4Lzxo)

----

## JSX & TSX

- [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)
- [TSX: JSX in TypeScript](https://www.typescriptlang.org/docs/handbook/jsx.html)

----

## HyperScript

Kind of a specification of the function `createElement`, most of the time
called `h`, that may be used for different purposes, e.g. used to create DOM,
Virtual DOM, HTML, etc.

- [HyperScript](https://github.com/hyperhype/hyperscript)
- [Virutal HyperScript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript)
- [React HyperScript](https://github.com/mlmorg/react-hyperscript)

----

## HyperScript Helpers

Specification (HyperScript Standard) makes (helper-) libraries possible that
work with different implementations (of `h`) or look mostly the same (only few
differences)

- [HyperScript Helpers](https://github.com/ohanhi/hyperscript-helpers)
- [React HyperScript Helpers](https://github.com/Jador/react-hyperscript-helpers)
