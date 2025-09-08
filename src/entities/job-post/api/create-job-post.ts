'use server'

import { revalidateTag } from 'next/cache'

import { getBusinessSession } from 'entities/auth'
import { apiClient, errorHandler, HttpError } from 'shared/api'

import { CreateJobPost } from '../model/create-job-post'

const handleSuccess = () => {
  revalidateTag('business-job-posts')
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('create-job-posting.error.job-posting-register', {
    error,
    translate: true,
  })
}

export const createJobPost = async (jobPost: CreateJobPost) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.post<null, CreateJobPost>({
      endpoint: '/job-posts',
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: jobPost,
    })

    handleSuccess()
  } catch (error) {
    return handleError(error as Error)
  }
}
