'use client'

import { useQueryClient } from '@tanstack/react-query'
import { isNull } from 'lodash-es'
import { useTranslations } from 'next-intl'
import { useActionState, useEffect } from 'react'

import { deleteUserMe } from 'entities/user'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Button, Modal } from 'shared/ui'

type Props = {
  onSucceed: () => void
}

export const DeleteUser = ({ onSucceed }: Props) => {
  const t = useTranslations('my-account')

  const queryClient = useQueryClient()

  const [state, formAction, isPending] = useActionState(deleteUserMe, null)
  const { handleServerError } = useServerErrorHandler()

  useEffect(() => {
    if (isNull(state)) return

    if (isServerError(state)) {
      handleServerError(state)
    } else {
      onSucceed()
    }
  }, [handleServerError, onSucceed, queryClient, state])

  return (
    <Modal.Content className="flex w-[620px] flex-col items-end gap-6">
      <Modal.Title className="title-large mb-5 w-full text-center font-bold text-gray-900">
        {t('delete-account-modal.title')}
      </Modal.Title>
      <div className="mb-10">
        <Modal.Description className="title-small mb-3 text-center text-gray-900">
          {t('delete-account-modal.description1')}
        </Modal.Description>
        <Modal.Description className="title-small text-center text-gray-900">
          {t('delete-account-modal.description2')}
        </Modal.Description>
      </div>
      <div className="flex justify-end gap-2">
        <Modal.Close asChild>
          <Button variant="lined" size="large">
            {t('button.cancel')}
          </Button>
        </Modal.Close>
        <form action={formAction}>
          <Button size="large" disabled={isPending}>
            {t('button.delete')}
          </Button>
        </form>
      </div>
    </Modal.Content>
  )
}
