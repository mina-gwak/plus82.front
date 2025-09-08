import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { feedQueries } from 'entities/feed'
import { colors } from 'shared/config'
import { Icon, Image, Spinner } from 'shared/ui'

type Props = {
  feedId: number
}

export const LikedPeopleList = ({ feedId }: Props) => {
  const t = useTranslations()

  const { data, isLoading } = useQuery({
    ...feedQueries.like({ feedId }),
  })

  if (isLoading) {
    return <Spinner />
  }

  if (!data || data.length === 0) {
    return (
      <div className="title-small flex h-[50px] items-center justify-center font-normal text-gray-500">
        {t('feed-list.feed-item.liked-people-modal.empty')}
      </div>
    )
  }

  return (
    <ul className="flex-grow space-y-4 overflow-scroll">
      {data.map(({ id, name, profileImagePath }) => (
        <li key={id} className="flex items-center gap-3">
          <Image
            src={profileImagePath || ''}
            alt={name}
            className="h-[40px] w-[40px] rounded-full"
            fallback={
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-300">
                <Icon
                  name="User"
                  size="custom"
                  className="h-[30px] w-[30px]"
                  color={colors.gray[700]}
                />
              </div>
            }
          />
          <p className="title-small font-medium text-gray-900">{name}</p>
        </li>
      ))}
    </ul>
  )
}
