'use server'

import { revalidateTag } from 'next/cache'

import { getBusinessSession } from 'entities/auth'
import { apiClient, errorHandler, HttpError } from 'shared/api'

const handleSuccess = () => {
  revalidateTag('business-job-posts')
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('An error occurred while copying job post', {
    error,
  })
}

export const copyJobPost = async (jobPostId: number) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.post<null, null>({
      endpoint: `/job-posts/${jobPostId}/copy`,
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
