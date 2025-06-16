'use server'

import { getBusinessSession } from 'entities/auth'
import { apiClient } from 'shared/api'
import type { Pagination, PaginationParams } from 'shared/api'

import { BusinessJobPost } from '../model/job-post'

export type GetBusinessJobPostsRequest = PaginationParams<{
  fromDueDate?: string
  toDueDate?: string
  closed?: boolean
  isDraft?: boolean
}>

type GetBusinessJobPostsResponse = Pagination<BusinessJobPost>

export const getBusinessJobPosts = async (
  queryParams: GetBusinessJobPostsRequest,
) => {
  const { accessToken } = await getBusinessSession()

  const response = await apiClient.get<GetBusinessJobPostsResponse>({
    endpoint: '/job-posts/by-academy',
    queryParams,
    option: {
      authorization: `Bearer ${accessToken}`,
      tags: ['business-job-posts'],
    },
  })

  return response
}
