import { useLocale, useTranslations } from 'next-intl'

import { ApplicationStatus } from 'entities/job-post-resume-relation'
import { Form, FormSelectProps } from 'shared/form'
import { cn } from 'shared/lib'

export const StatusLabel = {
  [ApplicationStatus.SUBMITTED]: 'submitted',
  [ApplicationStatus.REVIEWED]: 'reviewed',
  [ApplicationStatus.ACCEPTED]: 'accepted',
  [ApplicationStatus.REJECTED]: 'rejected',
}

export const ApplicationStatusSelect = (props: FormSelectProps) => {
  const locale = useLocale()
  const t = useTranslations('field.application-status.option')

  return (
    <Form.Select
      name="status"
      size="medium"
      className={cn({
        'w-[85px]': locale === 'ko',
        'w-[120px]': locale === 'en',
      })}
      displayValue={value => t(StatusLabel[value as ApplicationStatus])}
      {...props}
    >
      <Form.SelectItem value={ApplicationStatus.SUBMITTED}>
        {t('submitted')}
      </Form.SelectItem>
      <Form.SelectItem value={ApplicationStatus.REVIEWED}>
        {t('reviewed')}
      </Form.SelectItem>
      <Form.SelectItem value={ApplicationStatus.ACCEPTED}>
        {t('accepted')}
      </Form.SelectItem>
      <Form.SelectItem value={ApplicationStatus.REJECTED}>
        {t('rejected')}
      </Form.SelectItem>
    </Form.Select>
  )
}
