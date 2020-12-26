import { createElement, mount, render } from './vdom'

const vApp = createElement('div', {
  attrs: {
    id: 'app',
  },
  children: [
    'Hello world', // represents TextNode
    createElement('img', {
      attrs: {
        src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif',
      },
    }), // represents ElementNode
  ],
}) // represents ElementNode

const $app: HTMLElement = render(vApp)
mount($app, document.getElementById('app'))
