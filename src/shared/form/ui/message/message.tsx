'use client'

import { useTranslations } from 'next-intl'
import { get, useFormContext } from 'react-hook-form'

import { HelperText, type HelperTextProps } from 'shared/ui'

type FormErrorMessageProps = HelperTextProps & {
  name?: string
}

export const FormErrorMessage = ({
  name = '',
  className,
}: FormErrorMessageProps) => {
  const {
    formState: { errors },
  } = useFormContext()

  const t = useTranslations()

  const error = get(errors, name)

  if (!error) return null

  if (error.message.includes('validation')) {
    return (
      <HelperText variant="error" className={className}>
        {t(error.message)}
      </HelperText>
    )
  }

  return (
    <HelperText variant="error" className={className}>
      {error.message}
    </HelperText>
  )
}
