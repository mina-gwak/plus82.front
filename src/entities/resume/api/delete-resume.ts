'use server'

import { revalidateTag } from 'next/cache'

import { getSession } from 'entities/auth'
import {
  apiClient,
  errorHandler,
  HttpError,
  ResourceNotFoundExceptionCode,
} from 'shared/api'

const handleSuccess = () => {
  revalidateTag('resumes')
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  if (error.code === ResourceNotFoundExceptionCode.RESUME_NOT_FOUND) {
    return errorHandler.toast('Resume is not found')
  }

  return errorHandler.toast('Failed to delete resume', error)
}

export const deleteResume = async (resumeId: number) => {
  const { accessToken } = await getSession()

  try {
    await apiClient.delete<null>({
      endpoint: `/resumes/${resumeId}`,
      option: {
        authorization: `Bearer ${accessToken}`,
        tags: ['resume'],
      },
    })

    handleSuccess()
  } catch (error) {
    return handleError(error as Error)
  }
}
