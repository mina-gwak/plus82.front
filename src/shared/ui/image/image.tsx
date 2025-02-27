'use client'

import NextImage, { type ImageProps } from 'next/image'
import { ReactNode, useState } from 'react'

import { cn, isNilOrEmptyString } from 'shared/lib'

type Props = ImageProps & {
  fallback?: ReactNode
  useCDN?: boolean
}

export const Image = ({
  src,
  alt,
  className,
  fallback,
  useCDN = true,
  ...restProps
}: Props) => {
  const [error, setError] = useState(false)

  const handleError = () => {
    setError(true)
  }

  if (error || isNilOrEmptyString(src)) {
    if (fallback) {
      return fallback
    }

    return (
      <div className={cn('border border-gray-200 bg-gray-200', className)} />
    )
  }

  const imageSrc = useCDN ? `${process.env.NEXT_PUBLIC_CDN_URL}/${src}` : src

  return (
    <div
      className={cn(
        'relative overflow-hidden border border-gray-200',
        className,
      )}
    >
      <NextImage
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        onError={handleError}
        {...restProps}
      />
    </div>
  )
}
