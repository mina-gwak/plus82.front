'use client'

import { ChangeEvent, useRef } from 'react'
import { toast } from 'react-toastify'

import { updateProfileImage } from 'entities/user'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { colors } from 'shared/config'
import { isNilOrEmptyString } from 'shared/lib'
import { Button, Icon, Image } from 'shared/ui'

type Props = {
  src: string
  alt: string
}

export const UserImage = ({ src, alt }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { handleServerError } = useServerErrorHandler()

  const hasImage = !isNilOrEmptyString(src)

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    const response = await updateProfileImage({ image: file })

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      toast.success('Profile image updated successfully')
    }
  }

  // TODO: 삭제 안됨, 확인 필요
  const handleDeleteButtonClick = async () => {
    const response = await updateProfileImage({ image: null })

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      toast.success('Profile image deleted successfully')
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div>
        <Image
          src={src}
          alt={alt}
          className="h-[110px] w-[110px] rounded-full"
          fallback={
            <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-gray-300">
              <Icon
                name="User"
                size="custom"
                className="h-[100px] w-[100px]"
                color={colors.gray[700]}
              />
            </div>
          }
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="lined" size="small" onClick={handleUploadButtonClick}>
          <Button.Icon name="Plus" />
          Upload
        </Button>
        <Button
          variant="lined"
          size="small"
          disabled={!hasImage}
          onClick={handleDeleteButtonClick}
        >
          <Button.Icon name="Delete" />
          Delete
        </Button>
      </div>
    </div>
  )
}
