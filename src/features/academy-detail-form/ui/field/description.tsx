import { useTranslations } from 'next-intl'

import { fieldCss, Form } from 'shared/form'
import { Label } from 'shared/ui'

export const Description = () => {
  const t = useTranslations('field')

  return (
    <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
      <Label required>{t('academy-description.label')}</Label>
      <Form.Control name="description">
        <Form.TextArea
          placeholder={t('academy-description.placeholder')}
          fullWidth
          className="h-[128px]"
        />
        <Form.ErrorMessage />
      </Form.Control>
    </div>
  )
}
