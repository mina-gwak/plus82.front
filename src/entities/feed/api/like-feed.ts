'use server'

import { getBusinessSession, getTeacherSession } from 'entities/auth'
import { apiClient, errorHandler, HttpError } from 'shared/api'

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('feed-list.feed-form.error.like', {
    error,
    translate: true,
  })
}

export const likeFeed = async (feedId: number) => {
  const { accessToken } = await getTeacherSession()

  try {
    await apiClient.post<null, null>({
      endpoint: `/feeds/${feedId}/like`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: null,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}

export const likeBusinessFeed = async (feedId: number) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.post<null, null>({
      endpoint: `/feeds/${feedId}/like`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: null,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
