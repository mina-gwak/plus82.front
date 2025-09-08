import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'

import { ImageUploadInput } from 'features/upload-image'
import { colors } from 'shared/config'
import { cn, isNilOrEmptyString } from 'shared/lib'
import { Icon, Image } from 'shared/ui'

type ImageData = {
  imageId: number | null
  image: File | null
  url: string | null
}

type ImageUploaderProps = {
  value?: ImageData
  onChange?: ({ file, url }: { file: File; url: string }) => void
  onDelete?: () => void
  className?: string
}

export const ImageUploader = ({
  value,
  onChange,
  onDelete,
  className,
}: ImageUploaderProps) => {
  const t = useTranslations()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const hasImage = value?.image || value?.url

  const handleFileChange = async (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = event => {
      if (reader.readyState === 2) {
        const url = event.target?.result

        if (url) {
          onChange?.({ file, url: url as string })
          setIsHovering(false)
        }
      }
    }
  }

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleDeleteButtonClick = () => {
    onDelete?.()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const { files } = e.dataTransfer
    if (files.length > 0) {
      const file = files[0]
      handleFileChange(file)
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  if (hasImage) {
    return (
      <div
        className="relative w-fit"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={value?.url ?? ''}
          useCDN={!isNilOrEmptyString(value?.imageId)}
          alt="academy image"
          className="h-[100px] w-[100px] rounded-lg border border-gray-300"
        />
        {isHovering && (
          <div className="absolute bottom-0 right-0 flex h-[100px] w-[100px] justify-end overflow-hidden rounded-lg bg-black/50 p-1.5">
            <button className="h-fit" onClick={handleDeleteButtonClick}>
              <Icon
                name="Close"
                size="custom"
                color={colors.white}
                className="h-6 w-6"
              />
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'h-[100px] w-full overflow-hidden rounded-lg border transition-colors',
        isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <ImageUploadInput ref={fileInputRef} onChange={handleFileChange} />

      <button
        className="flex h-full w-full flex-col items-center justify-center gap-3 p-6"
        onClick={handleUploadButtonClick}
      >
        <div className="flex flex-col items-center">
          <Icon
            name="Image"
            size="custom"
            className="h-8 w-8"
            color={colors.gray[500]}
          />
          <p className="title-small font-normal text-gray-500">
            {t('field.feed-image.placeholder')}
          </p>
        </div>
      </button>
    </div>
  )
}
