import { isEqual } from 'lodash-es'
import { useLocale, useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { fieldCss, Form } from 'shared/form'
import { cn, Slot } from 'shared/lib'
import { Checkbox, CheckboxValue, Label } from 'shared/ui'

import { FormValues } from '../model/form-values'
import * as rules from '../model/rules'

type Props = {
  className?: string
}

export const JobPostingForm = ({ className }: Props) => {
  const locale = useLocale()
  const t = useTranslations()

  const {
    control,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext<FormValues>()

  const [title, studentType, noExpirationDate] = useWatch({
    control,
    name: ['title', 'studentType', 'noExpirationDate'],
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

  const handleExpirationDateChange = (value: CheckboxValue[]) => {
    if (value.includes('true')) {
      setValue('dueDate', null)
    } else {
      setValue('dueDate', undefined)
    }

    clearErrors('dueDate')
  }

  return (
    <div className={cn('rounded-3xl border border-gray-300 p-10', className)}>
      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label required>{t('field.job-posting-title.label')}</Label>
        <Form.Control name="title" rules={rules.title}>
          <Form.TextField
            placeholder={t('field.job-posting-title.placeholder')}
            maxLength={40}
            fullWidth
          />
          <div className="flex justify-between">
            <div>
              <Form.ErrorMessage name="title" />
            </div>
            <div className="body-small font-medium text-gray-700">
              {title.length}/40 자 {/* TODO: 번역 */}
            </div>
          </div>
        </Form.Control>
      </div>
      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label required>{t('field.job-posting-description.label')}</Label>
        <Form.Control name="jobDescription" rules={rules.jobDescription}>
          <Form.TextArea
            placeholder={t('field.job-posting-description.placeholder')}
            fullWidth
            className="h-[128px]"
          />
          <Form.ErrorMessage />
        </Form.Control>
      </div>
      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label>{t('field.job-posting-required-qualification.label')}</Label>
        <Form.Control
          name="requiredQualification"
          rules={rules.requiredQualification}
        >
          <Form.TextArea
            placeholder={t(
              'field.job-posting-required-qualification.placeholder',
            )}
            fullWidth
            className="h-[128px]"
          />
          <Form.ErrorMessage />
        </Form.Control>
      </div>
      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label>{t('field.job-posting-preferred-qualification.label')}</Label>
        <Form.Control
          name="preferredQualification"
          rules={rules.preferredQualification}
        >
          <Form.TextArea
            placeholder={t(
              'field.job-posting-preferred-qualification.placeholder',
            )}
            fullWidth
            className="h-[128px]"
          />
          <Form.ErrorMessage />
        </Form.Control>
      </div>
      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label>{t('field.job-posting-benefits.label')}</Label>
        <Form.Control name="benefits" rules={rules.benefits}>
          <Form.TextArea
            placeholder={t('field.job-posting-benefits.placeholder')}
            fullWidth
            className="h-[128px]"
          />
          <Form.ErrorMessage />
        </Form.Control>
      </div>
      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label required>{t('field.job-posting-salary.label')}</Label>
        <Form.Control name="salary" rules={rules.salary}>
          <Form.TextField
            placeholder={t('field.job-posting-salary.placeholder')}
            fullWidth
          >
            <Slot name="right">
              <span className="body-large shrink-0 text-gray-700">
                {t('field.currency-unit.label')}
              </span>
            </Slot>
          </Form.TextField>
          <Form.ErrorMessage />
        </Form.Control>
        <Form.Control name="salaryNegotiable">
          <Form.CheckboxGroup options={['true']}>
            <Form.Checkbox
              label={t('field.job-posting-salary-negotiable.label')}
              value="true"
            />
          </Form.CheckboxGroup>
          <Form.ErrorMessage />
        </Form.Control>
      </div>

      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label required>{t('field.target-student.label')}</Label>
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
              label={t('field.target-student.option.all')}
              value="All"
              checked={isAllChecked}
              onChange={handleAllCheckboxClick}
              error={!!errors?.studentType}
            />
            <Form.Checkbox
              label={t('field.target-student.option.kindergarten')}
              value="Kindergarten"
            />
            <Form.Checkbox
              label={t('field.target-student.option.elementary')}
              value="Elementary"
            />
            <Form.Checkbox
              label={t('field.target-student.option.middle-school')}
              value="MiddleSchool"
            />
            <Form.Checkbox
              label={t('field.target-student.option.high-school')}
              value="HighSchool"
            />
            <Form.Checkbox
              label={t('field.target-student.option.adult')}
              value="Adult"
            />
          </Form.CheckboxGroup>
        </div>
      </div>

      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-7' })}>
        <Label>{t('field.job-posting-start-date.label')}</Label>
        <Form.Control name="jobStartDate">
          <Form.DatePicker
            placeholder={t('field.job-posting-start-date.placeholder')}
            fullWidth
            dateFormat="yyyy-MM-dd"
          />
          <Form.ErrorMessage />
        </Form.Control>
      </div>

      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label required>{t('field.job-posting-due-date.label')}</Label>
        <Form.Control name="dueDate" rules={rules.dueDate}>
          <Form.DatePicker
            placeholder={t('field.job-posting-due-date.placeholder')}
            fullWidth
            disabled={noExpirationDate.includes('true')}
            dateFormat="yyyy-MM-dd"
          />
          <Form.ErrorMessage className="-mt-[6px] mb-[6px]" />
        </Form.Control>
        <Form.Control name="noExpirationDate">
          <Form.CheckboxGroup
            options={['true']}
            onChange={handleExpirationDateChange}
          >
            <Form.Checkbox
              label={t('field.job-posting-no-expiration-date.label')}
              value="true"
              className="[&:last-child]:-mt-[6px]"
            />
          </Form.CheckboxGroup>
        </Form.Control>
      </div>
    </div>
  )
}
