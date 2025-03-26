'use server'

import { revalidateTag } from 'next/cache'

import { getSession } from 'entities/auth'
import {
  apiClient,
  errorHandler,
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
    return errorHandler.toast('Resume not found')
  } else if (
    error.code === ResumeExceptionCode.FILE_RESUME_CANNOT_BE_MODIFIED
  ) {
    return errorHandler.toast('File resume cannot be modified')
  } else {
    return errorHandler.toast('An error occurred while copying resume', {
      error,
    })
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
