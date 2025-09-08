import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { updateAcademyMe } from 'entities/academy'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Button } from 'shared/ui'

import {
  canRegisterForm,
  convertToUpdateAcademyDetail,
  FormValues,
} from '../model/form-values'

export const SidePanel = () => {
  const t = useTranslations('academy-detail')

  const { handleSubmit, control } = useFormContext<FormValues>()

  const { handleServerError } = useServerErrorHandler()

  const [
    representativeName,
    name,
    nameEn,
    address,
    detailedAddress,
    description,
    studentType,
    images,
  ] = useWatch({
    control,
    name: [
      'representativeName',
      'name',
      'nameEn',
      'address',
      'detailedAddress',
      'description',
      'studentType',
      'images',
    ],
  })

  const handleRegisterSuccess = () => {
    toast.success(t('success.register'))
  }

  const submitForm = async (data: FormValues) => {
    const response = await updateAcademyMe(convertToUpdateAcademyDetail(data))

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleRegisterSuccess()
    }
  }

  return (
    <div className="h-fit w-[340px] shrink-0 rounded-2xl border border-gray-300 p-6">
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
          onClick={handleSubmit(submitForm)}
          disabled={
            !canRegisterForm({
              representativeName,
              name,
              nameEn,
              address,
              detailedAddress,
              description,
              studentType,
              images,
            })
          }
        >
          {t('button.save')}
        </Button>
      </div>
    </div>
  )
}
