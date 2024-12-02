import { infiniteQueryOptions } from '@tanstack/react-query'

import { getJobPosts, type GetJobPostsRequest } from './get-job-posts'

export const jobPostQueries = {
  all: () => ['job-post'],
  lists: () => [...jobPostQueries.all(), 'list'],
  list: ({ pageNumber, ...params }: GetJobPostsRequest) =>
    infiniteQueryOptions({
      queryKey: [...jobPostQueries.lists(), params],
      queryFn: ({ pageParam = pageNumber }) =>
        getJobPosts({ ...params, pageNumber: pageParam }),
      initialPageParam: 0,
      getNextPageParam: lastPage => {
        if (lastPage.last) return undefined

        return lastPage.pageable.pageNumber + 1
      },
      getPreviousPageParam: firstPage => {
        if (firstPage.first) return undefined

        return firstPage.pageable.pageNumber - 1
      },
    }),
}
