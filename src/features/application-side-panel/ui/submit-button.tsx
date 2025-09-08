'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  ApplicationStatus,
  StatusLabel,
} from 'entities/job-post-resume-relation'
import { Button, Modal } from 'shared/ui'

import { FormValues } from '../model/form-values'

type Props = {
  status: {
    prev: ApplicationStatus
    next: ApplicationStatus
  }
  disabled: boolean
  hasToOpenModal: boolean
  onSubmit: (data: FormValues) => void
}

export const SubmitButton = ({ hasToOpenModal, onSubmit, ...props }: Props) => {
  const t = useTranslations()

  const [isOpen, setIsOpen] = useState(false)

  const form = useFormContext<FormValues>()

  const handleSubmitButtonClick = () => {
    if (hasToOpenModal) {
      setIsOpen(true)
    } else {
      form.handleSubmit(onSubmit)()
    }
  }

  const handleConfirmButtonClick = () => {
    form.handleSubmit(onSubmit)()
  }

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="primary"
        fullWidth
        size="large"
        onClick={handleSubmitButtonClick}
        {...props}
      >
        {t('applicant-management-detail.button.save')}
      </Button>
      <Modal.Content className="flex h-[244px] w-[500px] flex-col">
        <Modal.Title className="hidden">
          {t('applicant-management-detail.status-update-modal.title')}
        </Modal.Title>
        <div className="mb-7 w-full text-center">
          <p>
            {t.rich(
              'applicant-management-detail.status-update-modal.description1',
              {
                prev: () => (
                  <>
                    &quot;
                    <mark className="bg-white font-bold">
                      {t(
                        `field.application-status.option.${StatusLabel[props.status.prev]}`,
                      )}
                    </mark>
                    &quot;
                  </>
                ),
                next: () => (
                  <>
                    &quot;
                    <mark className="bg-white font-bold">
                      {t(
                        `field.application-status.option.${StatusLabel[props.status.next]}`,
                      )}
                    </mark>
                    &quot;
                  </>
                ),
              },
            )}
          </p>
          <p>
            {t('applicant-management-detail.status-update-modal.description2')}
          </p>
          <p>
            {t('applicant-management-detail.status-update-modal.description3')}
          </p>
        </div>
        <div className="flex w-full gap-2">
          <Modal.Close asChild>
            <Button variant="lined" size="large" fullWidth>
              {t('applicant-management-detail.button.cancel')}
            </Button>
          </Modal.Close>
          <Modal.Close asChild>
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handleConfirmButtonClick}
            >
              {t('applicant-management-detail.button.save')}
            </Button>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  )
}
