import { fieldCss, Form } from 'shared/form'
import { Label } from 'shared/ui'

import { lastName as lastNameRule } from '../../model/rules'

export const LastName = () => {
  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>Last Name</Label>
      <Form.Control name="lastName" rules={lastNameRule}>
        <Form.TextField placeholder="Enter your last name" />
        <Form.ErrorMessage />
      </Form.Control>
    </div>
  )
}
