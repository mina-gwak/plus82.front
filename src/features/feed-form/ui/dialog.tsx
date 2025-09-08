'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'

import { userQueries } from 'entities/user'
import { colors } from 'shared/config'
import { Icon, Image, Modal } from 'shared/ui'

import { FeedForm } from './form'

type Props = {
  feedId?: number
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  isPublic: boolean
}

export const FeedFormDialog = ({
  feedId,
  isOpen,
  onOpenChange,
  isPublic,
}: Props) => {
  const pathname = usePathname()
  const isBusiness = pathname?.includes('business')

  const { data: userMe } = useQuery({
    ...(isBusiness ? userQueries.businessMe() : userQueries.teacherMe()),
    enabled: !isPublic,
  })

  const userName = isBusiness
    ? `${userMe?.fullName}`
    : `${userMe?.firstName} ${userMe?.lastName}`

  const handleSuccess = () => {
    onOpenChange(false)
  }

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange} modal>
      <Modal.Content className="flex h-[704px] w-[740px] flex-col gap-0">
        <Modal.Title className="hidden">Write a post</Modal.Title>
        <div className="mb-4 flex items-start gap-3">
          <Image
            src={userMe?.profileImagePath ?? ''}
            alt={`${userName} profile image`}
            className="h-14 w-14 rounded-full"
            fallback={
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-300">
                <Icon
                  name="User"
                  size="custom"
                  className="h-12 w-12"
                  color={colors.gray[700]}
                />
              </div>
            }
          />
          <p className="title-small font-medium text-gray-900">{userName}</p>
        </div>
        <FeedForm feedId={feedId} onSuccess={handleSuccess} />
      </Modal.Content>
    </Modal>
  )
}
