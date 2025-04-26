'use client'

import { Email, Password, ConfirmPassword } from 'features/sign-up'
import { Heading } from 'shared/ui'

export const Account = () => {
  return (
    <div className="mb-[50px]">
      <Heading as="h3" size="medium" className="mb-6">
        Account
      </Heading>

      <div>
        <Email />
        <Password />
        <ConfirmPassword />
      </div>
    </div>
  )
}
