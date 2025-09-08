import { useTranslations } from 'next-intl'

import { fieldCss, Form } from 'shared/form'
import { Label } from 'shared/ui'

import { representativeName as representativeNameRule } from '../../model/rules'

export const RepresentativeName = () => {
  const t = useTranslations()

  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>{t('field.representative-name.label')}</Label>
      <Form.Control name="representativeName" rules={representativeNameRule}>
        <Form.TextField
          placeholder={t('field.representative-name.placeholder')}
          fullWidth
        />
        <Form.ErrorMessage />
      </Form.Control>
    </div>
  )
}
