'use server'

import { getSession } from 'entities/auth'
import {
  apiClient,
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
    return {
      type: 'toast',
      message: 'This job post is closed',
    }
  } else if (error.code === JobPostExceptionCode.RESUME_ALREADY_SUBMITTED) {
    return {
      type: 'toast',
      message: 'You have already applied for this job post',
    }
  } else {
    return {
      type: 'toast',
      message: error.message || 'An error occurred while submitting the resume',
    }
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
