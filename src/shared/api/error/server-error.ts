import { useCallback } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { toast } from 'react-toastify'

export type ServerError = {
  type: 'toast' | 'form' | 'modal'
  message: string
  field?: string
}

export const isServerError = (error: any): error is ServerError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'message' in error
  )
}

export const useServerErrorHandler = <T extends FieldValues>(
  form?: UseFormReturn<T, any, undefined>,
) => {
  const handleServerError = useCallback(
    (error: ServerError) => {
      if (error.type === 'toast') {
        toast.error(error.message)
      } else if (error.type === 'form' && error.field) {
        form?.setError(error.field as Path<T>, {
          message: error.message,
        })
      } else if (error.type === 'modal') {
        // TODO: Show modal
      }
    },
    [form],
  )

  return { handleServerError }
}
