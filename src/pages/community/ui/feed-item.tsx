'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { Feed } from 'entities/feed'
import { userQueries } from 'entities/user'
import { FeedFormDialog } from 'features/feed-form'
import { LikeButton, LikedPeopleButton } from 'features/like-feed'
import { colors } from 'shared/config'
import { Image, Icon, linkVariants, AnimatedCount } from 'shared/ui'

import { Comment } from './comment'
import { DeleteFeedModal } from './delete-feed-modal'
import { ExpandableText } from './expandable-text'
import { OpenMenuButton } from './feed-menu/open-menu-button'
import { ReportPostModal } from './report-post-modal'
import { ReportUserModal } from './report-user-modal'
import { copy } from '../lib/copy'
import { formatDateFromNow } from '../lib/date'

type Props = Feed & {
  isPublic: boolean
}

export const FeedItem = ({
  id,
  content,
  createdAt,
  creatorId,
  creatorName,
  creatorProfileImagePath,
  imagePath,
  commentCount,
  likeCount,
  isLiked,
  isPublic,
}: Props) => {
  const t = useTranslations()
  const locale = useLocale()

  const pathname = usePathname()
  const isBusiness = pathname?.includes('business')

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isReportPostModalOpen, setIsReportPostModalOpen] = useState(false)
  const [isReportUserModalOpen, setIsReportUserModalOpen] = useState(false)

  const [isCommentOpen, setIsCommentOpen] = useState(false)

  const { data: userMe } = useQuery({
    ...(isBusiness ? userQueries.businessMe() : userQueries.teacherMe()),
    enabled: !isPublic,
  })

  const isMyPost = userMe?.id === creatorId

  const openEditDialog = () => {
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true)
  }

  const openReportPostModal = () => {
    setIsReportPostModalOpen(true)
  }

  const openReportUserModal = () => {
    setIsReportUserModalOpen(true)
  }

  const toggleComment = () => {
    setIsCommentOpen(!isCommentOpen)
  }

  const handleShareButtonClick = async () => {
    const shareUrl = `${window.location.origin}/${isBusiness ? 'business/' : ''}community/${id}`

    const { success } = await copy(shareUrl)

    if (success) {
      toast.success(t('feed-list.feed-menu.link-copied'))
    }
  }

  return (
    <>
      <div className="pb-10 not-last:border-b not-last:border-gray-200 not-first:pt-10">
        <div className="mb-3 flex items-center gap-3">
          <Image
            src={creatorProfileImagePath ?? ''}
            alt={`${creatorName} profile image`}
            className="h-12 w-12 rounded-full"
            fallback={
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                <Icon
                  name="User"
                  size="custom"
                  className="h-10 w-10"
                  color={colors.gray[700]}
                />
              </div>
            }
          />
          <div className="grow">
            <p className="title-small font-medium text-gray-900">
              {creatorName} {isMyPost && t('feed-list.feed-item.me')}
            </p>
            <p className="body-large font-normal text-gray-500">
              {formatDateFromNow(createdAt, locale)}
            </p>
          </div>
          <OpenMenuButton
            isPublic={isPublic}
            creatorId={creatorId}
            openEditDialog={openEditDialog}
            openDeleteDialog={openDeleteDialog}
            openReportPostModal={openReportPostModal}
            openReportUserModal={openReportUserModal}
          />
        </div>

        <div className="mb-3 space-y-3">
          {imagePath && (
            <div className="h-[500px] w-full rounded-xl">
              <Image
                src={imagePath ?? ''}
                alt="community"
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          )}
          <div>
            <ExpandableText lineClamp={10} content={content} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <LikeButton feedId={id} isLiked={isLiked} isPublic={isPublic} />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              onClick={toggleComment}
            >
              <Icon
                name="Comment"
                size="custom"
                color={colors.gray[700]}
                className="h-6 w-6"
              />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              onClick={handleShareButtonClick}
            >
              <Icon
                name="Share"
                size="custom"
                color={colors.gray[700]}
                className="h-6 w-6"
              />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <LikedPeopleButton feedId={id} likeCount={likeCount} />
            <span className="h-[3px] w-[3px] rounded-full bg-gray-500" />
            <button
              className={linkVariants({ variant: 'secondary' })}
              onClick={toggleComment}
            >
              {(() => {
                if (locale === 'ko') {
                  return (
                    <>
                      댓글 <AnimatedCount count={commentCount} />
                    </>
                  )
                }

                return (
                  <>
                    <AnimatedCount count={commentCount} /> Comments
                  </>
                )
              })()}
            </button>
          </div>
        </div>
        {isCommentOpen && (
          <Comment
            feedId={id}
            commentCount={commentCount}
            isPublic={isPublic}
          />
        )}
      </div>

      <FeedFormDialog
        feedId={id}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        isPublic={isPublic}
      />

      <DeleteFeedModal
        feedId={id}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />

      <ReportPostModal
        feedId={id}
        isOpen={isReportPostModalOpen}
        onOpenChange={setIsReportPostModalOpen}
      />

      <ReportUserModal
        userId={21}
        isOpen={isReportUserModalOpen}
        onOpenChange={setIsReportUserModalOpen}
      />
    </>
  )
}
