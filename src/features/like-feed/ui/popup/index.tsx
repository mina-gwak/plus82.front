import { useLocale, useTranslations } from 'next-intl'

import { linkVariants, Modal, AnimatedCount } from 'shared/ui'

import { LikedPeopleList } from './list'

type Props = {
  feedId: number
  likeCount: number
}

export const LikedPeopleButton = ({ feedId, likeCount }: Props) => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <Modal>
      <Modal.Trigger asChild>
        <button className={linkVariants({ variant: 'secondary' })}>
          {(() => {
            if (locale === 'ko') {
              return (
                <>
                  좋아요 <AnimatedCount count={likeCount} />
                </>
              )
            }

            return (
              <>
                <AnimatedCount count={likeCount} /> Likes
              </>
            )
          })()}
        </button>
      </Modal.Trigger>
      <Modal.Content className="flex h-[540px] w-[500px] flex-col gap-0">
        <Modal.Title className="title-large mb-2 text-center font-bold text-gray-900">
          {t('feed-list.feed-item.liked-people-modal.title')}
        </Modal.Title>
        <LikedPeopleList feedId={feedId} />
      </Modal.Content>
    </Modal>
  )
}
