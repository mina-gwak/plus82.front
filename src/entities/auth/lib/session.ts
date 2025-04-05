import { redirect } from 'next/navigation'

import {
  getTeacherSession as _getTeacherSession,
  updateTeacherSession,
  getBusinessSession as _getBusinessSession,
  updateBusinessSession,
} from 'auth'

const getTeacherSession = async () => {
  const session = await _getTeacherSession()

  if (!session) {
    redirect('/sign-in')
  }

  return session
}

const getBusinessSession = async () => {
  const session = await _getBusinessSession()

  if (!session) {
    redirect('/business/sign-in')
  }

  return session
}

export {
  getTeacherSession,
  _getTeacherSession as getNullableTeacherSession,
  updateTeacherSession,
  getBusinessSession,
  _getBusinessSession as getNullableBusinessSession,
  updateBusinessSession,
}
