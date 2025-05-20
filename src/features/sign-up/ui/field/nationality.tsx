import { CountrySelect } from 'entities/country'
import { fieldCss, Form } from 'shared/form'
import { Label } from 'shared/ui'

import { country as countryRule } from '../../model/rules'

export const Nationality = () => {
  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>Nationality</Label>
      <Form.Control name="countryId" rules={countryRule}>
        <CountrySelect />
        <Form.ErrorMessage />
      </Form.Control>
    </div>
  )
}
