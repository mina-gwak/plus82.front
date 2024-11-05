import { useMutation } from '@tanstack/react-query'

import { resetPassword } from 'entities/auth'

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  })
}
