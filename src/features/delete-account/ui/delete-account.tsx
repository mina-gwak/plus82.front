'use client'

import { useQueryClient } from '@tanstack/react-query'
import { isNull } from 'lodash-es'
import { useActionState, useEffect } from 'react'

import { isServerError, useServerErrorHandler } from 'shared/api'
import { Button, Modal } from 'shared/ui'

import { deleteUserMe } from 'entities/user'

type Props = {
  onSucceed: () => void
}

export const DeleteUser = ({ onSucceed }: Props) => {
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
        Delete Account
      </Modal.Title>
      <div className="mb-10">
        <Modal.Description className="title-small mb-3 text-center text-gray-900">
          If you cancel your membership, all the resumes you have created, your
          application history and any offers received will be permanently lost.
        </Modal.Description>
        <Modal.Description className="title-small text-center text-gray-900">
          Do you still want to proceed with the cancellation?
        </Modal.Description>
      </div>
      <div className="flex justify-end gap-2">
        <Modal.Close asChild>
          <Button variant="lined" size="large">
            Cancel
          </Button>
        </Modal.Close>
        <form action={formAction}>
          <Button size="large" disabled={isPending}>
            Delete
          </Button>
        </form>
      </div>
    </Modal.Content>
  )
}
