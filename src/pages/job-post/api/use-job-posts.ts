import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { useEmptyBoundary } from 'shared/api'

import { GetJobPostsRequest, jobPostQueries } from 'entities/job-post'

export const useJobPosts = (params: GetJobPostsRequest) => {
  const result = useSuspenseInfiniteQuery({
    ...jobPostQueries.list(params),
    select: data => data?.pages.flatMap(page => page.content),
  })

  useEmptyBoundary(result.data)

  return result
}
