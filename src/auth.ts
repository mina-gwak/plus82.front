import NextAuth from 'next-auth'

import { authConfig } from './auth-config'

const {
  signIn: teacherSignIn,
  signOut: teacherSignOut,
  handlers: teacherHandlers,
  auth: getTeacherSession,
  unstable_update: updateTeacherSession,
} = NextAuth({
  ...authConfig('teacher', '/api/auth'),
  pages: {
    signIn: '/sign-in',
  },
})

const {
  signIn: businessSignIn,
  signOut: businessSignOut,
  handlers: businessHandlers,
  auth: getBusinessSession,
  unstable_update: updateBusinessSession,
} = NextAuth({
  ...authConfig('business', '/business/api/auth'),
  pages: {
    signIn: '/business/sign-in',
  },
})

export {
  teacherSignIn,
  teacherSignOut,
  teacherHandlers,
  getTeacherSession,
  updateTeacherSession,
  businessSignIn,
  businessSignOut,
  businessHandlers,
  getBusinessSession,
  updateBusinessSession,
}
