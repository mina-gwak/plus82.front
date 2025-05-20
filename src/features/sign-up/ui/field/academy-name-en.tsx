import { useTranslations } from 'next-intl'

import { fieldCss, Form } from 'shared/form'
import { Label } from 'shared/ui'

import { academyNameEn as academyNameEnRule } from '../../model/rules'

export const AcademyNameEn = () => {
  const t = useTranslations()

  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>{t('field.academy-name-en.label')}</Label>
      <Form.Control name="academyNameEn" rules={academyNameEnRule}>
        <Form.TextField placeholder={t('field.academy-name-en.placeholder')} />
        <Form.ErrorMessage />
      </Form.Control>
    </div>
  )
}
