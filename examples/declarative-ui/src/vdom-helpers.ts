import { createElement, VirtualElement } from './vdom'

export function createElementHelper(tagName: string) {
  function createHelper(attrs: VirtualElement['attrs']): VirtualElement
  function createHelper(children: VirtualElement['children']): VirtualElement
  function createHelper(child: string): VirtualElement
  function createHelper(
    attrs: VirtualElement['attrs'],
    children: VirtualElement['children'] | string,
  ): VirtualElement
  function createHelper(...args: any[]): VirtualElement {
    if (args.length > 1) {
      const [attrs, children] = args
      return createElement(tagName, {
        attrs,
        children: typeof children === 'string' ? [children] : children,
      })
    }
    const arg = args[0]
    if (Array.isArray(arg)) {
      return createElement(tagName, { children: arg })
    }
    if (typeof arg === 'string') {
      return createElement(tagName, { children: [arg] })
    }
    if (typeof arg === 'object') {
      return createElement(tagName, { attrs: arg })
    }
    throw Error(`Unexpected argument ${arg} of type ${typeof arg}`)
  }

  return createHelper
}

export const a = createElementHelper('a')
export const button = createElementHelper('button')
export const div = createElementHelper('div')
export const footer = createElementHelper('footer')
export const form = createElementHelper('form')
export const h1 = createElementHelper('h1')
export const header = createElementHelper('header')
export const img = createElementHelper('img')
export const input = createElementHelper('input')
export const label = createElementHelper('label')
export const li = createElementHelper('li')
export const ul = createElementHelper('ul')
export const section = createElementHelper('section')
export const span = createElementHelper('span')
