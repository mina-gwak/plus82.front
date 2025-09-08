import { useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'

import {
  deleteBusinessComment,
  deleteComment,
  feedQueries,
} from 'entities/feed'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Button, Modal } from 'shared/ui'

type Props = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  feedId: number
  commentId: number
}

export const DeleteCommentModal = ({
  isOpen,
  onOpenChange,
  feedId,
  commentId,
}: Props) => {
  const t = useTranslations()
  const pathname = usePathname()
  const isBusiness = pathname?.includes('business')

  const queryClient = useQueryClient()
  const { handleServerError } = useServerErrorHandler()

  const handleSuccess = () => {
    onOpenChange(false)
    toast.success(t('feed-list.feed-item.delete-comment-modal.success'))
    queryClient.invalidateQueries({
      queryKey: isBusiness
        ? feedQueries.businessItem(feedId).queryKey
        : feedQueries.item(feedId).queryKey,
    })
    queryClient.invalidateQueries({
      queryKey: isBusiness ? feedQueries.businessLists() : feedQueries.lists(),
    })
  }

  const handleDeleteButtonClick = async () => {
    const response = await (isBusiness
      ? deleteBusinessComment(feedId, commentId)
      : deleteComment(feedId, commentId))

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleSuccess()
    }
  }

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content className="h-[256px] w-[500px] gap-0">
        <Modal.Title className="title-large mb-2 mt-3 h-7 text-center font-bold text-gray-900">
          {t('feed-list.feed-item.delete-comment-modal.title')}
        </Modal.Title>
        <Modal.Description className="title-small mb-10 whitespace-break-spaces text-center font-medium text-gray-900">
          {t('feed-list.feed-item.delete-comment-modal.description')}
        </Modal.Description>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button variant="lined" size="large" className="w-[93px]">
              {t('feed-list.feed-item.delete-comment-modal.button.cancel')}
            </Button>
          </Modal.Close>
          <Button
            variant="primary"
            size="large"
            className="w-[93px]"
            onClick={handleDeleteButtonClick}
          >
            {t('feed-list.feed-item.delete-comment-modal.button.delete')}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
