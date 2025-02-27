import { CountrySelect } from 'entities/country'
import { Form, fieldCss } from 'shared/form'
import { Label } from 'shared/ui'

import * as rules from '../model/rules'

type Props = {
  className?: string
}

export const PersonalInformationForm = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className={fieldCss.fieldWrapper()}>
        <Label required>First Name</Label>
        <Form.Control name="firstName" rules={rules.firstName}>
          <Form.TextField placeholder="Enter your first name" />
          <Form.ErrorMessage />
        </Form.Control>
      </div>

      <div className={fieldCss.fieldWrapper()}>
        <Label required>Last Name</Label>
        <Form.Control name="lastName" rules={rules.lastName}>
          <Form.TextField placeholder="Enter your last name" />
          <Form.ErrorMessage />
        </Form.Control>
      </div>

      <div className={fieldCss.fieldWrapper()}>
        <Label required>Nationality</Label>
        <Form.Control name="countryId" rules={rules.country}>
          <CountrySelect />
          <Form.ErrorMessage />
        </Form.Control>
      </div>

      <div className={fieldCss.fieldWrapper()}>
        <Label required>Gender</Label>
        <Form.Control name="genderType">
          <Form.RadioGroup className={fieldCss.radioFieldWrapper()}>
            <Form.Radio label="Female" value="FEMALE" />
            <Form.Radio label="Male" value="MALE" />
          </Form.RadioGroup>
        </Form.Control>
      </div>

      <div className={fieldCss.fieldWrapper()}>
        <Label required>Birth</Label>
        <Form.Control name="birthDate" rules={rules.birthDate}>
          <Form.DatePicker placeholder="Choose your birth" />
          <Form.ErrorMessage />
        </Form.Control>
      </div>
    </div>
  )
}
