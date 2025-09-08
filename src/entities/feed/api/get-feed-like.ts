'use server'

import { apiClient } from 'shared/api'

import { FeedLike } from '../model/feed'

export type GetFeedLikeRequest = {
  feedId: number
}

type GetFeedLikeResponse = FeedLike[]

export const getFeedLike = async ({ feedId }: GetFeedLikeRequest) => {
  const response = await apiClient.get<GetFeedLikeResponse>({
    endpoint: `/feeds/${feedId}/like`,
  })

  return response
}
