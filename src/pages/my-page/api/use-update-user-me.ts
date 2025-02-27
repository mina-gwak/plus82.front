import { useMutation } from '@tanstack/react-query'

import { updateUserMe } from 'entities/user'

export const useUpdateUserMe = () => {
  return useMutation({
    mutationFn: updateUserMe,
  })
}
