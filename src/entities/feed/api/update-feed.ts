'use server'

import { getBusinessSession, getTeacherSession } from 'entities/auth'
import { apiClient, ContentType, errorHandler, HttpError } from 'shared/api'

type UpdateFeedRequest = {
  feedId: number
  content: string
  feedVisibility: 'PUBLIC' | 'PRIVATE'
  newImage?: File
  oldImageId?: number | null
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('feed-list.feed-form.error.update', {
    error,
    translate: true,
  })
}

export const updateFeed = async ({ feedId, ...feed }: UpdateFeedRequest) => {
  const { accessToken } = await getTeacherSession()

  try {
    await apiClient.put<null, Omit<UpdateFeedRequest, 'feedId'>>({
      endpoint: `/feeds/${feedId}`,
      option: {
        contentType: ContentType.MULTIPART,
        authorization: `Bearer ${accessToken}`,
      },
      body: feed,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}

export const updateBusinessFeed = async ({
  feedId,
  ...feed
}: UpdateFeedRequest) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.put<null, Omit<UpdateFeedRequest, 'feedId'>>({
      endpoint: `/feeds/${feedId}`,
      option: {
        contentType: ContentType.MULTIPART,
        authorization: `Bearer ${accessToken}`,
      },
      body: feed,
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
