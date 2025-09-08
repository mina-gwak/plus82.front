'use server'

import { getBusinessSession, getTeacherSession } from 'entities/auth'
import { apiClient, errorHandler, HttpError } from 'shared/api'

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('feed-list.feed-item.comment.error.delete', {
    error,
    translate: true,
  })
}

export const deleteComment = async (feedId: number, commentId: number) => {
  const { accessToken } = await getTeacherSession()

  try {
    await apiClient.delete<null, null>({
      endpoint: `/feeds/${feedId}/comments/${commentId}`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: null,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}

export const deleteBusinessComment = async (
  feedId: number,
  commentId: number,
) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.delete<null, null>({
      endpoint: `/feeds/${feedId}/comments/${commentId}`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
