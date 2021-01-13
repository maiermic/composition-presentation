import { diff, mount, render } from './vdom'
import {
  a,
  button,
  div,
  footer,
  h1,
  header,
  input,
  label,
  li,
  section,
  span,
  ul,
} from './vdom-helpers'

interface Todo {
  text: string
  completed: boolean
}

enum TodoFilterCriteria {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

class State {
  text: string = ''
  todos: Todo[] = []
  filterCriteria: TodoFilterCriteria = TodoFilterCriteria.ALL
  filteredTodos: Todo[] = []
  leftTodosCount = 0

  constructor(private localStorageKey: string) {
    this.loadStateFromLocalStorage()
  }

  private loadStateFromLocalStorage() {
    const serializedState = window.localStorage.getItem(this.localStorageKey)
    if (serializedState) {
      Object.assign(this, JSON.parse(serializedState))
    }
  }

  private updateLocalStorage() {
    window.localStorage.setItem(this.localStorageKey, JSON.stringify(this))
  }

  onStateChanged() {
    rerender()
    this.updateLocalStorage()
  }

  addTodo = (): void => {
    const todo = { text: this.text, completed: false }
    this.todos.push(todo)
    if (this.filterCriteria !== TodoFilterCriteria.COMPLETED) {
      this.filteredTodos.push(todo)
    }
    this.leftTodosCount++
    this.onStateChanged()
  }

  removeTodo = (index: number): void => {
    const [deletedTodo] = this.filteredTodos.splice(index, 1)
    this.todos.splice(this.todos.indexOf(deletedTodo), 1)
    if (!deletedTodo.completed) {
      this.leftTodosCount--
    }
    this.onStateChanged()
  }

  toggleTodo = (index: number): void => {
    const todo = this.filteredTodos[index]
    todo.completed = !todo.completed
    this.leftTodosCount += todo.completed ? -1 : 1
    if (
      (!todo.completed &&
        this.filterCriteria === TodoFilterCriteria.COMPLETED) ||
      (todo.completed && this.filterCriteria === TodoFilterCriteria.ACTIVE)
    ) {
      this.filteredTodos.splice(index, 1)
    }
    this.onStateChanged()
  }

  clearCompletedTodos() {
    this.todos = this.todos.filter(todo => !todo.completed)
    if (this.filterCriteria === TodoFilterCriteria.COMPLETED) {
      this.filteredTodos = []
    }
    this.leftTodosCount = this.todos.length
    this.onStateChanged()
  }

  setText = (text: string): void => {
    this.text = text
    this.onStateChanged()
  }

  setFilterCriteria(filterCriteria: TodoFilterCriteria) {
    if (this.filterCriteria === filterCriteria) {
      return
    }
    this.filterCriteria = filterCriteria
    switch (filterCriteria) {
      case TodoFilterCriteria.ALL:
        this.filteredTodos = [...this.todos]
        break
      case TodoFilterCriteria.ACTIVE:
        this.filteredTodos = this.todos.filter(todo => !todo.completed)
        break
      case TodoFilterCriteria.COMPLETED:
        this.filteredTodos = this.todos.filter(todo => todo.completed)
        break
      default:
        console.warn('unhandled filter criteria', filterCriteria)
    }
    this.onStateChanged()
  }
}

function FilterLink(state: {
  isSelected: boolean
  text: string
  href: string
}) {
  return a(
    {
      href: state.href,
      class: state.isSelected ? 'selected' : '',
    },
    state.text,
  )
}

const createVApp = (state: State) =>
  section({ class: 'todoapp' }, [
    header({ class: 'header' }, [
      h1('todos'),
      input({
        class: 'new-todo',
        placeholder: 'What needs to be done?',
        value: state.text,
        autofocus: '',
        onInput(event: InputEvent) {
          const inputText = (event.target as HTMLInputElement).value
          state.setText(inputText)
        },
        onKeyup(event: KeyboardEvent) {
          if (event.key === 'Enter') {
            state.addTodo()
            state.setText('')
          }
        },
      }),
    ]),
    section({ class: 'main' }, [
      input({ id: 'toggle-all', class: 'toggle-all', type: 'checkbox' }),
      label({ for: 'toggle-all' }, 'Mark all as complete'),
      ul(
        { class: 'todo-list' },
        state.filteredTodos.map((todo: Todo, index) =>
          li({ class: todo.completed ? 'completed' : '' }, [
            div({ class: 'view' }, [
              input({
                class: 'toggle',
                type: 'checkbox',
                checked: todo.completed,
                onClick(_event: Event) {
                  state.toggleTodo(index)
                },
              }),
              label(todo.text),
              button({
                class: 'destroy',
                onClick(_event: Event) {
                  console.debug('remove TODO', index)
                  state.removeTodo(index)
                },
              }),
            ]),
            input({ class: 'edit', value: 'Rule the web' }),
          ]),
        ),
      ),
      footer({ class: 'footer' }, [
        span({ class: 'todo-count' }, [
          String(state.leftTodosCount),
          ' item left',
        ]),
        ul({ class: 'filters' }, [
          li([
            FilterLink({
              text: 'All',
              href: '#/',
              isSelected: state.filterCriteria === TodoFilterCriteria.ALL,
            }),
          ]),
          li([
            FilterLink({
              text: 'Active',
              href: '#/active',
              isSelected: state.filterCriteria === TodoFilterCriteria.ACTIVE,
            }),
          ]),
          li([
            FilterLink({
              text: 'Completed',
              href: '#/completed',
              isSelected: state.filterCriteria === TodoFilterCriteria.COMPLETED,
            }),
          ]),
        ]),
        button(
          {
            class: 'clear-completed',
            onClick(_event: Event) {
              state.clearCompletedTodos()
            },
          },
          'Clear completed',
        ),
      ]),
    ]),
  ])

const state: State = new State('todo-list')
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

const updateRoute = () => {
  switch (document.location.hash) {
    case '#/active':
      state.setFilterCriteria(TodoFilterCriteria.ACTIVE)
      break
    case '#/completed':
      state.setFilterCriteria(TodoFilterCriteria.COMPLETED)
      break
    default:
      state.setFilterCriteria(TodoFilterCriteria.ALL)
  }
}
window.addEventListener('load', updateRoute)
window.addEventListener('hashchange', updateRoute)
