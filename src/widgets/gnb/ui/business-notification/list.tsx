import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { cn } from 'shared/lib'
import { Dropdown } from 'shared/ui'

import { useBusinessNotifications } from '../../api/get-business-notifications'
import { formatNotificationDate } from '../../lib/format-date'

type Props = {
  close: () => void
  updateCount: () => void
}

export const BusinessNotificationList = ({ close, updateCount }: Props) => {
  const router = useRouter()

  const { data, isLoading, hasNextPage, fetchNextPage } =
    useBusinessNotifications()

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
                {notification.title}
              </p>
              <p className="body-large font-normal text-gray-900">
                {notification.content}
              </p>
            </div>
            <p className="body-small font-normal text-gray-500">
              {formatNotificationDate(notification.createdAt, 'ko')}
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
                더 보기
              </button>
            </Dropdown.Item>
          )
        }

        return (
          <Dropdown.Item className="cursor-default p-0 hover:bg-white">
            <p className="body-medium flex h-20 w-full items-center justify-center font-normal text-gray-500">
              최근 90일간 받은 알림을 모두 표시했어요
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
        아직 새로운 알림이 없어요
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
