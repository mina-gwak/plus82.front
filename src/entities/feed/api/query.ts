import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'

import { getBusinessFeed, getFeed } from './get-feed'
import { getFeedLike, GetFeedLikeRequest } from './get-feed-like'
import { getBusinessFeeds, getFeeds, GetFeedsRequest } from './get-feeds'

export const feedQueries = {
  all: () => ['feed'],
  lists: () => [...feedQueries.all(), 'list'],
  list: ({ pageNumber, ...params }: GetFeedsRequest) =>
    infiniteQueryOptions({
      queryKey: [...feedQueries.lists(), params],
      queryFn: ({ pageParam = pageNumber }) =>
        getFeeds({ ...params, pageNumber: pageParam }),
      initialPageParam: 0,
      getNextPageParam: lastPage => {
        if (lastPage.last) return undefined

        return lastPage.pageable.pageNumber + 1
      },
    }),
  businessLists: () => [...feedQueries.all(), 'business-list'],
  businessList: ({ pageNumber, ...params }: GetFeedsRequest) =>
    infiniteQueryOptions({
      queryKey: [...feedQueries.businessLists(), params],
      queryFn: ({ pageParam = pageNumber }) =>
        getBusinessFeeds({ ...params, pageNumber: pageParam }),
      initialPageParam: 0,
      getNextPageParam: lastPage => {
        if (lastPage.last) return undefined

        return lastPage.pageable.pageNumber + 1
      },
    }),
  items: () => [...feedQueries.all(), 'item'],
  item: (feedId: number) =>
    queryOptions({
      queryKey: [...feedQueries.items(), feedId],
      queryFn: () => getFeed({ feedId }),
    }),
  businessItems: () => [...feedQueries.all(), 'business-item'],
  businessItem: (feedId: number) =>
    queryOptions({
      queryKey: [...feedQueries.businessItems(), feedId],
      queryFn: () => getBusinessFeed({ feedId }),
    }),
  likes: () => [...feedQueries.all(), 'like'],
  like: (params: GetFeedLikeRequest) =>
    queryOptions({
      queryKey: [...feedQueries.likes(), params],
      queryFn: () => getFeedLike(params),
    }),
}
