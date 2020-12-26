import { createElement, mount, render } from './vdom'

const createVApp = (count: number) =>
  createElement('div', {
    attrs: {
      id: 'app',
      dataCount: String(count), // we use the count here
    },
    children: [
      'The current count is: ',
      String(count), // and here
      createElement('img', {
        attrs: {
          src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif',
        },
      }),
    ],
  })

let count = 0
const vApp = createVApp(count)
const $app = render(vApp)
let $rootEl = mount($app, document.getElementById('app'))

setInterval(() => {
  count++
  $rootEl = mount(render(createVApp(count)), $rootEl)
}, 1000)
