'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'

import { feedQueries } from 'entities/feed'
import { Layout } from 'shared/ui'

import { FeedItem } from './feed-item'

type Props = {
  feedId: number
  isPublic: boolean
}

export const CommunityDetailPage = ({ feedId, isPublic }: Props) => {
  const pathname = usePathname()
  const isBusiness = pathname?.includes('business')

  const { data: feed } = useQuery(
    isBusiness ? feedQueries.businessItem(feedId) : feedQueries.item(feedId),
  )

  if (!feed) {
    throw new Error('Feed not found')
  }

  return (
    <Layout wide className="w-[530px] min-w-[530px]">
      <FeedItem
        {...feed}
        isPublic={isPublic}
        imagePath={feed.image?.path || null}
      />
    </Layout>
  )
}
