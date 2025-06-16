import { useTranslations } from 'next-intl'
import { MouseEvent } from 'react'

import { getBusinessJobPost } from 'entities/job-post'
import { JobPostDetail } from 'entities/job-post'
import { colors } from 'shared/config'
import { cn } from 'shared/lib'
import { Button, Icon } from 'shared/ui'

import { setPreviewJobPosting } from '../lib/storage'

type Props = {
  type: 'icon' | 'button' | 'text-button'
  jobPostId?: number
  onLoad?: () => Promise<JobPostDetail>
  disabled?: boolean
  className?: string
}

export const PreviewJobPostingButton = ({
  type,
  jobPostId,
  onLoad,
  disabled,
  className,
}: Props) => {
  const t = useTranslations('applicant-management-list')

  const handlePreviewButtonClick = async (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation()
    event.preventDefault()

    if (jobPostId) {
      const jobPost = await getBusinessJobPost({ jobPostId })
      setPreviewJobPosting(jobPost)
    } else {
      const jobPost = await onLoad?.()
      setPreviewJobPosting(jobPost!)
    }

    window.open('/business/preview/job-posting', '_blank')
  }

  if (type === 'icon') {
    return (
      <button
        className={cn('flex h-10 w-10 items-center justify-center', className)}
        disabled={disabled}
        onClick={handlePreviewButtonClick}
      >
        <Icon
          name="DocumentSearch"
          size="large"
          color={disabled ? colors.gray[300] : colors.gray[700]}
        />
      </button>
    )
  }

  if (type === 'text-button') {
    return (
      <button
        className={cn('body-large text-gray-700', className)}
        disabled={disabled}
        onClick={handlePreviewButtonClick}
      >
        {t('button.preview')}
      </button>
    )
  }

  return (
    <Button
      type="button"
      variant="lined"
      size="small"
      onClick={handlePreviewButtonClick}
      disabled={disabled}
      className={className}
    >
      <Button.Icon name="DocumentSearch" />
      {t('button.preview')}
    </Button>
  )
}
