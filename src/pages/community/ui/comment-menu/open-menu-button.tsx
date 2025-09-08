'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useState, MouseEvent } from 'react'
import { usePopper } from 'react-popper'

import { userQueries } from 'entities/user'
import { colors } from 'shared/config'
import { useDropdown } from 'shared/lib'
import { Icon } from 'shared/ui'

import { CommentMenu } from './menu'

type Props = {
  isPublic: boolean
  creatorId: number
  openEditForm: () => void
  openDeleteDialog: () => void
  openReportCommentModal: () => void
  openReportUserModal: () => void
}

export const OpenMenuButton = ({
  isPublic,
  creatorId,
  openEditForm,
  openDeleteDialog,
  openReportCommentModal,
  openReportUserModal,
}: Props) => {
  const pathname = usePathname()
  const isBusiness = pathname?.includes('business')

  const { data: userMe } = useQuery({
    ...(isBusiness ? userQueries.businessMe() : userQueries.teacherMe()),
    enabled: !isPublic,
  })

  const [targetElement, setTargetElement] = useState<HTMLButtonElement | null>(
    null,
  )
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  )
  const { styles, attributes } = usePopper(targetElement, popperElement, {
    placement: 'bottom-start',
  })

  const { isOpen, toggleIsOpen, dropdownRef } = useDropdown()

  const isUserMe = userMe?.id === creatorId

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    toggleIsOpen()
  }

  const handleDropdownItemClick = () => {
    toggleIsOpen()
  }

  return (
    <div ref={dropdownRef}>
      <button
        className="flex h-8 w-8 items-center justify-center"
        ref={setTargetElement}
        onClick={handleMenuClick}
      >
        <Icon
          name="Dot"
          size="custom"
          color={colors.gray[700]}
          className="h-5 w-5 rotate-90"
        />
      </button>
      {isOpen && (
        <CommentMenu
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          isUserMe={isUserMe}
          isPublic={isPublic}
          onClick={handleDropdownItemClick}
          openEditForm={openEditForm}
          openDeleteDialog={openDeleteDialog}
          openReportCommentModal={openReportCommentModal}
          openReportUserModal={openReportUserModal}
        />
      )}
    </div>
  )
}
