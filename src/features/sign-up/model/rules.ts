import { FormValues } from './form-values'

const REG_EMAIL =
  /^([A-Za-z0-9]+([-_.]?[A-Za-z0-9])*)@([A-Za-z0-9]+([-]?[A-Za-z0-9])*)(\.([A-Za-z0-9]+([-]?[A-Za-z0-9])*))?(\.([A-Za-z0-9]([-]?[A-Za-z0-9])*))?((\.[A-Za-z]{2,63})$)/

export const email = {
  required: 'validation.email.required',
  maxLength: {
    value: 254,
    message: 'validation.email.maxLength',
  },
  pattern: {
    value: REG_EMAIL,
    message: 'validation.email.pattern',
  },
}

export const code = {
  required: 'validation.code.required',
}

const REG_UPPER_LOWER_CASE_LETTERS = /(?=.*[a-z])(?=.*[A-Z])/
const REG_NUMBER = /(?=.*\d)/
const REG_SPECIAL_CHAR = /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/

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
  required: 'validation.confirm-password.required',
  validate: (value: string | number | null, formValues: FormValues) => {
    if (value === formValues.password) return true

    return 'validation.confirm-password.match'
  },
}

export const firstName = {
  required: 'validation.firstName.required',
  maxLength: {
    value: 254,
    message: 'validation.firstName.maxLength',
  },
}

export const lastName = {
  required: 'validation.lastName.required',
  maxLength: {
    value: 254,
    message: 'validation.lastName.maxLength',
  },
}

export const fullName = {
  required: 'validation.fullName.required',
  maxLength: {
    value: 254,
    message: 'validation.fullName.maxLength',
  },
}

export const country = {
  required: 'validation.country.required',
}

export const birthDate = {
  required: 'validation.birthDate.required',
}

export const representativeName = {
  required: 'validation.representativeName.required',
  maxLength: {
    value: 10,
    message: 'validation.representativeName.maxLength',
  },
  pattern: {
    value: /^[가-힣]+$/,
    message: 'validation.representativeName.pattern',
  },
}

export const academyName = {
  required: 'validation.academyName.required',
  maxLength: {
    value: 30,
    message: 'validation.academyName.maxLength',
  },
}

export const academyNameEn = {
  required: 'validation.academyNameEn.required',
  maxLength: {
    value: 30,
    message: 'validation.academyNameEn.maxLength',
  },
}

export const address = {
  required: 'validation.address.required',
}

export const detailedAddress = {
  required: 'validation.detailedAddress.required',
  maxLength: {
    value: 100,
    message: 'validation.detailedAddress.maxLength',
  },
}

export const businessRegistrationNumber = {
  required: 'validation.businessRegistrationNumber.required',
  minLength: {
    value: 10,
    message: 'validation.businessRegistrationNumber.length',
  },
  maxLength: {
    value: 10,
    message: 'validation.businessRegistrationNumber.length',
  },
  pattern: {
    value: /^\d+$/,
    message: 'validation.businessRegistrationNumber.pattern',
  },
}
