import { createElement, VirtualElement } from './vdom'

export function createElementHelper(tagName: string) {
  return (
    attrs: VirtualElement['attrs'] = {},
    children: VirtualElement['children'] = [],
  ) => createElement(tagName, { attrs, children })
}

export const button = createElementHelper('button')
export const div = createElementHelper('div')
export const form = createElementHelper('form')
export const img = createElementHelper('img')
export const input = createElementHelper('input')
export const li = createElementHelper('li')
export const ul = createElementHelper('ul')
