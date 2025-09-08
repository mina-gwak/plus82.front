'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { academyQueries } from 'entities/academy'
import { JobPostDetail, updateJobPost } from 'entities/job-post'
import { JobPostingForm, SidePanel } from 'features/job-posting-form'
import {
  convertToCreateJobPostDTO,
  convertToJobDetail,
  FormValues,
  convertToFormValues,
} from 'features/job-posting-form'
import { PreviewJobPostingButton } from 'features/preview-job-posting'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Form } from 'shared/form'
import { Layout } from 'shared/ui'

type Props = {
  jobPostId: number
  jobPostDetail: JobPostDetail
}

export const UpdateJobPostingPage = ({ jobPostId, jobPostDetail }: Props) => {
  const t = useTranslations()

  const router = useRouter()

  const { data: academyMe } = useQuery(academyQueries.me())

  const { handleServerError } = useServerErrorHandler()

  const form = useForm<FormValues>({
    values: convertToFormValues(jobPostDetail),
    reValidateMode: 'onSubmit',
  })

  const getJobPosting = async () => {
    const values = form.getValues()
    const createJobPost = convertToCreateJobPostDTO(values)

    return convertToJobDetail(createJobPost, academyMe!)
  }

  const handleUpdateJobPostingSuccess = () => {
    router.push('/business/job-posting')
    toast.success(t('create-job-posting.success.job-posting-update'))
  }

  const updateJobPosting = async () => {
    const values = form.getValues()

    const response = await updateJobPost({
      jobPostId,
      jobPost: convertToCreateJobPostDTO(values),
    })

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleUpdateJobPostingSuccess()
    }
  }

  return (
    <Layout wide>
      <h1 className="display-small mb-10 text-center font-bold text-gray-900">
        {t('create-job-posting.update-title')}
      </h1>
      <Form {...form} className="flex gap-[20px]">
        <JobPostingForm className="flex-grow" />
        <div className="space-y-2">
          <SidePanel type="update" onRegister={updateJobPosting} />
          <PreviewJobPostingButton
            type="text-button"
            className="ml-auto block"
            onLoad={getJobPosting}
          />
        </div>
      </Form>
    </Layout>
  )
}
