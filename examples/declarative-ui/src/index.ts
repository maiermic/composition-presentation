import { createElement, render } from './vdom'

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

const $app = render(vApp)
console.log($app)
