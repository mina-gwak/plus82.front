'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Modal } from 'shared/ui'

import { DeleteUserModal } from './delete-account-modal'

export const DeleteUserButton = () => {
  const t = useTranslations('my-account')

  const [isOpen, setIsOpen] = useState(false)

  const handleButtonClick = () => {
    setIsOpen(true)
  }

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <button
        className="body-large ml-auto block text-gray-400 transition-all hover:text-gray-500"
        onClick={handleButtonClick}
      >
        {t('button.delete-account')}
      </button>
      <DeleteUserModal />
    </Modal>
  )
}
