'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { cn } from 'shared/lib'

export type Props = {
  content: string
  lineClamp?: number
}

export const ExpandableText = ({ content, lineClamp = 2 }: Props) => {
  const t = useTranslations()
  const locale = useLocale()

  const pRef = useRef<HTMLParagraphElement>(null)
  const [lineHeight, setLineHeight] = useState<number | null>(null)
  const [expanding, setExpanding] = useState(false)
  const originalRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!pRef.current) {
        return
      }
      setLineHeight(parseFloat(getComputedStyle(pRef.current).lineHeight))
    })

    if (pRef.current) {
      observer.observe(pRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const maxHeight = lineHeight ? lineHeight * lineClamp : undefined

  const isOverflown =
    originalRef.current?.scrollHeight &&
    maxHeight &&
    originalRef.current?.scrollHeight > maxHeight

  const handleButtonClick = () => {
    setExpanding(prev => !prev)
  }

  return (
    <>
      <p className="h-0 overflow-hidden" ref={originalRef}>
        {content}
      </p>

      <p
        ref={pRef}
        className="relative overflow-hidden"
        style={{ maxHeight: expanding ? undefined : maxHeight }}
      >
        {content}
        {!isOverflown
          ? null
          : !expanding && (
              <button
                className={cn(
                  'z-1 text-primary title-small absolute bottom-0 right-0 block bg-gradient-to-r from-transparent via-white to-white pl-8 font-normal text-gray-700 hover:text-gray-900 hover:underline',
                  locale === 'ko' ? 'via-30%' : 'via-20%',
                )}
                onClick={handleButtonClick}
              >
                {t('feed-list.feed-item.button.show-more')}
              </button>
            )}
      </p>
    </>
  )
}
