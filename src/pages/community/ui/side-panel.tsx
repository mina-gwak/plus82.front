'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { userQueries } from 'entities/user'
import { FeedFormDialog } from 'features/feed-form'
import { colors } from 'shared/config'
import { Button, Icon, Image } from 'shared/ui'

type Props = {
  isPublic: boolean
}

export const SidePanel = ({ isPublic }: Props) => {
  const t = useTranslations('feed-list.side-panel')
  const pathname = usePathname()
  const isBusiness = pathname?.includes('business')

  const { data: userMe } = useQuery({
    ...(isBusiness ? userQueries.businessMe() : userQueries.teacherMe()),
    enabled: !isPublic,
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleWritePostButtonClick = () => {
    setIsDialogOpen(true)
  }

  const userName = isBusiness
    ? `${userMe?.fullName}`
    : `${userMe?.firstName} ${userMe?.lastName}`

  if (isPublic) {
    return (
      <div className="sticky top-10 h-fit w-[270px] shrink-0 space-y-4 rounded-xl border border-gray-300 p-5">
        <p className="body-large whitespace-break-spaces text-center font-medium text-gray-900">
          {t('sign-in')}
        </p>
        <div className="space-y-2">
          <Button
            variant="primary"
            size="large"
            fullWidth
            as="a"
            href={isBusiness ? '/business/sign-in' : '/sign-in'}
          >
            {t('button.sign-in')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="sticky top-10 h-fit w-[270px] shrink-0 space-y-3 rounded-xl border border-gray-300 p-5">
      <div className="flex items-start gap-3">
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
      <Button
        variant="tonal"
        size="large"
        fullWidth
        onClick={handleWritePostButtonClick}
      >
        {t('button.write-post')}
      </Button>
      <FeedFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        isPublic={isPublic}
      />
    </div>
  )
}
