import { useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { notificationQueries } from 'entities/notification'
import { EmptyBoundary } from 'shared/api'
import { colors } from 'shared/config'
import { useDropdown } from 'shared/lib'
import { Dropdown, Icon } from 'shared/ui'

import { BusinessNotificationList, NoNotification } from './list'
import { useBusinessNotificationUnreadCount } from '../../api/get-business-notification-unread-count'

export const NotificationButton = () => {
  const pathname = usePathname()

  const queryClient = useQueryClient()

  const { isOpen, toggleIsOpen, close, dropdownRef } = useDropdown()

  const { hasUnreadNotification, refetch } =
    useBusinessNotificationUnreadCount()

  const handleClick = () => {
    toggleIsOpen()
  }

  useEffect(() => {
    if (!isOpen) {
      void queryClient.resetQueries({
        queryKey: notificationQueries.businessList().queryKey,
      })
    }
  }, [isOpen, queryClient])

  useEffect(() => {
    void refetch()
  }, [pathname, refetch])

  return (
    <div
      ref={dropdownRef}
      className="relative flex items-center justify-center"
    >
      <button onClick={handleClick} className="relative">
        <Icon name="Bell" size="large" color={colors.gray[900]} />
        {hasUnreadNotification && (
          <span className="absolute right-0.5 top-0 h-2 w-2 rounded-full border border-white bg-blue-800" />
        )}
      </button>
      {isOpen && (
        <Dropdown
          className="w-[360px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]"
          scrollable
          align="right"
          displayLimit={15}
        >
          <EmptyBoundary trigger={isOpen} fallback={<NoNotification />}>
            <BusinessNotificationList close={close} updateCount={refetch} />
          </EmptyBoundary>
        </Dropdown>
      )}
    </div>
  )
}
