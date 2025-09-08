'use client'

import { useEffect, useRef } from 'react'

type Props = {
  callback: () => void
  threshold?: number
}

export const useObserver = ({ callback, threshold = 0.3 }: Props) => {
  const targetRef = useRef<HTMLDivElement>(null)

  let observer: IntersectionObserver | null = null

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback()
      }
    })
  }

  const observe = () => {
    if (targetRef.current) {
      observer = new IntersectionObserver(handleIntersection, {
        threshold,
      })
      observer.observe(targetRef.current)
    }
  }

  const disconnect = () => {
    if (observer) {
      observer.disconnect()
    }
  }

  useEffect(() => {
    observe()

    return () => {
      disconnect()
    }
  }, [])

  return targetRef
}
