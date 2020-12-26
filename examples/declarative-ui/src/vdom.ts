interface VirtualElement {
  tagName: string
  attrs: { [key in string]: string }
  children: VirtualElement[]
}

export function createElement(
  tagName: VirtualElement['tagName'],
  {
    attrs = {},
    children = [],
  }: {
    attrs?: VirtualElement['attrs']
    children?: VirtualElement['children']
  } = {},
): VirtualElement {
  return { tagName, attrs, children }
}

export function render(vNode: VirtualElement): HTMLElement {
  // create the element
  //   e.g. <div></div>
  const $el = document.createElement(vNode.tagName)

  // add all attributs as specified in vNode.attrs
  //   e.g. <div id="app"></div>
  for (const [k, v] of Object.entries(vNode.attrs)) {
    $el.setAttribute(k, v)
  }

  // append all children as specified in vNode.children
  //   e.g. <div id="app"><img></div>
  for (const child of vNode.children) {
    $el.appendChild(render(child))
  }

  return $el
}
