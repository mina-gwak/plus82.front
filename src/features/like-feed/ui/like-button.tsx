'use client'

import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { usePathname, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ComponentProps, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  Feed,
  feedQueries,
  likeBusinessFeed,
  likeFeed,
  unlikeBusinessFeed,
  unlikeFeed,
} from 'entities/feed'
import { isServerError, Pagination, useServerErrorHandler } from 'shared/api'
import { colors } from 'shared/config'
import { Icon } from 'shared/ui'

type Props = {
  feedId: number
  isLiked: boolean
  isPublic: boolean
}

const FILLED_HEART_COLOR = '#F44336'

export const LikeButton = ({
  feedId,
  isLiked: isLikedProp = false,
  isPublic,
}: Props) => {
  const t = useTranslations()

  const pathname = usePathname()
  const isBusiness = pathname?.includes('business')

  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const keyword = searchParams?.get('keyword')

  const [isLiked, setIsLiked] = useState(isLikedProp)

  const { handleServerError } = useServerErrorHandler()

  const handleSuccess = () => {
    queryClient.setQueryData(
      isBusiness
        ? feedQueries.businessList({ keyword: keyword ?? '' }).queryKey
        : feedQueries.list({ keyword: keyword ?? '' }).queryKey,
      (old: InfiniteData<Pagination<Feed>> | undefined) => {
        if (!old) return old

        const updatedPages = old.pages.map(page => {
          const feed = page.content.find(feed => feed.id === feedId)

          if (!feed) return page

          return {
            ...page,
            content: page.content.map(feed => {
              if (feed.id === feedId) {
                return {
                  ...feed,
                  likeCount: feed.likeCount + (isLiked ? -1 : 1),
                  isLiked: !feed.isLiked,
                }
              }

              return feed
            }),
          }
        })

        return {
          ...old,
          pages: updatedPages,
        }
      },
    )
  }

  const handleClick = async () => {
    if (isPublic) {
      toast.error(t('feed-list.feed-menu.error.public'))

      return
    }

    const prevLiked = isLiked
    setIsLiked(!isLiked)

    let response

    if (isLiked) {
      response = await (isBusiness
        ? unlikeBusinessFeed(feedId)
        : unlikeFeed(feedId))
    } else {
      response = await (isBusiness
        ? likeBusinessFeed(feedId)
        : likeFeed(feedId))
    }

    if (isServerError(response)) {
      setIsLiked(prevLiked)
      handleServerError(response)
    } else {
      handleSuccess()
    }
  }

  useEffect(() => {
    setIsLiked(isLikedProp)
  }, [isLikedProp])

  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
      onClick={handleClick}
    >
      <Icon
        name={isLiked ? 'HeartFilled' : 'Heart'}
        size="custom"
        color={
          isLiked
            ? (FILLED_HEART_COLOR as keyof ComponentProps<typeof Icon>['color'])
            : colors.gray[700]
        }
        className="h-6 w-6"
      />
    </button>
  )
}
