import { isNil } from 'lodash-es'

import { ResumeFormValues } from './form-values'

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

export const firstName = {
  required: 'Please enter your first name',
  maxLength: {
    value: 254,
    message: 'First name exceeds the maximum allowed length of 254 characters',
  },
}

export const lastName = {
  required: 'Please enter your last name',
  maxLength: {
    value: 254,
    message: 'Last name exceeds the maximum allowed length of 254 characters',
  },
}

export const country = {
  required: 'Please select your nationality',
}

export const currentCountry = {
  required: 'Please select your current country of residence',
}

export const degree = {
  required: 'Please enter your degree',
}

export const birthDate = {
  required: 'Please enter your date of birth',
}

export const gender = {
  required: true,
}

export const hasVisa = {
  required: true,
}

export const studentType = {
  required: true,
}

export const visaType = {
  validate: (value: string, formValues: Pick<ResumeFormValues, 'hasVisa'>) => {
    if (formValues.hasVisa === 'false') return true
    if (isNil(value)) return 'Please select your visa type'

    return true
  },
}
