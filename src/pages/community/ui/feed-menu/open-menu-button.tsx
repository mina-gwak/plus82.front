'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useState, MouseEvent } from 'react'
import { usePopper } from 'react-popper'

import { userQueries } from 'entities/user'
import { colors } from 'shared/config'
import { useDropdown } from 'shared/lib'
import { Icon } from 'shared/ui'

import { FeedMenu } from './menu'

type Props = {
  isPublic: boolean
  creatorId: number
  openEditDialog: () => void
  openDeleteDialog: () => void
  openReportPostModal: () => void
  openReportUserModal: () => void
}

export const OpenMenuButton = ({
  isPublic,
  creatorId,
  openEditDialog,
  openDeleteDialog,
  openReportPostModal,
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
        className="flex h-12 w-12 items-center justify-center"
        ref={setTargetElement}
        onClick={handleMenuClick}
      >
        <Icon
          name="Dot"
          size="custom"
          color={colors.gray[700]}
          className="h-8 w-8 rotate-90"
        />
      </button>
      {isOpen && (
        <FeedMenu
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          isUserMe={isUserMe}
          isPublic={isPublic}
          onClick={handleDropdownItemClick}
          openEditDialog={openEditDialog}
          openDeleteDialog={openDeleteDialog}
          openReportPostModal={openReportPostModal}
          openReportUserModal={openReportUserModal}
        />
      )}
    </div>
  )
}
