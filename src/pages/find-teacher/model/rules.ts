const REG_EMAIL =
  /^([A-Za-z0-9]+([-_.]?[A-Za-z0-9])*)@([A-Za-z0-9]+([-]?[A-Za-z0-9])*)(\.([A-Za-z0-9]+([-]?[A-Za-z0-9])*))?(\.([A-Za-z0-9]([-]?[A-Za-z0-9])*))?((\.[A-Za-z]{2,63})$)/

export const email = {
  maxLength: {
    value: 254,
    message: 'validation.email.maxLength',
  },
  pattern: {
    value: REG_EMAIL,
    message: 'validation.email.pattern',
  },
}
