'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { updateBusinessUserMe, User } from 'entities/user'
import { DeleteUserButton } from 'features/delete-account'
import { BirthDate, FullName, Gender } from 'features/sign-up'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Form } from 'shared/form'
import { Button } from 'shared/ui'

import {
  convertToUpdateUserMeDTO,
  convertToUpdateUserMeFormValues,
  UpdateUserMeFormValues,
} from '../model/form-values'

type Props = {
  user: User
}

export const PersonalInformationPage = ({ user }: Props) => {
  const t = useTranslations('my-account')

  const form = useForm<UpdateUserMeFormValues>({
    defaultValues: convertToUpdateUserMeFormValues(user),
    reValidateMode: 'onSubmit',
  })

  const { handleServerError } = useServerErrorHandler()

  const handleSuccess = () => {
    toast.success(t('success.save'))
  }

  const submitForm = async (data: UpdateUserMeFormValues) => {
    const response = await updateBusinessUserMe(convertToUpdateUserMeDTO(data))

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleSuccess()
    }
  }

  return (
    <div className="flex flex-grow justify-center p-10">
      <div>
        <h2 className="title-large mb-10 text-center font-bold text-gray-900">
          {t('title')}
        </h2>
        <Form {...form} className="mb-6 w-fit">
          <div className="mb-9">
            <FullName />
            <Gender />
            <BirthDate />
          </div>
          <Button
            size="large"
            fullWidth
            onClick={form.handleSubmit(submitForm)}
          >
            {t('button.save')}
          </Button>
        </Form>
        <DeleteUserButton />
      </div>
    </div>
  )
}
