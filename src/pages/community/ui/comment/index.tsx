import { useQuery, useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import {
  addBusinessFeedComment,
  addFeedComment,
  feedQueries,
} from 'entities/feed'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Spinner } from 'shared/ui'

import { CommentForm } from './comment-form'
import { CommentList } from './list'

type Props = {
  feedId: number
  commentCount: number
  isPublic: boolean
}

export const Comment = ({ feedId, commentCount, isPublic }: Props) => {
  const t = useTranslations()

  const queryClient = useQueryClient()
  const pathname = usePathname()
  const isBusiness = pathname?.includes('business')

  const { handleServerError } = useServerErrorHandler()

  const { data: comments, isLoading } = useQuery({
    ...(isBusiness
      ? feedQueries.businessItem(feedId)
      : feedQueries.item(feedId)),
    select: data => data?.comments,
  })

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: isBusiness
        ? feedQueries.businessItem(feedId).queryKey
        : feedQueries.item(feedId).queryKey,
    })
    queryClient.invalidateQueries({
      queryKey: isBusiness ? feedQueries.businessLists() : feedQueries.lists(),
    })
  }

  const addComment = async (comment: string) => {
    const response = await (isBusiness
      ? addBusinessFeedComment({ feedId, comment })
      : addFeedComment({ feedId, comment }))

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleSuccess()
    }
  }

  return (
    <div className="mt-5">
      {isPublic ? (
        <p className="body-large rounded-lg bg-gray-100 p-3 font-medium text-gray-500">
          {t('feed-list.feed-item.comment.sign-in')}
        </p>
      ) : (
        <CommentForm onSubmit={addComment} />
      )}
      {isLoading && commentCount > 0 ? (
        <div className="relative mt-10 flex justify-center">
          <Spinner size="medium" />
        </div>
      ) : (
        comments && (
          <CommentList
            feedId={feedId}
            comments={comments}
            isPublic={isPublic}
          />
        )
      )}
    </div>
  )
}
