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
  required: true,
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

export const description = {
  required: 'validation.academyDescription.required',
  maxLength: {
    value: 1000,
    message: 'validation.academyDescription.maxLength',
  },
}

export const studentType = {
  required: true,
}

export const images = {
  validate: (value: { image: File | null; url: string | null }[]) => {
    if (
      value.length === 0 ||
      value.every(({ image, url }) => image === null && url === null)
    ) {
      return 'validation.images.required'
    }

    return true
  },
}
