import { apiClient } from 'shared/api'
import type { Pagination, PaginationParams } from 'shared/api'

import type { Location, JobPost } from '../model/job-post'

export type GetJobPostsRequest = PaginationParams<{
  searchText?: string
  locationTypeList?: Location[]
  forKindergarten?: boolean
  forElementary?: boolean
  forMiddleSchool?: boolean
  forHighSchool?: boolean
  forAdult?: boolean
  orderType?: 'ASC' | 'DESC'
  sortBy?: 'id' | 'dueDate'
  fromDueDate?: string
  toDueDate?: string
}>

type GetJobPostsResponse = Pagination<JobPost>

export const getJobPosts = async (params: GetJobPostsRequest) => {
  const response = await apiClient.get<GetJobPostsResponse>(
    '/job-posts',
    params,
  )

  return response
}
