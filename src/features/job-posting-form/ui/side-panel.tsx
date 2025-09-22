import { isEqual } from 'lodash-es'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { Button } from 'shared/ui'

import {
  canRegisterForm,
  defaultValues,
  FormValues,
} from '../model/form-values'

type Props = {
  type: 'register' | 'update'
  onRegister?: () => void
  onSave?: () => void
}

export const SidePanel = ({ type, onRegister, onSave }: Props) => {
  const t = useTranslations('create-job-posting')
  const { handleSubmit, control, getValues } = useFormContext<FormValues>()

  const [
    title,
    jobDescription,
    salary,
    studentType,
    dueDate,
    noExpirationDate,
  ] = useWatch({
    control,
    name: [
      'title',
      'jobDescription',
      'salary',
      'studentType',
      'dueDate',
      'noExpirationDate',
    ],
  })

  const canSave = isEqual(getValues(), defaultValues)

  const submitForm = handleSubmit(() => {
    onRegister?.()
  })

  return (
    <div className="h-fit w-[340px] shrink-0 rounded-2xl border border-gray-300 bg-white p-6">
      <p className="body-large mb-2 text-blue-800">{t('side-panel.title')}</p>
      <div className="mb-6">
        <p className="body-medium text-gray-700">
          {t('side-panel.description1')}
        </p>
        <p className="body-medium text-gray-700">
          {t('side-panel.description2')}
        </p>
      </div>
      <div className="space-y-2">
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={submitForm}
          disabled={
            !canRegisterForm({
              title,
              jobDescription,
              salary,
              studentType,
              dueDate,
              noExpirationDate,
            })
          }
        >
          {t('button.register-job-posting')}
        </Button>
        {type === 'register' && (
          <Button
            variant="lined"
            size="large"
            fullWidth
            disabled={canSave}
            onClick={onSave}
          >
            {t('button.save-job-posting-draft')}
          </Button>
        )}
      </div>
    </div>
  )
}
