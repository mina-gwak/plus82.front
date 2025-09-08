'use server'

import { getBusinessSession, getTeacherSession } from 'entities/auth'
import { apiClient, ContentType, errorHandler, HttpError } from 'shared/api'

type AddFeedRequest = {
  content: string
  image?: File
  feedVisibility: 'PUBLIC' | 'PRIVATE'
}

const handleError = (error: Error) => {
  const isHttpError = error instanceof HttpError
  if (!isHttpError) throw error

  return errorHandler.toast('feed-list.feed-form.error.add', {
    error,
    translate: true,
  })
}

export const addFeed = async (feed: AddFeedRequest) => {
  const { accessToken } = await getTeacherSession()

  try {
    await apiClient.post<null, AddFeedRequest>({
      endpoint: '/feeds',
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

export const addBusinessFeed = async (feed: AddFeedRequest) => {
  const { accessToken } = await getBusinessSession()

  try {
    await apiClient.post<null, AddFeedRequest>({
      endpoint: '/feeds',
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
