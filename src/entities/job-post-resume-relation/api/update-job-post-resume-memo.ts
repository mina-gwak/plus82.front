'use server'

import { revalidateTag } from 'next/cache'

import { getBusinessSession } from 'entities/auth'
import { apiClient, HttpError, errorHandler, ServerError } from 'shared/api'

const handleSuccess = () => {
  revalidateTag('job-post-resume-relation')
}

const handleError = (error: Error): ServerError => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('Failed to update job post resume memo', {
    error,
  })
}

export const updateJobPostResumeMemo = async (
  jobPostResumeRelationId: number,
  memo: string,
) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.put<null>({
      endpoint: `/job-post-resume-relations/${jobPostResumeRelationId}/memo`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: {
        memo,
      },
    })

    handleSuccess()
  } catch (error) {
    return handleError(error as Error)
  }
}
