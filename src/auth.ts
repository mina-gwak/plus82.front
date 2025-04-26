import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import type { SignInRequest, AcademySignInRequest } from 'entities/auth'
import { signIn as _signIn, academySignIn } from 'entities/auth'

import { authConfig } from './auth-config'

const {
  signIn: teacherSignIn,
  signOut: teacherSignOut,
  handlers: teacherHandlers,
  auth: getTeacherSession,
  unstable_update: updateTeacherSession,
} = NextAuth({
  ...authConfig('teacher', '/api/auth'),
  providers: [
    Credentials({
      name: 'Teacher Credentials',
      authorize: async credentials => {
        const userInfo = credentials as unknown as SignInRequest

        const response = await _signIn(userInfo)

        return response
      },
    }),
  ],
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
  providers: [
    Credentials({
      name: 'Business Credentials',
      authorize: async credentials => {
        const userInfo = credentials as unknown as AcademySignInRequest

        const response = await academySignIn(userInfo)

        return response
      },
    }),
  ],
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
