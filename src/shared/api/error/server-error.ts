import { useCallback } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { toast } from 'react-toastify'

// 더 상세한 필드 에러 타입
type FieldError = {
  message: string
  type?: 'required' | 'pattern' | 'validate' | 'custom'
  code?: string
}

type FieldErrors = Record<string, FieldError | string>

export type ServerError =
  | { type: 'toast'; message: string; error?: unknown }
  | { type: 'form'; errors: FieldErrors; error?: unknown }
  | { type: 'modal'; message: string; error?: unknown }

const logError = (error: unknown) => {
  console.log('Error details:', error)
}

export const errorHandler = {
  toast: (message: string, error?: unknown): ServerError => {
    return { type: 'toast', message, error }
  },

  form: (errors: FieldErrors, error?: unknown): ServerError => {
    return { type: 'form', errors, error }
  },

  modal: (message: string, error?: unknown): ServerError => {
    return { type: 'modal', message, error }
  },
}

export const isServerError = (error: unknown): error is ServerError => {
  return typeof error === 'object' && error !== null && 'type' in error
}

export const useServerErrorHandler = <T extends FieldValues>(
  form?: UseFormReturn<T>,
) => {
  const handleServerError = useCallback(
    (error: ServerError) => {
      if (error.type === 'toast') {
        toast.error(error.message)
      } else if (error.type === 'form') {
        Object.entries(error.errors).forEach(([field, errorInfo]) => {
          const message =
            typeof errorInfo === 'string' ? errorInfo : errorInfo.message

          form?.setError(field as Path<T>, {
            message,
            type: typeof errorInfo === 'object' ? errorInfo.type : undefined,
          })
        })
      } else if (error.type === 'modal') {
        // TODO: Show modal
      }

      if (error.error) logError(error.error)
    },
    [form],
  )

  return { handleServerError }
}
