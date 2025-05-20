import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { fieldCss, Form } from 'shared/form'
import { isEmptyString } from 'shared/lib'
import { HelperText, Label } from 'shared/ui'

import { FormValues } from '../../model/form-values'
import {
  hasLowercaseAndUppercaseLetter,
  hasNumber,
  hasSpecialChar,
  isCorrectLength,
  password as passwordRule,
} from '../../model/rules'

export const Password = () => {
  const t = useTranslations()

  const { control } = useFormContext<FormValues>()

  const password = useWatch({
    name: 'password',
    control,
  })

  const checkPasswordCondition = (condition: (value: string) => boolean) => {
    if (isEmptyString(password)) return 'default'
    if (condition(password)) return 'success'

    return 'error'
  }

  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>{t('field.password.label')}</Label>
      <div className={fieldCss.passwordFieldWrapper()}>
        <Form.PasswordField
          name="password"
          rules={passwordRule}
          placeholder={t('field.password.placeholder')}
          autoComplete="one-time-code"
          showToggle
        />
        <HelperText hasIcon variant={checkPasswordCondition(isCorrectLength)}>
          {t('validation.password.length')}
        </HelperText>
        <HelperText
          hasIcon
          variant={checkPasswordCondition(hasLowercaseAndUppercaseLetter)}
        >
          {t('validation.password.has-lowercase-and-uppercase-letter')}
        </HelperText>
        <HelperText hasIcon variant={checkPasswordCondition(hasNumber)}>
          {t('validation.password.has-number')}
        </HelperText>
        <HelperText hasIcon variant={checkPasswordCondition(hasSpecialChar)}>
          {t('validation.password.has-special-char')}
        </HelperText>
      </div>
    </div>
  )
}
