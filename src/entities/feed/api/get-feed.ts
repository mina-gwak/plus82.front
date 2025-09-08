'use server'

import {
  getNullableBusinessSession,
  getNullableTeacherSession,
} from 'entities/auth'
import { apiClient } from 'shared/api'

import { FeedDetail } from '../model/feed'

export type GetFeedRequest = {
  feedId: number
}

type GetFeedResponse = FeedDetail

export const getFeed = async ({ feedId }: GetFeedRequest) => {
  const session = await getNullableTeacherSession()

  const hasSession = !!session
  const endpoint = hasSession ? `/feeds/${feedId}` : `/feeds/public/${feedId}`

  const response = await apiClient.get<GetFeedResponse>({
    endpoint,
    ...(hasSession
      ? { option: { authorization: `Bearer ${session.accessToken}` } }
      : {}),
  })

  return response
}

export const getBusinessFeed = async ({ feedId }: GetFeedRequest) => {
  const session = await getNullableBusinessSession()

  const hasSession = !!session
  const endpoint = hasSession ? `/feeds/${feedId}` : `/feeds/public/${feedId}`

  const response = await apiClient.get<GetFeedResponse>({
    endpoint,
    ...(hasSession
      ? { option: { authorization: `Bearer ${session.accessToken}` } }
      : {}),
  })

  return response
}
