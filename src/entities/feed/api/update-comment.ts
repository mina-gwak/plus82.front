'use server'

import { getBusinessSession, getTeacherSession } from 'entities/auth'
import { apiClient, errorHandler, HttpError } from 'shared/api'

type UpdateCommentRequest = {
  feedId: number
  commentId: number
  comment: string
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('feed-list.feed-item.comment.error.update', {
    error,
    translate: true,
  })
}

export const updateComment = async ({
  feedId,
  commentId,
  comment,
}: UpdateCommentRequest) => {
  const { accessToken } = await getTeacherSession()

  try {
    await apiClient.put<null, Pick<UpdateCommentRequest, 'comment'>>({
      endpoint: `/feeds/${feedId}/comments/${commentId}`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: {
        comment,
      },
    })
  } catch (error) {
    return handleError(error as Error)
  }
}

export const updateBusinessComment = async ({
  feedId,
  commentId,
  comment,
}: UpdateCommentRequest) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.put<null, Pick<UpdateCommentRequest, 'comment'>>({
      endpoint: `/feeds/${feedId}/comments/${commentId}`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body: {
        comment,
      },
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
