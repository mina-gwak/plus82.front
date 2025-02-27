'use client'

import { ChangeEvent, useRef } from 'react'
import { toast } from 'react-toastify'

import { Card, uploadResumeFile } from 'entities/resume'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { colors } from 'shared/config'
import { Icon } from 'shared/ui'

export const UploadResume = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { handleServerError } = useServerErrorHandler()

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    const response = await uploadResumeFile({ file })

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      toast.success('Resume file uploaded successfully')

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        className="hidden"
      />
      <button type="button" onClick={handleUploadButtonClick}>
        <Card
          size="medium"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Icon name="Upload" size="large" color={colors.gray[700]} />
          </div>
          <p className="title-small text-gray-900">Upload Resume</p>
        </Card>
      </button>
    </>
  )
}
