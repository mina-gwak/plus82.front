'use server'

import { getBusinessSession, getTeacherSession } from 'entities/auth'
import { apiClient, errorHandler, HttpError } from 'shared/api'

type ReportFeedRequest = {
  feedId: number
  reason: string
  otherReason: string
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('feed-list.feed-item.report-post-modal.error', {
    error,
    translate: true,
  })
}

export const reportFeed = async ({ feedId, ...body }: ReportFeedRequest) => {
  const { accessToken } = await getTeacherSession()

  try {
    await apiClient.post<null, Omit<ReportFeedRequest, 'feedId'>>({
      endpoint: `/reports/feeds/${feedId}`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}

export const reportBusinessFeed = async ({
  feedId,
  ...body
}: ReportFeedRequest) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.post<null, Omit<ReportFeedRequest, 'feedId'>>({
      endpoint: `/reports/feeds/${feedId}`,
      option: {
        authorization: `Bearer ${accessToken}`,
      },
      body,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
