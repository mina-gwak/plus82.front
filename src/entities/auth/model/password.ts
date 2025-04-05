const REG_UPPER_LOWER_CASE_LETTERS = /(?=.*[a-z])(?=.*[A-Z])/
const REG_NUMBER = /(?=.*\d)/
const REG_SPECIAL_CHAR = /(?=.*[!@#$%^&*()_+\-=[\]{};":\\|,.<>/?])/

export const isCorrectLength = (value: string) =>
  value.length >= 9 && value.length <= 28

export const hasNumber = (value: string) => REG_NUMBER.test(value)

export const hasLowercaseAndUppercaseLetter = (value: string) =>
  REG_UPPER_LOWER_CASE_LETTERS.test(value)

export const hasSpecialChar = (value: string) => REG_SPECIAL_CHAR.test(value)

export const passwordRules = {
  required: true,
  validate: (value: string) =>
    isCorrectLength(value) &&
    hasNumber(value) &&
    hasLowercaseAndUppercaseLetter(value) &&
    hasSpecialChar(value),
}

export const confirmPasswordRules = {
  required: 'validation.confirm-password.required',
  validate: <T extends { password: string }>(
    value: string | number | null,
    formValues: T,
  ) => {
    if (value === formValues.password) return true

    return 'validation.confirm-password.match'
  },
}

export const currentPasswordRules = {
  required: true,
}
