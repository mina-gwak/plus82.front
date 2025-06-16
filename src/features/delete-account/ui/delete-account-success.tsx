'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { teacherSignOut } from 'entities/auth'
import { Button, Modal } from 'shared/ui'

export const DeleteUserSuccess = () => {
  const t = useTranslations('my-account')

  const queryClient = useQueryClient()
  const router = useRouter()

  const handleCloseButtonClick = async () => {
    queryClient.removeQueries()

    await signOut({ redirect: false })
    await teacherSignOut()

    router.push('/')
  }

  return (
    <Modal.Content
      className="flex w-[620px] flex-col items-end gap-6"
      onClose={handleCloseButtonClick}
    >
      <Modal.Title className="title-large mb-5 w-full text-center font-bold text-gray-900">
        {t('success.delete-account.title')}
      </Modal.Title>
      <Modal.Description className="title-small mb-10 w-full text-center text-gray-900">
        {t('success.delete-account.description')}
      </Modal.Description>
      <div className="flex justify-end gap-2">
        <Modal.Close asChild onClick={handleCloseButtonClick}>
          <Button size="large">{t('button.close')}</Button>
        </Modal.Close>
      </div>
    </Modal.Content>
  )
}
