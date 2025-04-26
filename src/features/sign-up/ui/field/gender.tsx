import { useTranslations } from 'next-intl'

import { fieldCss, Form } from 'shared/form'
import { Label } from 'shared/ui'

export const Gender = () => {
  const t = useTranslations()

  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>{t('field.gender.label')}</Label>
      <Form.Control name="genderType">
        <Form.RadioGroup className={fieldCss.radioFieldWrapper()}>
          <Form.Radio label={t('field.gender.option.female')} value="FEMALE" />
          <Form.Radio label={t('field.gender.option.male')} value="MALE" />
        </Form.RadioGroup>
      </Form.Control>
    </div>
  )
}
