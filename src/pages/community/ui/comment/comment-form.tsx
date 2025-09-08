'use client'

import { isString } from 'lodash-es'
import { useTranslations } from 'next-intl'
import { ChangeEvent, useState } from 'react'

import { Button, TextArea } from 'shared/ui'

export const MAX_LENGTH = 200

type Props = {
  defaultValue?: string
  onCancel?: () => void
  onSubmit: (comment: string) => void
}

export const CommentForm = ({ defaultValue, onCancel, onSubmit }: Props) => {
  const t = useTranslations()

  const [value, setValue] = useState(defaultValue ?? '')

  const isEditMode = isString(defaultValue)

  const isDisabled = value.length === 0

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  const handleCancel = () => {
    setValue('')
    onCancel?.()
  }

  const handleSubmit = () => {
    setValue('')
    onSubmit(value)
  }

  return (
    <div className="relative flex h-[128px] flex-col items-end gap-2 rounded-lg bg-gray-100 p-3">
      <TextArea
        value={value}
        onChange={handleChange}
        placeholder={t('field.comment-content.placeholder')}
        fullWidth
        className="body-large h-full cursor-text overflow-scroll rounded-lg border-none bg-gray-100 p-0"
        maxLength={MAX_LENGTH}
      />
      <div className="flex items-center gap-2">
        <span className="body-small text-gray-500">
          {value.length}/{MAX_LENGTH}
        </span>
        {isEditMode && (
          <Button
            variant="lined"
            className="w-[62px]"
            size="small"
            onClick={handleCancel}
          >
            {t('feed-list.feed-item.comment.button.cancel')}
          </Button>
        )}
        <Button
          variant="primary"
          size="small"
          className="w-[62px] [&:disabled]:bg-blue-100"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          {t('feed-list.feed-item.comment.button.post')}
        </Button>
      </div>
    </div>
  )
}
