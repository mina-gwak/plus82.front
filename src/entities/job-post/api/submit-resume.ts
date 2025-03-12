'use server'

import { getSession } from 'entities/auth'
import {
  apiClient,
  errorHandler,
  HttpError,
  JobPostExceptionCode,
  ServerError,
} from 'shared/api'

type SubmitResumeRequest = {
  jobPostId: number
  resumeId: number
  coverLetter: string
}

const handleError = (error: Error): ServerError => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  if (error.code === JobPostExceptionCode.JOB_POST_CLOSED) {
    return errorHandler.toast('This job post is closed', error)
  } else if (error.code === JobPostExceptionCode.RESUME_ALREADY_SUBMITTED) {
    return errorHandler.toast('You have already applied for this job post')
  } else {
    return errorHandler.toast(
      'An error occurred while submitting the resume',
      error,
    )
  }
}

export const submitResume = async ({
  jobPostId,
  resumeId,
  coverLetter,
}: SubmitResumeRequest): Promise<ServerError | undefined> => {
  const { accessToken } = await getSession()

  try {
    await apiClient.post<null>({
      endpoint: `/job-posts/${jobPostId}/submit-resume/${resumeId}`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: {
        coverLetter,
      },
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
