import { useObserver } from 'shared/lib/observer'

import { Card } from 'entities/job-post'

import { JobPostFilter } from 'features/job-post-filter/model/filter'

import { useJobPosts } from '../api/use-job-posts'
import { transformFiltersToParams } from '../model/transform-filters-to-params'

import { JobListSkeleton } from './job-list-skeleton'

type Props = {
  filters: JobPostFilter | null
}

export const JobPosting = ({ filters }: Props) => {
  const params = transformFiltersToParams(filters)

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useJobPosts({
    pageNumber: 0,
    rowCount: 20,
    orderType: 'DESC',
    sortBy: 'id',
    ...params,
  })

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const targetRef = useObserver({
    callback: handleIntersect,
  })

  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-8">
      {data?.map(post => (
        <li key={post.id}>
          <Card {...post} />
        </li>
      ))}
      {isFetchingNextPage ? <JobListSkeleton /> : <div ref={targetRef} />}
    </ul>
  )
}
