import { diff, mount, render } from './vdom'
import { button, form, input, li, ul } from './vdom-helpers'

interface Todo {
  text: string
}

class State {
  text: string = ''
  todos: Todo[] = []

  addTodo = (): void => {
    this.todos.push({ text: this.text })
    rerender()
  }

  setText = (text: string): void => {
    this.text = text
    rerender()
  }
}

const createVApp = ({ text, addTodo, setText, todos }: State) =>
  form(
    {
      onSubmit(_event: Event) {
        console.log('submit')
        addTodo()
      },
      action: 'javascript:',
    },
    [
      input({
        value: text,
        onInput(event: Event) {
          const inputText = (event.target as HTMLInputElement).value
          console.log('input', inputText)
          setText(inputText)
        },
      }),
      button({ type: 'submit' }, ['Add']),
      ul(
        {},
        todos.map(({ text }: Todo) => li({}, [text])),
      ),
    ],
  )

const state: State = new State()
let vApp = createVApp(state)
const $app = render(vApp)
let $rootEl: HTMLElement | Text = mount($app, document.getElementById('app'))

function rerender() {
  const vNewApp = createVApp(state)
  const patch = diff(vApp, vNewApp)

  // we might replace the whole $rootEl,
  // so we want the patch will return the new $rootEl
  $rootEl = patch($rootEl as HTMLElement)

  vApp = vNewApp
}
