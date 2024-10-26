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

export const password = {
  required: 'Please enter your password',
}
