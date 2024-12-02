import { Card } from 'entities/job-post'

import { useJobPosts } from '../api/use-job-posts'

export const ClosingSoon = () => {
  const { data } = useJobPosts({
    pageNumber: 0,
    rowCount: 4,
    orderType: 'ASC',
    sortBy: 'dueDate',
  })

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-8">
      {data?.slice(0, 4).map((post, index) => <Card key={index} {...post} />)}
    </div>
  )
}
