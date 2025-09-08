import { useTranslations } from 'next-intl'

import { Modal } from 'shared/ui'

import { ReportUserForm } from './form'

type Props = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  userId: number
}

export const ReportUserModal = ({ isOpen, onOpenChange, userId }: Props) => {
  const t = useTranslations()

  const handleSuccess = () => {
    onOpenChange(false)
  }

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content className="h-[492px] w-[500px] gap-0">
        <Modal.Title className="title-large mb-8 mt-3 h-7 text-center font-bold text-gray-900">
          {t('feed-list.feed-item.report-user-modal.title')}
        </Modal.Title>
        <Modal.Description className="hidden">
          {t('feed-list.feed-item.report-user-modal.description')}
        </Modal.Description>
        <ReportUserForm onSuccess={handleSuccess} userId={userId} />
      </Modal.Content>
    </Modal>
  )
}
