export type FindFormValues = {
  email: string
}

export const findFormDefaultValues: FindFormValues = {
  email: '',
}

export type ResetFormValues = {
  password: string
  confirmPassword: string
}

export const resetFormDefaultValues: ResetFormValues = {
  password: '',
  confirmPassword: '',
}
