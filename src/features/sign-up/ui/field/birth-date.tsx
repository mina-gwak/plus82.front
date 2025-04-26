import { useTranslations } from 'next-intl'

import { fieldCss, Form } from 'shared/form'
import { Label } from 'shared/ui'

import { birthDate as birthDateRule } from '../../model/rules'

export const BirthDate = () => {
  const t = useTranslations()

  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>{t('field.birth-date.label')}</Label>
      <Form.Control name="birthDate" rules={birthDateRule}>
        <Form.DatePicker placeholder={t('field.birth-date.placeholder')} />
        <Form.ErrorMessage />
      </Form.Control>
    </div>
  )
}
