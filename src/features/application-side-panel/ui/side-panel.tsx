'use client'

import { useParams } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  ApplicationStatus,
  ApplicationStatusSelect,
  updateJobPostResumeMemo,
  updateJobPostResumeStatus,
} from 'entities/job-post-resume-relation'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Form } from 'shared/form'
import { Separator } from 'shared/ui'

import { SubmitButton } from './submit-button'
import { FormValues } from '../model/form-values'

type Params = {
  jobPostResumeRelationId: string
}

type Props = {
  values: FormValues
}

export const ApplicationSidePanel = ({ values }: Props) => {
  const params = useParams<Params>()
  const jobPostResumeRelationId = params?.jobPostResumeRelationId as string

  const form = useForm<FormValues>({
    values,
  })

  const [status, memo] = useWatch({
    control: form.control,
    name: ['status', 'memo'],
  })

  const { handleServerError } = useServerErrorHandler()

  const statusHasChanged = status !== values.status
  const memoHasChanged = memo !== values.memo

  const hasChanged = statusHasChanged || memoHasChanged

  const updateMemo = async (memo: string) => {
    let success = false

    const response = await updateJobPostResumeMemo(
      Number(jobPostResumeRelationId),
      memo!,
    )

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      success = true
    }

    return success
  }

  const updateStatus = async (status: ApplicationStatus) => {
    let success = false

    const response = await updateJobPostResumeStatus(
      Number(jobPostResumeRelationId),
      status!,
    )

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      success = true
    }

    return success
  }

  const handleSubmit = async ({ status, memo }: FormValues) => {
    let success: boolean | null = null

    if (memoHasChanged) {
      success = await updateMemo(memo)
    }

    if (statusHasChanged) {
      const statusUpdateSuccess = await updateStatus(status)

      if (success !== false) {
        success = statusUpdateSuccess
      }
    }

    if (success) {
      toast.success('내용을 저장했어요')
    }
  }

  return (
    <div className="h-fit min-h-[329px] w-[250px] shrink-0 rounded-2xl border border-gray-300 p-6">
      <Form {...form}>
        <div className="mb-3 flex h-[38px] items-center gap-2">
          <Form.Control name="status">
            <label className="title-small font-bold text-gray-900">
              현재 채용 단계:
            </label>
            <ApplicationStatusSelect />
          </Form.Control>
        </div>
        <p className="body-large mb-5 font-normal text-gray-900">
          채용 단계를 변경하면 지원자에게 알림으로 결과를 알려줘요
        </p>
        <Separator className="mb-5" />
        <div className="mb-6 flex flex-col gap-2">
          <Form.Control name="memo">
            <label className="title-small font-bold text-gray-900">
              한 줄 메모
            </label>
            <Form.TextArea
              className="body-large placeholder:body-large h-12 border-0 px-0 py-1 font-normal underline placeholder:font-normal placeholder:underline"
              placeholder="지원자에 대해 기억하고 싶은 점이 있다면 적어주세요 (최대 100자)"
            />
          </Form.Control>
        </div>
        <SubmitButton
          hasToOpenModal={statusHasChanged}
          onSubmit={handleSubmit}
          disabled={!hasChanged}
          status={{
            prev: values.status,
            next: status,
          }}
        />
      </Form>
    </div>
  )
}
