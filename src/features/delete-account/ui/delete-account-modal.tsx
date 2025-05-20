'use client'

import { useState } from 'react'

import { DeleteUser } from './delete-account'
import { DeleteUserSuccess } from './delete-account-success'

export const DeleteUserModal = () => {
  const [succeed, setSucceed] = useState(false)

  const handleSuccess = () => {
    setSucceed(true)
  }

  if (succeed) {
    return <DeleteUserSuccess />
  }

  return <DeleteUser onSucceed={handleSuccess} />
}
