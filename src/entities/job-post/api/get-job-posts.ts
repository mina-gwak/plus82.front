import { apiClient } from 'shared/api'
import type { Pagination, PaginationParams } from 'shared/api'

import { Location } from '../config/location'
import { JobPost } from '../model/job-post'

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
  closed?: boolean
}>

type GetJobPostsResponse = Pagination<JobPost>

export const getJobPosts = async (queryParams: GetJobPostsRequest) => {
  const response = await apiClient.get<GetJobPostsResponse>({
    endpoint: '/job-posts',
    queryParams,
  })

  return response
}
