import { useTranslations } from 'next-intl'

import { fieldCss, Form } from 'shared/form'
import { Label } from 'shared/ui'

import { businessRegistrationNumber as businessRegistrationNumberRule } from '../../model/rules'

export const BusinessRegistrationNumber = () => {
  const t = useTranslations()

  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>{t('field.business-registration-number.label')}</Label>
      <Form.Control
        name="businessRegistrationNumber"
        rules={businessRegistrationNumberRule}
      >
        <Form.TextField
          placeholder={t('field.business-registration-number.placeholder')}
        />
        <Form.ErrorMessage />
      </Form.Control>
    </div>
  )
}
