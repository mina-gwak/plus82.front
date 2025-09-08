'use client'

import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'

import { ImageUploadInput } from 'features/upload-image'
import { colors } from 'shared/config'
import { cn, isNilOrEmptyString } from 'shared/lib'
import { Icon, Image } from 'shared/ui'

type Props = {
  src: string | null
  external?: boolean
  onChange: (file: File, url: string) => void
  onDelete?: () => void
  className?: string
}

export const ImageUploader = ({
  src,
  external = false,
  onChange,
  onDelete,
  className,
}: Props) => {
  const t = useTranslations('field')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isHovering, setIsHovering] = useState(false)

  const hasImage = !isNilOrEmptyString(src)

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = event => {
      if (reader.readyState === 2) {
        const url = event.target?.result

        if (url) {
          onChange(file, url as string)
        }
      }
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleDeleteButtonClick = async () => {
    onDelete?.()
  }

  return (
    <div
      className={cn(
        'h-[174px] w-[300px] overflow-hidden rounded-lg border border-gray-300',
        className,
      )}
    >
      <ImageUploadInput ref={fileInputRef} onChange={handleFileChange} />

      {hasImage ? (
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={src}
            useCDN={external}
            alt="academy image"
            className="h-[174px] w-[300px] border-none"
          />
          {isHovering && (
            <div className="absolute bottom-0 right-0 flex h-[174px] w-[300px] justify-end rounded-lg bg-black/50 p-3">
              <button className="h-fit" onClick={handleDeleteButtonClick}>
                <Icon
                  name="Close"
                  size="custom"
                  color={colors.white}
                  className="h-8 w-8"
                />
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          className="flex h-full w-full flex-col items-center justify-center gap-2"
          onClick={handleUploadButtonClick}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Icon name="Plus" size="large" color={colors.gray[700]} />
          </div>
          <p className="body-large font-normal text-gray-900">
            {t('introduction-image.placeholder')}
          </p>
        </button>
      )}
    </div>
  )
}
