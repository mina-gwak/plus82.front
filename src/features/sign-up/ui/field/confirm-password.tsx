import { useTranslations } from 'next-intl'

import { fieldCss, Form } from 'shared/form'
import { Label } from 'shared/ui'

import { confirmPassword as confirmPasswordRule } from '../../model/rules'

export const ConfirmPassword = () => {
  const t = useTranslations()

  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>{t('field.confirm-password.label')}</Label>
      <Form.Control name="confirmPassword" rules={confirmPasswordRule}>
        <Form.PasswordField
          placeholder={t('field.confirm-password.placeholder')}
          autoComplete="one-time-code"
          showToggle
        />
        <Form.ErrorMessage />
      </Form.Control>
    </div>
  )
}
