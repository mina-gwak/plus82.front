import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { jobPostQueries } from 'entities/job-post'

export const useBusinessJobPosts = (params: {
  fromDueDate?: string
  toDueDate?: string
  closed?: boolean
  isDraft?: boolean
  pageNumber: number
}) => {
  const { data } = useQuery({
    ...jobPostQueries.businessList({
      rowCount: 10,
      ...params,
    }),
    placeholderData: keepPreviousData,
  })

  return {
    jobPosts: data?.content ?? [],
    totalPages: data?.totalPages === 0 ? 1 : data?.totalPages,
  }
}
