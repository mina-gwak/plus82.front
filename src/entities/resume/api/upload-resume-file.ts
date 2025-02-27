'use server'

import { revalidateTag } from 'next/cache'

import { getSession } from 'entities/auth'
import { apiClient, ContentType, HttpError } from 'shared/api'

type UploadResumeFileRequest = {
  file: File
}

const handleSuccess = () => {
  revalidateTag('resumes')
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return {
    type: 'toast',
    message: error.message || 'An error occurred while uploading resume file',
  }
}

export const uploadResumeFile = async (data: UploadResumeFileRequest) => {
  const { accessToken } = await getSession()

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
