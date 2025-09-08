import { isNull } from 'lodash-es'

export const title = {
  required: 'validation.jobPostingTitle.required',
  maxLength: {
    value: 40,
    message: 'validation.jobPostingTitle.maxLength',
  },
}

export const jobDescription = {
  required: 'validation.jobPostingDescription.required',
  maxLength: {
    value: 1000,
    message: 'validation.jobPostingDescription.maxLength',
  },
}

export const requiredQualification = {
  maxLength: {
    value: 1000,
    message: 'validation.jobPostingRequiredQualification.maxLength',
  },
}

export const preferredQualification = {
  maxLength: {
    value: 1000,
    message: 'validation.jobPostingPreferredQualification.maxLength',
  },
}

export const benefits = {
  maxLength: {
    value: 1000,
    message: 'validation.jobPostingBenefits.maxLength',
  },
}

export const salary = {
  required: 'validation.jobPostingSalary.required',
  validate: (value: string) => {
    const isNumber = /^\d+$/.test(value)

    if (!isNumber) {
      return 'validation.jobPostingSalary.invalid'
    }

    const salary = value.toString().replace(/,/g, '')

    if (salary.length > 10) {
      return 'validation.jobPostingSalary.maxLength'
    }

    return true
  },
}

export const studentType = {
  required: true,
}

export const dueDate = {
  validate: (value: string) => {
    if (isNull(value)) return true

    if (value === '' || value === undefined)
      return 'validation.jobPostingDueDate.required'

    return true
  },
}
