'use server'

import {
  getNullableBusinessSession,
  getNullableTeacherSession,
} from 'entities/auth'
import { apiClient, Pagination, PaginationParams } from 'shared/api'

import { Feed } from '../model/feed'

export type GetFeedsRequest = Partial<
  PaginationParams<{
    keyword?: string
  }>
>

type GetFeedsResponse = Pagination<Feed>

export const getFeeds = async (params: GetFeedsRequest) => {
  const session = await getNullableTeacherSession()
  const hasSession = !!session
  const endpoint = hasSession ? '/feeds' : '/feeds/public'

  const response = await apiClient.get<GetFeedsResponse>({
    endpoint,
    queryParams: {
      ...params,
      rowCount: 10,
    },
    ...(hasSession
      ? { option: { authorization: `Bearer ${session.accessToken}` } }
      : {}),
  })

  return response
}

export const getBusinessFeeds = async (params: GetFeedsRequest) => {
  const session = await getNullableBusinessSession()
  const hasSession = !!session
  const endpoint = hasSession ? '/feeds' : '/feeds/public'

  const response = await apiClient.get<GetFeedsResponse>({
    endpoint,
    queryParams: {
      ...params,
      rowCount: 10,
    },
    ...(hasSession
      ? { option: { authorization: `Bearer ${session.accessToken}` } }
      : {}),
  })

  return response
}
