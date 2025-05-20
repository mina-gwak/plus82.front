'use server'

import { revalidateTag } from 'next/cache'

import { getTeacherSession } from 'entities/auth'
import { apiClient, ContentType, errorHandler, HttpError } from 'shared/api'

type UploadResumeFileRequest = {
  file: File
}

const handleSuccess = () => {
  revalidateTag('resumes')
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('An error occurred while uploading resume file', {
    error,
  })
}

export const uploadResumeFile = async (data: UploadResumeFileRequest) => {
  const { accessToken } = await getTeacherSession()

  try {
    await apiClient.post<null, UploadResumeFileRequest>({
      endpoint: '/resumes/file',
      option: {
        contentType: ContentType.MULTIPART,
        authorization: `Bearer ${accessToken}`,
      },
      body: data,
    })

    handleSuccess()
  } catch (error) {
    return handleError(error as Error)
  }
}
