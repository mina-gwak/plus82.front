/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useCallback, useRef } from 'react'

export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) => {
  const timeoutRef = useRef<NodeJS.Timeout>()

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay],
  )

  const immediateCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      callback(...args)
    },
    [callback],
  )

  return { debouncedCallback, immediateCallback }
}
