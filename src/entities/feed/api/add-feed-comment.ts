'use server'

import { getBusinessSession, getTeacherSession } from 'entities/auth'
import { apiClient, errorHandler, HttpError } from 'shared/api'

type AddFeedCommentRequest = {
  comment: string
  feedId: number
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('feed-list.feed-item.comment.error.add', {
    error,
    translate: true,
  })
}

export const addFeedComment = async ({
  feedId,
  comment,
}: AddFeedCommentRequest) => {
  const { accessToken } = await getTeacherSession()

  try {
    await apiClient.post<null, Omit<AddFeedCommentRequest, 'feedId'>>({
      endpoint: `/feeds/${feedId}/comments`,
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

export const addBusinessFeedComment = async ({
  feedId,
  comment,
}: AddFeedCommentRequest) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.post<null, Omit<AddFeedCommentRequest, 'feedId'>>({
      endpoint: `/feeds/${feedId}/comments`,
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
