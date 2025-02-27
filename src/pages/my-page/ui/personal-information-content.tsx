'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { updateUserMe, User } from 'entities/user'
import { DeleteUserButton } from 'features/delete-account'
import { isServerError, useServerErrorHandler } from 'shared/api'
import { Form } from 'shared/form'
import { Button } from 'shared/ui'
import { PersonalInformationForm } from 'widgets/my-account'

import {
  convertToUpdateUserMeDTO,
  convertToUpdateUserMeFormValues,
  type UpdateUserMeFormValues,
} from '../model/form-values'

type Props = {
  user: User
}

export const PersonalInformationContent = ({ user }: Props) => {
  const form = useForm<UpdateUserMeFormValues>({
    defaultValues: convertToUpdateUserMeFormValues(user),
    reValidateMode: 'onSubmit',
  })

  const { handleServerError } = useServerErrorHandler()

  const handleSuccess = () => {
    toast.success('Your personal information has been updated')
  }

  const submitForm = (data: UpdateUserMeFormValues) => {
    const response = updateUserMe(convertToUpdateUserMeDTO(data))

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      handleSuccess()
    }
  }

  return (
    <div>
      <h2 className="title-large mb-10 text-center font-bold text-gray-900">
        Personal Information
      </h2>
      <Form {...form} className="mb-6 w-fit">
        <PersonalInformationForm className="mb-10" />
        <Button size="large" fullWidth onClick={form.handleSubmit(submitForm)}>
          Save
        </Button>
      </Form>
      <DeleteUserButton />
    </div>
  )
}
