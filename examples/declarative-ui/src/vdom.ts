export type VirtualNode = VirtualElement | string

export interface VirtualElement {
  tagName: string
  attrs: { [key in string]: string }
  children: VirtualNode[]
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

function renderElem({ tagName, attrs, children }: VirtualElement): HTMLElement {
  // create the element
  //   e.g. <div></div>
  const $el = document.createElement(tagName)

  // add all attributs as specified in vNode.attrs
  //   e.g. <div id="app"></div>
  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v)
  }

  // append all children as specified in vNode.children
  //   e.g. <div id="app"><img></div>
  for (const child of children) {
    $el.appendChild(render(child))
  }

  return $el
}

export function render(vNode: VirtualNode): HTMLElement | Text {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode)
  }

  // we assume everything else to be a virtual element
  return renderElem(vNode)
}
