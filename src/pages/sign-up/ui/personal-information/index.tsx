import { Heading, Label } from 'shared/ui'

import { Form } from 'features/form'

import { CountrySelect } from 'widgets/country'

import * as rules from '../../model/rules'
import * as commonCss from '../../style/variants'

import * as css from './variants'

export const PersonalInformation = () => {
  return (
    <div className="mb-10">
      <Heading as="h3" size="medium" className="mb-6">
        Personal information
      </Heading>

      <div>
        <div className={commonCss.fieldWrapper()}>
          <Label required>First Name</Label>
          <Form.Control name="firstName" rules={rules.firstName}>
            <Form.TextField placeholder="Enter your first name" />
            <Form.ErrorMessage />
          </Form.Control>
        </div>

        <div className={commonCss.fieldWrapper()}>
          <Label required>Last Name</Label>
          <Form.Control name="lastName" rules={rules.lastName}>
            <Form.TextField placeholder="Enter your last name" />
            <Form.ErrorMessage />
          </Form.Control>
        </div>

        <div className={commonCss.fieldWrapper()}>
          <Label required>Nationality</Label>
          <Form.Control name="countryId" rules={rules.country}>
            <CountrySelect />
            <Form.ErrorMessage />
          </Form.Control>
        </div>

        <div className={commonCss.fieldWrapper()}>
          <Label required>Gender</Label>
          <Form.Control name="genderType">
            <Form.RadioGroup className={css.radioFieldWrapper()}>
              <Form.Radio label="Female" value="FEMALE" />
              <Form.Radio label="Male" value="MALE" />
            </Form.RadioGroup>
          </Form.Control>
        </div>

        <div className={commonCss.fieldWrapper()}>
          <Label required>Birth</Label>
          <Form.Control name="birthDate" rules={rules.birthDate}>
            <Form.DatePicker placeholder="Choose your birth" />
            <Form.ErrorMessage />
          </Form.Control>
        </div>
      </div>
    </div>
  )
}
