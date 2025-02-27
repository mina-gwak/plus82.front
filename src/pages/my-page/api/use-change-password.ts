import { useMutation } from '@tanstack/react-query'

import { changePassword } from 'entities/user'

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  })
}
