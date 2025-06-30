import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { cn } from 'shared/lib'
import { Dropdown } from 'shared/ui'

import { useTeacherNotifications } from '../../api/get-teacher-notifications'
import { formatNotificationDate } from '../../lib/format-date'

type Props = {
  close: () => void
  updateCount: () => void
}

export const TeacherNotificationList = ({ close, updateCount }: Props) => {
  const router = useRouter()

  const { data, isLoading, hasNextPage, fetchNextPage } =
    useTeacherNotifications()

  useEffect(() => {
    if (!isLoading) {
      void updateCount()
    }
  }, [isLoading, updateCount])

  if (isLoading) {
    return <NotificationSkeleton />
  }

  const isLastItem = (index: number) => {
    if (!data) return false

    return index === data.length - 1
  }

  return (
    <>
      {data?.map((notification, index) => (
        <Dropdown.Item
          key={notification.id}
          className={cn('p-0', {
            '!border-b-0': isLastItem(index),
          })}
          onClick={() => {
            if (notification.targetUrl) {
              router.push(notification.targetUrl)
              close()
            }
          }}
        >
          <div className="space-y-4 px-8 py-5">
            <div className="space-y-1">
              <p className="body-medium font-bold text-gray-900">
                {notification.titleEn}
              </p>
              <p className="body-large font-normal text-gray-900">
                {notification.contentEn}
              </p>
            </div>
            <p className="body-small font-normal text-gray-500">
              {formatNotificationDate(notification.createdAt, 'en')}
            </p>
          </div>
        </Dropdown.Item>
      ))}
      {(() => {
        if (hasNextPage) {
          return (
            <Dropdown.Item className="p-0">
              <button
                className="title-small h-[52px] w-full border-t border-gray-300 font-medium text-blue-800"
                onClick={() => fetchNextPage()}
              >
                See more
              </button>
            </Dropdown.Item>
          )
        }

        return (
          <Dropdown.Item className="cursor-default p-0 hover:bg-white">
            <p className="body-medium flex h-20 w-full items-center justify-center text-center font-normal text-gray-500">
              All notifications received
              <br />
              in the past 90 days have been displayed
            </p>
          </Dropdown.Item>
        )
      })()}
    </>
  )
}

export const NoNotification = () => {
  return (
    <Dropdown.Item className="p-0">
      <p className="body-medium flex h-20 w-full items-center justify-center font-normal text-gray-500">
        You have no new notifications yet
      </p>
    </Dropdown.Item>
  )
}

export const NotificationSkeleton = () => {
  return (
    <Dropdown.Item className="p-0">
      <div className="space-y-4 px-8 py-5">
        <div className="space-y-1">
          <div className="h-[18px] w-[50px] animate-pulse rounded-sm bg-gray-100" />
          <div className="h-[20px] w-[250px] animate-pulse rounded-sm bg-gray-100" />
        </div>
        <div className="h-[16px] w-[30px] animate-pulse rounded-sm bg-gray-100" />
      </div>
    </Dropdown.Item>
  )
}
