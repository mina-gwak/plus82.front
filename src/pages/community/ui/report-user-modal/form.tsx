import { isUndefined } from 'lodash-es'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { Form } from 'shared/form'
import { Button, CheckboxValue, Modal } from 'shared/ui'

import { ReportButton } from './report-button'

type FormValues = {
  reason: string[] | null
  otherReason: string | null
}

const defaultValues: FormValues = {
  reason: null,
  otherReason: null,
}

const reasonOptions = [
  'field.report-user-reason.option.profanity-hate-discriminatory-language',
  'field.report-user-reason.option.spam-promotion-flooding-posts',
  'field.report-user-reason.option.spreader-of-false-information-agitator',
  'field.report-user-reason.option.inappropriate-nickname-profile',
  'field.report-user-reason.option.other',
]

const reasonRules = {
  required: true,
}

type Props = {
  userId: number
  onSuccess: () => void
}

export const ReportUserForm = ({ onSuccess, userId }: Props) => {
  const t = useTranslations()

  const form = useForm<FormValues>({
    defaultValues,
  })

  const { setValue } = form

  const reason = useWatch({
    control: form.control,
    name: 'reason',
  })

  const isOtherReasonDisabled = !reason?.includes('Other')

  const handleReasonChange = (value: CheckboxValue[]) => {
    const newValue = value.at(-1) as string | undefined
    if (!isUndefined(newValue)) {
      setValue('reason', [newValue])
    } else {
      setValue('reason', null)
    }

    if (newValue !== 'Other') {
      setValue('otherReason', null)
    }
  }

  return (
    <Form {...form} className="flex w-[452px] flex-grow flex-col px-6">
      <Form.CheckboxGroup
        name="reason"
        rules={reasonRules}
        options={reasonOptions}
        onChange={handleReasonChange}
      >
        {reasonOptions.map(reason => (
          <Form.Checkbox
            key={reason}
            label={t(reason)}
            value={t(reason)}
            className="mt-3 first:mt-0"
          />
        ))}
      </Form.CheckboxGroup>
      <Form.Control name="otherReason">
        <Form.TextArea
          placeholder={t('field.report-user-other-reason.placeholder')}
          className="mt-2 h-[84px] w-[404px] py-3"
          disabled={isOtherReasonDisabled}
        />
      </Form.Control>
      <Modal.Footer className="mt-10 w-[428px]">
        <Modal.Close asChild>
          <Button variant="lined" size="large" className="w-[93px]">
            {t('feed-list.feed-item.report-user-modal.button.cancel')}
          </Button>
        </Modal.Close>
        <ReportButton userId={userId} onSuccess={onSuccess} />
      </Modal.Footer>
    </Form>
  )
}
