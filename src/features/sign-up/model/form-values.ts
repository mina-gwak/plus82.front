/* eslint-disable @typescript-eslint/no-unused-vars */

import { SignUpRequest } from 'entities/auth'

export type FormValues = {
  email: string
  code: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  countryId: number | null
  genderType: 'MALE' | 'FEMALE'
  birthDate: string | null
}

export const defaultValues: FormValues = {
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  countryId: null,
  genderType: 'FEMALE',
  birthDate: null,
}

export const convertToSignUpDTO = ({
  code,
  confirmPassword,
  ...restFormValues
}: FormValues): SignUpRequest => {
  return {
    ...restFormValues,
    birthDate: restFormValues.birthDate!,
    countryId: restFormValues.countryId!,
  }
}
