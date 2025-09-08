'use client'

import { useQuery } from '@tanstack/react-query'
import { isNumber } from 'lodash-es'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { feedQueries } from 'entities/feed'
import { fieldCss, Form } from 'shared/form'
import { Button, Label, Modal, Spinner } from 'shared/ui'

import { EditButton } from './edit-button'
import { ImageUploader } from './image-uploader'
import { PostButton } from './post-button'
import { convertFeedToFormValues } from '../model/converter'
import { defaultValues, type FormValues } from '../model/form-values'

type Props = {
  feedId?: number
  onSuccess: () => void
}

export const FeedForm = ({ feedId, onSuccess }: Props) => {
  const t = useTranslations()

  const pathname = usePathname()
  const isBusiness = pathname?.includes('business')

  const isEditMode = isNumber(feedId)

  const { data: feed, isLoading } = useQuery({
    ...(isBusiness
      ? feedQueries.businessItem(feedId!)
      : feedQueries.item(feedId!)),
    enabled: isEditMode,
    select: data => convertFeedToFormValues(data),
  })

  const formValues = feed ?? defaultValues

  const form = useForm<FormValues>({
    values: formValues,
  })

  const { control, setValue } = form

  const image = useWatch({
    control,
    name: 'image',
  })

  const handleImageChange = ({ file, url }: { file: File; url: string }) => {
    setValue('image', { imageId: null, image: file, url })
  }

  const handleImageDelete = () => {
    setValue('image', { imageId: null, image: null, url: null })
  }

  if (isLoading)
    return (
      <div className="relative h-full">
        <Spinner />
      </div>
    )

  return (
    <Form {...form} className="flex flex-grow flex-col">
      <Form.Control name="content">
        <Form.TextArea
          placeholder={t('field.feed-content.placeholder')}
          fullWidth
          className="mb-6 h-[248px] border-none p-0 text-[16px] font-normal leading-7"
          maxLength={3000}
        />
      </Form.Control>
      <div className={fieldCss.fieldWrapper()}>
        <Label>{t('field.feed-image.label')}</Label>
        <Form.Control name="image">
          <ImageUploader
            value={image}
            onChange={handleImageChange}
            onDelete={handleImageDelete}
          />
        </Form.Control>
      </div>
      <div className={fieldCss.fieldWrapper()}>
        <Label>{t('field.feed-visibility.label')}</Label>
        <Form.Control name="feedVisibility">
          <Form.RadioGroup className={fieldCss.radioFieldWrapper()}>
            <Form.Radio
              label={t('field.feed-visibility.option.public')}
              value="PUBLIC"
            />
            <Form.Radio
              label={t('field.feed-visibility.option.members-only')}
              value="PRIVATE"
            />
          </Form.RadioGroup>
        </Form.Control>
      </div>
      <Modal.Footer className="flex flex-grow items-end">
        <Modal.Close asChild>
          <Button variant="lined" className="w-[93px]" size="large">
            {t('feed-list.feed-form.button.cancel')}
          </Button>
        </Modal.Close>
        {!isEditMode && <PostButton onSuccess={onSuccess} />}
        {isEditMode && <EditButton feedId={feedId} onSuccess={onSuccess} />}
      </Modal.Footer>
    </Form>
  )
}
