'use server'

import { getBusinessSession, getTeacherSession } from 'entities/auth'
import { apiClient, errorHandler, HttpError } from 'shared/api'

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('feed-list.feed-item.comment.error.unlike', {
    error,
    translate: true,
  })
}

type UnlikeCommentRequest = {
  commentId: number
  feedId: number
}

export const unlikeComment = async ({
  commentId,
  feedId,
}: UnlikeCommentRequest) => {
  const { accessToken } = await getTeacherSession()

  try {
    await apiClient.delete<null, null>({
      endpoint: `/feeds/${feedId}/comments/${commentId}/like`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: null,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}

export const unlikeBusinessComment = async ({
  commentId,
  feedId,
}: UnlikeCommentRequest) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.delete<null, null>({
      endpoint: `/feeds/${feedId}/comments/${commentId}/like`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: null,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
