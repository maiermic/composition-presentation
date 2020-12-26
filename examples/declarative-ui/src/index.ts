import { createElement, render } from './vdom'

const vApp = createElement('div', {
  attrs: {
    id: 'app',
  },
  children: [
    createElement('img', {
      attrs: {
        src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif',
      },
    }),
  ],
})

const $app = render(vApp)
console.log($app)
