import { fieldCss, Form } from 'shared/form'
import { Label } from 'shared/ui'

import { firstName as firstNameRule } from '../../model/rules'

export const FirstName = () => {
  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>First Name</Label>
      <Form.Control name="firstName" rules={firstNameRule}>
        <Form.TextField placeholder="Enter your first name" />
        <Form.ErrorMessage />
      </Form.Control>
    </div>
  )
}
