import { MouseEvent } from 'react'

import { colors } from 'shared/config'
import { cn } from 'shared/lib'
import { Button, Icon } from 'shared/ui'

import { useCopyJobPosting } from '../lib/copy-job-posting'

type Props = {
  type: 'icon' | 'button'
  jobPostId: number
  onSuccess?: () => void
  disabled?: boolean
}

export const CopyJobPostingButton = ({
  type,
  jobPostId,
  onSuccess,
  disabled,
}: Props) => {
  const { isLoading, copyJobPosting } = useCopyJobPosting()

  const handleCopyButtonClick = async (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation()
    event.preventDefault()

    await copyJobPosting({
      jobPostId,
      onSuccess,
    })
  }

  if (type === 'icon') {
    return (
      <button
        className="flex h-10 w-10 items-center justify-center"
        disabled={disabled}
        onClick={handleCopyButtonClick}
      >
        <Icon
          name="Copy"
          size="large"
          color={disabled ? colors.gray[300] : colors.gray[700]}
        />
      </button>
    )
  }

  return (
    <Button
      type="button"
      variant="lined"
      size="small"
      onClick={handleCopyButtonClick}
      disabled={isLoading}
    >
      <Button.Icon name="Copy" />
      {isLoading ? '복사 중...' : '공고 복사'}
    </Button>
  )
}
