import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { isNil } from 'lodash-es'

import { getNullableTeacherSession } from 'entities/auth'
import { feedQueries } from 'entities/feed'
import { userQueries } from 'entities/user'
import { CommunityPage } from 'pages/community'

type SearchParams = {
  search?: string
}

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) => {
  const { search = '' } = await searchParams

  const queryClient = new QueryClient()
  const session = await getNullableTeacherSession()

  const isPublic = isNil(session)

  if (!isPublic) {
    await Promise.all([
      queryClient.prefetchQuery(userQueries.teacherMe()),
      queryClient.prefetchInfiniteQuery(feedQueries.list({ keyword: search })),
    ])
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommunityPage isPublic={isPublic} />
    </HydrationBoundary>
  )
}

export default Page
