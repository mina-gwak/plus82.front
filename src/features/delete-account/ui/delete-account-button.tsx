'use client'

import { useState } from 'react'

import { Modal } from 'shared/ui'

import { DeleteUserModal } from './delete-account-modal'

export const DeleteUserButton = () => {
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
        Delete Account
      </button>
      <DeleteUserModal />
    </Modal>
  )
}
