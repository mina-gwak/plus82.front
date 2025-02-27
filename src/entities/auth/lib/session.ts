import { redirect } from 'next/navigation'

import { auth, update } from 'auth'

const getSession = async () => {
  const session = await auth()

  if (!session) {
    redirect('/sign-in')
  }

  return session
}

export { getSession, auth as getNullableSession, update as updateSession }
