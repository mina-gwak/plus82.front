import { FormValues } from '../model/form-values'

const REG_EMAIL =
  /^([A-Za-z0-9]+([-_.]?[A-Za-z0-9])*)@([A-Za-z0-9]+([-]?[A-Za-z0-9])*)(\.([A-Za-z0-9]+([-]?[A-Za-z0-9])*))?(\.([A-Za-z0-9]([-]?[A-Za-z0-9])*))?((\.[A-Za-z]{2,63})$)/

export const email = {
  required: 'Please enter your email',
  maxLength: {
    value: 254,
    message: 'Input exceeds maximum allowed length of 254 characters',
  },
  pattern: {
    value: REG_EMAIL,
    message: "Invalid email format. Please use the format 'example@domain.com'",
  },
}

export const code = {
  required: 'Please enter your email verification code',
}

const REG_UPPER_LOWER_CASE_LETTERS = /(?=.*[a-z])(?=.*[A-Z])/
const REG_NUMBER = /(?=.*\d)/
const REG_SPECIAL_CHAR = /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])/

export const isCorrectLength = (value: string) =>
  value.length >= 9 && value.length <= 28

export const hasNumber = (value: string) => REG_NUMBER.test(value)

export const hasLowercaseAndUppercaseLetter = (value: string) =>
  REG_UPPER_LOWER_CASE_LETTERS.test(value)

export const hasSpecialChar = (value: string) => REG_SPECIAL_CHAR.test(value)

export const password = {
  required: true,
  validate: (value: string) =>
    isCorrectLength(value) &&
    hasNumber(value) &&
    hasLowercaseAndUppercaseLetter(value) &&
    hasSpecialChar(value),
}

export const confirmPassword = {
  required: 'Please enter your password',
  validate: (value: string | number | null, formValues: FormValues) => {
    if (value === formValues.password) return true

    return 'The password you entered do not match'
  },
}
