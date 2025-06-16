import { isEqual } from 'lodash-es'
import { useLocale, useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { fieldCss, Form } from 'shared/form'
import { cn } from 'shared/lib'
import { Checkbox, Label } from 'shared/ui'

import { FormValues } from '../../model/form-values'
import * as rules from '../../model/rules'

export const StudentType = () => {
  const locale = useLocale()
  const t = useTranslations('field')

  const {
    control,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext<FormValues>()

  const [studentType] = useWatch({
    control,
    name: ['studentType'],
  })

  const studentTypeOptions = [
    'Kindergarten',
    'Elementary',
    'MiddleSchool',
    'HighSchool',
    'Adult',
  ]

  const isAllChecked = isEqual(studentType, studentTypeOptions)

  const handleAllCheckboxClick = () => {
    if (isAllChecked) {
      setValue('studentType', null)
    } else {
      setValue('studentType', studentTypeOptions)
    }

    clearErrors('studentType')
  }

  return (
    <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
      <Label required>{t('target-student.label')}</Label>
      <div
        className={cn(
          'flex',
          locale === 'ko' && 'gap-[30px]',
          locale === 'en' && 'flex-wrap gap-x-[18px] gap-y-4',
        )}
      >
        <Form.CheckboxGroup
          name="studentType"
          rules={rules.studentType}
          options={studentTypeOptions}
        >
          <Checkbox
            label={t('target-student.option.all')}
            value="All"
            checked={isAllChecked}
            onChange={handleAllCheckboxClick}
            error={!!errors?.studentType}
          />
          <Form.Checkbox
            label={t('target-student.option.kindergarten')}
            value="Kindergarten"
          />
          <Form.Checkbox
            label={t('target-student.option.elementary')}
            value="Elementary"
          />
          <Form.Checkbox
            label={t('target-student.option.middle-school')}
            value="MiddleSchool"
          />
          <Form.Checkbox
            label={t('target-student.option.high-school')}
            value="HighSchool"
          />
          <Form.Checkbox
            label={t('target-student.option.adult')}
            value="Adult"
          />
        </Form.CheckboxGroup>
      </div>
    </div>
  )
}
