import { UpdateUserMeRequest, User } from 'entities/user'

export type UpdateUserMeFormValues = {
  firstName: string
  lastName: string
  countryId: number | null
  genderType: 'MALE' | 'FEMALE'
  birthDate: string | null
}

export const convertToUpdateUserMeFormValues = (
  user: User,
): UpdateUserMeFormValues => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    countryId: user.countryId,
    genderType: user.genderType,
    birthDate: user.birthDate,
  }
}

export const convertToUpdateUserMeDTO = (
  data: UpdateUserMeFormValues,
): UpdateUserMeRequest => {
  return {
    ...data,
    countryId: data.countryId!,
    birthDate: data.birthDate!,
  }
}

export type ChangePasswordFormValues = {
  currentPassword: string
  newPassword: string
}

export const changePasswordFormDefaultValues: ChangePasswordFormValues = {
  currentPassword: '',
  newPassword: '',
}
