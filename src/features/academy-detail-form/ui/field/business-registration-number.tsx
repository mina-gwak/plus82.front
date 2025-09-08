import { useTranslations } from 'next-intl'

import { fieldCss, Form } from 'shared/form'
import { Label } from 'shared/ui'

export const BusinessRegistrationNumber = () => {
  const t = useTranslations()

  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>{t('field.business-registration-number.label')}</Label>
      <Form.Control name="businessRegistrationNumber">
        <Form.TextField
          placeholder={t('field.business-registration-number.placeholder')}
          fullWidth
          readOnly
          className="bg-gray-100"
        />
        <Form.ErrorMessage />
      </Form.Control>
    </div>
  )
}
