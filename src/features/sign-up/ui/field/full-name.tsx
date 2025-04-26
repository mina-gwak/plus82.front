import { useTranslations } from 'next-intl'

import { fieldCss, Form } from 'shared/form'
import { Label } from 'shared/ui'

import { fullName as fullNameRule } from '../../model/rules'

export const FullName = () => {
  const t = useTranslations()

  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>{t('field.full-name.label')}</Label>
      <Form.Control name="fullName" rules={fullNameRule}>
        <Form.TextField placeholder={t('field.full-name.placeholder')} />
        <Form.ErrorMessage />
      </Form.Control>
    </div>
  )
}
