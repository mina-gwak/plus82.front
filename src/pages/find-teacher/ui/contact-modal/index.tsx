import { Modal } from 'shared/ui'

import { ContactForm } from '../contact-form'

type Props = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  teacherName: string
  academyName: string
  academyEmail: string
  resumeId: number
}

export const ContactModal = ({
  isOpen,
  onOpenChange,
  teacherName,
  academyName,
  academyEmail,
  resumeId,
}: Props) => {
  const handleSuccess = () => {
    onOpenChange(false)
  }

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content className="h-[856px] w-[900px] gap-0">
        <Modal.Title className="title-large my-2.5 h-7 text-center font-bold text-gray-900">
          선생님한테 메시지 보내기
        </Modal.Title>
        <Modal.Description className="hidden">
          선생님에게 메시지를 보내려면 아래 양식을 작성해주세요.
        </Modal.Description>
        <ContactForm
          defaultValues={{
            interestReason: '',
            appealMessage: '',
            additionalMessage: '',
            contactEmail: academyEmail,
          }}
          teacherName={teacherName}
          academyName={academyName}
          resumeId={resumeId}
          onSuccess={handleSuccess}
          className="px-6"
        />
      </Modal.Content>
    </Modal>
  )
}
