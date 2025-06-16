import { UpdateBusinessUserMeRequest, User } from 'entities/user'

export type UpdateUserMeFormValues = {
  fullName: string
  genderType: 'MALE' | 'FEMALE'
  birthDate: string | null
}

export const convertToUpdateUserMeFormValues = (
  user: User,
): UpdateUserMeFormValues => {
  return {
    fullName: user.fullName ?? '',
    genderType: user.genderType,
    birthDate: user.birthDate,
  }
}

export const convertToUpdateUserMeDTO = (
  data: UpdateUserMeFormValues,
): UpdateBusinessUserMeRequest => {
  return {
    ...data,
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
