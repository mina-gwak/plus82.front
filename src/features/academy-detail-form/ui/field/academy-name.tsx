import { useTranslations } from 'next-intl'

import { fieldCss, Form } from 'shared/form'
import { Label } from 'shared/ui'

import { academyName as academyNameRule } from '../../model/rules'

export const AcademyName = () => {
  const t = useTranslations()

  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>{t('field.academy-name.label')}</Label>
      <Form.Control name="name" rules={academyNameRule}>
        <Form.TextField
          placeholder={t('field.academy-name.placeholder')}
          fullWidth
        />
        <Form.ErrorMessage />
      </Form.Control>
    </div>
  )
}
