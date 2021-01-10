import { createElement, VirtualElement } from './vdom'

export function createElementHelper(tagName: string) {
  return (
    attrs: VirtualElement['attrs'] = {},
    children: VirtualElement['children'] = [],
  ) => createElement(tagName, { attrs, children })
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
