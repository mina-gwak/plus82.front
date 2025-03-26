import { useTranslations } from 'next-intl'
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
  | { type: 'toast'; message: string; error?: unknown; translate?: boolean }
  | { type: 'form'; errors: FieldErrors; error?: unknown; translate?: boolean }
  | { type: 'modal'; message: string; error?: unknown; translate?: boolean }

const logError = (error: unknown) => {
  console.log('Error details:', error)
}

export const errorHandler = {
  toast: (
    message: string,
    { error, translate = false }: { error?: unknown; translate?: boolean } = {},
  ): ServerError => {
    return { type: 'toast', message, error, translate }
  },

  form: (
    errors: FieldErrors,
    { error, translate = false }: { error?: unknown; translate?: boolean } = {},
  ): ServerError => {
    return { type: 'form', errors, error, translate }
  },

  modal: (
    message: string,
    { error, translate = false }: { error?: unknown; translate?: boolean } = {},
  ): ServerError => {
    return { type: 'modal', message, error, translate }
  },
}

export const isServerError = (error: unknown): error is ServerError => {
  return typeof error === 'object' && error !== null && 'type' in error
}

export const useServerErrorHandler = <T extends FieldValues>(
  form?: UseFormReturn<T>,
) => {
  const t = useTranslations()

  const handleServerError = useCallback(
    (error: ServerError) => {
      if (error.type === 'toast') {
        toast.error(error.translate ? t(error.message) : error.message)
      } else if (error.type === 'form') {
        Object.entries(error.errors).forEach(([field, errorInfo]) => {
          const message =
            typeof errorInfo === 'string' ? errorInfo : errorInfo.message

          form?.setError(field as Path<T>, {
            message: error.translate ? t(message) : message,
            type: typeof errorInfo === 'object' ? errorInfo.type : undefined,
          })
        })
      } else if (error.type === 'modal') {
        // TODO: Show modal
      }

      if (error.error) logError(error.error)
    },
    [form, t],
  )

  return { handleServerError }
}
