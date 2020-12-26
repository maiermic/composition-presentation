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
) {
  return { tagName, attrs, children }
}
