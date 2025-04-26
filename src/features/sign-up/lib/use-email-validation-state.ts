import { useMutationState } from '@tanstack/react-query'

type Props = {
  isBusiness?: boolean
}

export const useEmailValidationState = ({ isBusiness = false }: Props = {}) => {
  const key = isBusiness
    ? 'academy-request-verification'
    : 'request-verification'
  const requestVerification = useMutationState({
    filters: { mutationKey: [key] },
    select: mutation => ({
      isSuccess: mutation.state.status === 'success',
      mutation: mutation,
    }),
  })

  const verifyCode = useMutationState({
    filters: { mutationKey: ['verify-code'] },
    select: mutation => ({
      isSuccess: mutation.state.status === 'success',
    }),
  })

  return {
    isEmailVerificationRequested: requestVerification.at(-1)?.isSuccess,
    isEmailVerificationCompleted: verifyCode.at(-1)?.isSuccess,
  }
}
