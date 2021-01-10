import { zip } from './zip'

export type VirtualNode = VirtualElement | string

export interface VirtualElement {
  tagName: string
  attrs: { [key in string]: string | EventListenerOrEventListenerObject }
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

/**
 * E.g. converts `onClick` to `click`
 * @param attributeName
 */
function attributeNameToEventName(attributeName: string) {
  if (!attributeName.startsWith('on')) {
    throw Error(`attribute name "${attributeName}" is missing prefix "on"`)
  }
  return attributeName[2].toLowerCase() + attributeName.slice(3)
}

function renderElem({ tagName, attrs, children }: VirtualElement): HTMLElement {
  // create the element
  //   e.g. <div></div>
  const $el = document.createElement(tagName)

  // add all attributs as specified in vNode.attrs
  //   e.g. <div id="app"></div>
  for (const [k, v] of Object.entries(attrs)) {
    if (typeof v === 'string') {
      $el.setAttribute(k, v)
    } else {
      console.debug('renderElem addEventListener', $el, k, v)
      $el.addEventListener(attributeNameToEventName(k), v)
    }
  }

  // append all children as specified in vNode.children
  //   e.g. <div id="app"><img></div>
  for (const child of children) {
    $el.appendChild(render(child))
  }

  return $el
}

export function render(vNode: VirtualElement): HTMLElement
export function render(vNode: string): Text
// https://github.com/microsoft/TypeScript/issues/14107
// Support overload resolution with type union arguments
export function render(vNode: VirtualNode): HTMLElement | Text
export function render(vNode: VirtualNode): HTMLElement | Text {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode)
  }

  // we assume everything else to be a virtual element
  return renderElem(vNode)
}

export function mount($node: HTMLElement, $target: HTMLElement): HTMLElement {
  $target.replaceWith($node)
  return $node
}

type Patch = ($node: HTMLElement) => HTMLElement | Text | undefined

export function diff(oldVTree: VirtualNode, newVTree: VirtualNode): Patch {
  // let's assume oldVTree is not undefined!
  if (newVTree === undefined) {
    return $node => {
      $node.remove()
      // the patch should return the new root node.
      // since there is none in this case,
      // we will just return undefined.
      return undefined
    }
  }

  if (typeof oldVTree === 'string' || typeof newVTree === 'string') {
    if (oldVTree !== newVTree) {
      // could be 2 cases:
      // 1. both trees are string and they have different values
      // 2. one of the trees is text node and
      //    the other one is elem node
      // Either case, we will just render(newVTree)!
      return $node => {
        const $newNode = render(newVTree)
        $node.replaceWith($newNode)
        return $newNode
      }
    } else {
      // this means that both trees are string
      // and they have the same values
      return $node => $node
    }
  }

  if (oldVTree.tagName !== newVTree.tagName) {
    // we assume that they are totally different and
    // will not attempt to find the differences.
    // simply render the newVTree and mount it.
    return $node => {
      const $newNode = render(newVTree)
      $node.replaceWith($newNode)
      return $newNode
    }
  }

  const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs)
  const patchChildren = diffChildren(oldVTree.children, newVTree.children)

  return $node => {
    patchAttrs($node)
    patchChildren($node)
    return $node
  }
}

function diffAttrs(
  oldAttrs: VirtualElement['attrs'],
  newAttrs: VirtualElement['attrs'],
): Patch {
  const patches: Patch[] = []

  // setting newAttrs
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push($node => {
      if (typeof v === 'string') {
        $node.setAttribute(k, v)
      } else {
        // TODO event listeners may not be added multiple times
        // $node.addEventListener(attributeNameToEventName(k), v)
      }
      return $node
    })
  }

  // removing attrs
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push($node => {
        if (k.startsWith('on')) {
          // TODO remove event listener (not known here)
          throw Error(`Removing event listeners not implemented yet: ${k}`)
        } else {
          $node.removeAttribute(k)
        }
        return $node
      })
    }
  }

  return function patchAttributes($node: HTMLElement) {
    for (const patch of patches) {
      patch($node)
    }
    return $node
  }
}

function diffChildren(
  oldVChildren: VirtualElement['children'],
  newVChildren: VirtualElement['children'],
): Patch {
  const childPatches: Patch[] = []
  oldVChildren.forEach((oldVChild, i) => {
    childPatches.push(diff(oldVChild, newVChildren[i]))
  })

  const additionalPatches: Patch[] = []
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push($node => {
      $node.appendChild(render(additionalVChild))
      return $node
    })
  }

  return $parent => {
    // since childPatches are expecting the $child, not $parent,
    // we cannot just loop through them and call patch($parent)
    for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
      patch($child as HTMLElement)
    }

    for (const patch of additionalPatches) {
      patch($parent)
    }
    return $parent
  }
}
