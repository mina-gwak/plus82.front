'use client'

import { isEmptyString } from 'shared/lib'
import { HelperText } from 'shared/ui'

import {
  hasLowercaseAndUppercaseLetter,
  hasNumber,
  hasSpecialChar,
  isCorrectLength,
} from '../model/password'

type Props = {
  password: string
}

export const PasswordValidation = ({ password }: Props) => {
  const checkPasswordCondition = (condition: (value: string) => boolean) => {
    if (isEmptyString(password)) return 'default'
    if (condition(password)) return 'success'

    return 'error'
  }

  return (
    <div className="flex flex-col gap-2">
      <HelperText hasIcon variant={checkPasswordCondition(isCorrectLength)}>
        9 ~ 28 characters long
      </HelperText>
      <HelperText
        hasIcon
        variant={checkPasswordCondition(hasLowercaseAndUppercaseLetter)}
      >
        Upper & lower case letters
      </HelperText>
      <HelperText hasIcon variant={checkPasswordCondition(hasNumber)}>
        At least one number
      </HelperText>
      <HelperText hasIcon variant={checkPasswordCondition(hasSpecialChar)}>
        At least special character
      </HelperText>
    </div>
  )
}
