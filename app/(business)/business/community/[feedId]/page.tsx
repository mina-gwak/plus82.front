import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { isNil } from 'lodash-es'

import { getNullableBusinessSession } from 'entities/auth'
import { feedQueries } from 'entities/feed'
import { userQueries } from 'entities/user'
import { CommunityDetailPage } from 'pages/community'

type Params = {
  feedId: string
}

const Page = async ({ params }: { params: Promise<Params> }) => {
  const { feedId } = await params

  const queryClient = new QueryClient()
  const session = await getNullableBusinessSession()

  const isPublic = isNil(session)

  if (!isPublic) {
    await Promise.all([
      queryClient.prefetchQuery(userQueries.businessMe()),
      queryClient.prefetchQuery(feedQueries.businessItem(Number(feedId))),
    ])
  } else {
    await queryClient.prefetchQuery(feedQueries.businessItem(Number(feedId)))
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommunityDetailPage feedId={Number(feedId)} isPublic={isPublic} />
    </HydrationBoundary>
  )
}

export default Page
