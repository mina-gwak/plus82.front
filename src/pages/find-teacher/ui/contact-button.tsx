'use client'

import { useState } from 'react'

import { Button } from 'shared/ui'

import { ContactModal } from './contact-modal'

type Props = {
  teacherName: string
  academyName: string
  academyEmail: string
  resumeId: number
}

export const ContactButton = ({
  teacherName,
  academyName,
  academyEmail,
  resumeId,
}: Props) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const openContactModal = () => {
    setIsContactModalOpen(true)
  }

  return (
    <div className="mt-8 flex justify-end">
      <Button size="large" onClick={openContactModal}>
        연락하기
      </Button>
      <ContactModal
        isOpen={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        teacherName={teacherName}
        academyName={academyName}
        academyEmail={academyEmail}
        resumeId={resumeId}
      />
    </div>
  )
}
