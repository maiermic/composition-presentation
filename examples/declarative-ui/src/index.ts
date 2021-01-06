import { createElement, diff, mount, render } from './vdom'

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
let vApp = createVApp(count)
const $app = render(vApp)
let $rootEl: HTMLElement | Text = mount($app, document.getElementById('app'))

setInterval(() => {
  count++
  const vNewApp = createVApp(count)
  const patch = diff(vApp, vNewApp)

  // we might replace the whole $rootEl,
  // so we want the patch will return the new $rootEl
  $rootEl = patch($rootEl as HTMLElement)

  vApp = vNewApp
}, 1000)
