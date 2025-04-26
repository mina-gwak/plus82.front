import { isArray, isUndefined } from 'lodash-es'
import {
  ReactNode,
  Children,
  isValidElement,
  Fragment,
  ReactElement,
  ReactPortal,
  JSXElementConstructor,
} from 'react'

type Child =
  | ReactPortal
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ReactElement<unknown, string | JSXElementConstructor<any>>

type Slots = {
  [key: string]: ReactNode
}

export const createSlot = (children: ReactNode, slots: string[]) => {
  const slotMap: Slots = {}

  const hasSlot = (slot: string) => !isUndefined(slotMap[slot])

  const isFragment = (child: Child) => child.type === Fragment

  const addSlot = (child: ReactNode) => {
    if (!isValidElement(child)) return

    if (isFragment(child)) {
      const fragmentChildren = child.props.children

      if (isArray(fragmentChildren)) {
        child.props.children.forEach((subChild: Child) => addSlot(subChild))
      } else {
        addSlot(child.props.children)
      }

      return
    }

    const slotName = child.props.name
    if (slotName && slots.includes(slotName)) {
      slotMap[slotName] = child.props.children
    }
  }

  Children.forEach(children, child => addSlot(child))

  return { slots: slotMap, hasSlot }
}
