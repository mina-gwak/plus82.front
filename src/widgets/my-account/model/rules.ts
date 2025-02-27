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

export const birthDate = {
  required: 'Please enter your date of birth',
}
