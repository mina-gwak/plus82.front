'use client'

import { useTranslations } from 'next-intl'

import { isEmptyString } from 'shared/lib'
import { HelperText } from 'shared/ui'

import {
  hasLowercaseAndUppercaseLetter,
  hasNumber,
  hasSpecialChar,
  isCorrectLength,
} from '../model/password'

type Props = {
  password: string
}

export const PasswordValidation = ({ password }: Props) => {
  const t = useTranslations('validation')
  const checkPasswordCondition = (condition: (value: string) => boolean) => {
    if (isEmptyString(password)) return 'default'
    if (condition(password)) return 'success'

    return 'error'
  }

  return (
    <div className="flex flex-col gap-2">
      <HelperText hasIcon variant={checkPasswordCondition(isCorrectLength)}>
        {t('password.length')}
      </HelperText>
      <HelperText
        hasIcon
        variant={checkPasswordCondition(hasLowercaseAndUppercaseLetter)}
      >
        {t('password.has-lowercase-and-uppercase-letter')}
      </HelperText>
      <HelperText hasIcon variant={checkPasswordCondition(hasNumber)}>
        {t('password.has-number')}
      </HelperText>
      <HelperText hasIcon variant={checkPasswordCondition(hasSpecialChar)}>
        {t('password.has-special-char')}
      </HelperText>
    </div>
  )
}
