'use client'

import { useForm } from 'react-hook-form'

import { contactRepresentativeResume } from 'entities/resume'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Form } from 'shared/form'
import { cn } from 'shared/lib'
import { Button, Label, Modal } from 'shared/ui'

import { email } from '../model/rules'

type FormValues = {
  interestReason: string
  appealMessage: string
  additionalMessage: string
  contactEmail: string
}

const defaultValues: FormValues = {
  interestReason: '',
  appealMessage: '',
  additionalMessage: '',
  contactEmail: '',
}

type Props = {
  teacherName: string
  academyName: string
  defaultValues?: FormValues
  resumeId: number
  onSuccess?: () => void
  readOnly?: boolean
  className?: string
}

export const ContactForm = ({
  teacherName,
  academyName,
  resumeId,
  defaultValues: defaultValuesProp,
  onSuccess,
  readOnly,
  className,
}: Props) => {
  const form = useForm<FormValues>({
    defaultValues: defaultValuesProp ?? defaultValues,
  })

  const { handleServerError } = useServerErrorHandler()

  const handleSubmit = form.handleSubmit(async data => {
    const response = await contactRepresentativeResume({
      resumeId: resumeId,
      ...data,
    })

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      onSuccess?.()
    }
  })

  return (
    <Form {...form} className={cn('flex w-full flex-grow flex-col', className)}>
      <p className="title-small mb-4 font-medium text-gray-900">
        Hello {teacherName},<br />
        {academyName} has reviewed your resume and would like to get in touch
        with you.
      </p>
      <div className="mb-4 flex flex-col space-y-1.5">
        <Label>
          Reason for interest :
          <br />
          {teacherName}님께 관심이 생긴 이유
        </Label>
        <Form.Control name="interestReason" readOnly={readOnly}>
          <Form.TextArea
            placeholder="이유를 작성해 주세요"
            className="h-[108px] py-3"
            maxLength={1000}
          />
        </Form.Control>
      </div>
      <div className="mb-4 flex flex-col space-y-1.5">
        <Label>
          Why you might be interested :
          <br />
          {teacherName}님이 우리 학원에 관심을 가질 만한 이유
        </Label>
        <Form.Control name="appealMessage" readOnly={readOnly}>
          <Form.TextArea
            placeholder="이유를 작성해 주세요"
            className="h-[108px] py-3"
            maxLength={1000}
          />
        </Form.Control>
      </div>
      <div className="mb-4 flex flex-col space-y-1.5">
        <Label>
          Additional message :
          <br />
          {teacherName}님께 추가로 하고 싶은 말
        </Label>
        <Form.Control name="additionalMessage" readOnly={readOnly}>
          <Form.TextArea
            placeholder="하고 싶은 말을 작성해 주세요"
            className="h-[108px] py-3"
            maxLength={1000}
          />
        </Form.Control>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label>연락 가능한 이메일</Label>
        <Form.Control name="contactEmail" readOnly={readOnly} rules={email}>
          <Form.TextField placeholder="이메일을 입력해 주세요" fullWidth />
        </Form.Control>
      </div>
      {!readOnly && (
        <Modal.Footer className="py-8">
          <Button size="large" onClick={handleSubmit}>
            보내기
          </Button>
        </Modal.Footer>
      )}
    </Form>
  )
}
