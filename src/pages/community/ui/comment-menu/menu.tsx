import { useTranslations } from 'next-intl'
import { ComponentProps } from 'react'
import { toast } from 'react-toastify'

import { cn } from 'shared/lib'
import { Dropdown } from 'shared/ui'

import { EditButton } from './edit-button'

type Props = ComponentProps<typeof Dropdown> & {
  isUserMe: boolean
  isPublic: boolean
  onClick: () => void
  openEditForm: () => void
  openDeleteDialog: () => void
  openReportCommentModal: () => void
  openReportUserModal: () => void
}

export const CommentMenu = ({
  isUserMe,
  isPublic,
  onClick,
  openEditForm,
  openDeleteDialog,
  openReportCommentModal,
  openReportUserModal,
  className,
  ...props
}: Props) => {
  const t = useTranslations()

  const checkPublicUser = () => {
    if (isPublic) {
      toast.error(t('feed-list.feed-menu.error.public'))
    }

    return isPublic
  }

  const handleEditButtonClick = () => {
    if (checkPublicUser()) {
      return
    }

    openEditForm()
    onClick()
  }

  const handleDeleteButtonClick = () => {
    if (checkPublicUser()) {
      return
    }

    openDeleteDialog()
    onClick()
  }

  const handleReportCommentButtonClick = () => {
    if (checkPublicUser()) {
      return
    }

    openReportCommentModal()
    onClick()
  }

  const handleReportUserButtonClick = () => {
    if (checkPublicUser()) {
      return
    }

    openReportUserModal()
    onClick()
  }

  if (!isUserMe) {
    return (
      <Dropdown {...props} className={cn('w-[144px]', className)}>
        <Dropdown.Item className="p-0">
          <button
            type="button"
            className="body-large w-full px-3 py-3.5 text-left font-medium text-error"
            onClick={handleReportCommentButtonClick}
          >
            {t('feed-list.feed-menu.button.report-comment')}
          </button>
        </Dropdown.Item>
        <Dropdown.Item className="p-0">
          <button
            type="button"
            className="body-large w-full px-3 py-3.5 text-left font-medium text-error"
            onClick={handleReportUserButtonClick}
          >
            {t('feed-list.feed-menu.button.report-user')}
          </button>
        </Dropdown.Item>
      </Dropdown>
    )
  }

  return (
    <Dropdown {...props} className={cn('w-[144px]', className)}>
      <Dropdown.Item className="p-0">
        <EditButton onClick={handleEditButtonClick} />
      </Dropdown.Item>
      <Dropdown.Item className="p-0">
        <button
          type="button"
          className="body-large w-full px-3 py-3.5 text-left font-medium text-error"
          onClick={handleDeleteButtonClick}
        >
          {t('feed-list.feed-menu.button.delete')}
        </button>
      </Dropdown.Item>
    </Dropdown>
  )
}
