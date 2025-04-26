'use server'

import { revalidateTag } from 'next/cache'

import { getBusinessSession } from 'entities/auth'
import { apiClient, HttpError, errorHandler, ServerError } from 'shared/api'

import { ApplicationStatus } from '../model/status'

const handleSuccess = () => {
  revalidateTag('job-post-resume-relation')
}

const handleError = (error: Error): ServerError => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('Failed to update job post resume status', {
    error,
  })
}

export const updateJobPostResumeStatus = async (
  jobPostResumeRelationId: number,
  status: ApplicationStatus,
) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.put<null>({
      endpoint: `/job-post-resume-relations/${jobPostResumeRelationId}/status`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: {
        status,
      },
    })

    handleSuccess()
  } catch (error) {
    return handleError(error as Error)
  }
}
