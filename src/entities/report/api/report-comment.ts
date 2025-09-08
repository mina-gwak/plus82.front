'use server'

import { getBusinessSession, getTeacherSession } from 'entities/auth'
import { apiClient, errorHandler, HttpError } from 'shared/api'

type ReportCommentRequest = {
  commentId: number
  reason: string
  otherReason: string
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('feed-list.feed-item.report-comment-modal.error', {
    error,
    translate: true,
  })
}

export const reportComment = async ({
  commentId,
  ...body
}: ReportCommentRequest) => {
  const { accessToken } = await getTeacherSession()

  try {
    await apiClient.post<null, Omit<ReportCommentRequest, 'commentId'>>({
      endpoint: `/reports/comments/${commentId}`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}

export const reportBusinessComment = async ({
  commentId,
  ...body
}: ReportCommentRequest) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.post<null, Omit<ReportCommentRequest, 'commentId'>>({
      endpoint: `/reports/comments/${commentId}`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
