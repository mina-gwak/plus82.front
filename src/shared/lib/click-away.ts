import type { Dispatch, RefObject, SetStateAction } from 'react'
import { useCallback, useEffect, useState } from 'react'

type Props<T> = {
  ref: RefObject<T>
  callback?: (event: MouseEvent) => void
}

type ReturnType = [boolean, Dispatch<SetStateAction<boolean>>]

export const useClickAway = <T extends HTMLElement>({
  ref,
  callback,
}: Props<T>): ReturnType => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setIsOpen(false)
        callback?.(event)
      }
    },
    [callback, ref],
  )

  useEffect(() => {
    window.addEventListener('click', handleClick, true)

    return () => {
      window.removeEventListener('click', handleClick, true)
    }
  }, [handleClick, ref])

  return [isOpen, setIsOpen]
}
