import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react'

type EmptyState = {
  isEmpty: boolean
  setIsEmpty: (empty: boolean) => void
}

export const EmptyContext = createContext<EmptyState | null>(null)

type Props = {
  fallback?: ReactNode
  trigger?: unknown
}

export const EmptyBoundary = ({
  fallback,
  trigger,
  children,
}: PropsWithChildren<Props>) => {
  const [isEmpty, setIsEmpty] = useState(false)
  const prevTriggerRef = useRef(trigger)

  if (prevTriggerRef.current !== trigger) {
    setIsEmpty(false)
    prevTriggerRef.current = trigger
  }

  const value = useMemo(() => ({ isEmpty, setIsEmpty }), [isEmpty])

  return (
    <EmptyContext.Provider value={value}>
      {isEmpty ? fallback : children}
    </EmptyContext.Provider>
  )
}
