'use client'

import { useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { resumeQueries } from 'entities/resume'
import { Button, Modal } from 'shared/ui'

import { ApplyForm } from './apply-form'

export const ApplyToJobButton = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()

  const { status } = useSession()

  const [isOpen, setIsOpen] = useState(false)

  const notAuthenticated = status !== 'authenticated'

  const handleButtonClick = async () => {
    if (pathname?.includes('preview')) {
      return
    }

    if (notAuthenticated) {
      router.push('/sign-in')

      return
    }

    try {
      if (!queryClient.getQueryData(resumeQueries.list().queryKey)) {
        await queryClient.fetchQuery(resumeQueries.list())
      }
      setIsOpen(true)
    } catch (error) {
      // TODO : Error Handling
      toast.error(
        (error as Error)?.message ?? 'Error occurred while applying to job',
      )
      router.push('/sign-in')
    }
  }

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <Button type="button" onClick={handleButtonClick} size="large">
        Apply Now
      </Button>
      <Modal.Content className="flex w-[728px] flex-col items-end gap-6">
        <ApplyForm />
      </Modal.Content>
    </Modal>
  )
}
