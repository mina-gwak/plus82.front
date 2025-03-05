'use server'

import { revalidateTag } from 'next/cache'

import { getSession } from 'entities/auth'
import {
  apiClient,
  HttpError,
  ResourceNotFoundExceptionCode,
  ResumeExceptionCode,
} from 'shared/api'

const handleSuccess = () => {
  revalidateTag('resumes')
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  if (error.code === ResourceNotFoundExceptionCode.RESUME_NOT_FOUND) {
    return {
      type: 'toast',
      message: 'Resume not found',
    }
  } else if (
    error.code === ResumeExceptionCode.FILE_RESUME_CANNOT_BE_MODIFIED
  ) {
    return {
      type: 'toast',
      message: 'File resume cannot be modified',
    }
  } else {
    return {
      type: 'toast',
      message: error.message || 'An error occurred while copying resume',
    }
  }
}

export const copyResume = async (resumeId: number) => {
  const { accessToken } = await getSession()

  try {
    await apiClient.post<null, null>({
      endpoint: `/resumes/${resumeId}/copy`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: null,
    })

    handleSuccess()
  } catch (error) {
    return handleError(error as Error)
  }
}
