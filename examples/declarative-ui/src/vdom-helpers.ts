import { createElement, VirtualElement } from './vdom'

export function createElementHelper(tagName: string) {
  return (
    attrs: VirtualElement['attrs'] = {},
    children: VirtualElement['children'] = [],
  ) => createElement(tagName, { attrs, children })
}

export const div = createElementHelper('div')
export const img = createElementHelper('img')
