'use client'

import { ReactNode, useLayoutEffect, useRef, useState } from 'react'

const DEFAULT_OFFSET = 10

export const useFixWidth = <T extends HTMLElement>(
  children: ReactNode,
  { offset = DEFAULT_OFFSET }: { offset?: number } = {},
) => {
  const childrenRef = useRef<T>(null)
  const [width, setWidth] = useState<number | null>()

  useLayoutEffect(() => {
    if (childrenRef.current) {
      const childrenWidth = childrenRef.current.offsetWidth
      setWidth(childrenWidth + offset * 2)
    }
  }, [children, offset])

  return { width, childrenRef }
}
