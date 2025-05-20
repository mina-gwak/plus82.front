import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { copyJobPost } from 'entities/job-post'
import { isServerError, useServerErrorHandler } from 'shared/api'

export const useCopyJobPosting = () => {
  const t = useTranslations('job-posting-list')

  const [isLoading, setIsLoading] = useState(false)

  const { handleServerError } = useServerErrorHandler()

  const copyJobPosting = async ({
    jobPostId,
    onSuccess,
  }: {
    jobPostId: number
    onSuccess?: () => void
  }) => {
    setIsLoading(true)

    const response = await copyJobPost(jobPostId)

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      toast.success(t('success.job-posting-copy'))
    }

    setIsLoading(false)
    onSuccess?.()
  }

  return {
    isLoading,
    copyJobPosting,
  }
}
