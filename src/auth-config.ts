import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import {
  signIn as _signIn,
  refreshToken,
  type SignInRequest,
  decodeToken,
} from 'entities/auth'
import { HttpError, isServerError } from 'shared/api'

const ACCESS_TOKEN_REFRESH_THRESHOLD = 600000 // 10분을 밀리초로 표현
export const REFRESH_TOKEN_ERROR = 'RefreshTokenError'

export const authConfig = (name: string, basePath: string) =>
  ({
    debug: process.env.NODE_ENV !== 'production',
    cookies: {
      sessionToken: {
        name: `${name}.authjs.session.token`,
      },
      pkceCodeVerifier: {
        name: `${name}.authjs.pkce.code_verifier`,
      },
      callbackUrl: {
        name: `${name}.authjs.callback-url`,
      },
      csrfToken: {
        name: `${name}.authjs.csrf-token`,
      },
      state: {
        name: `${name}.authjs.state`,
      },
      nonce: {
        name: `${name}.authjs.nonce`,
      },
      webauthnChallenge: {
        name: `${name}.authjs.challenge`,
      },
    },
    providers: [
      Credentials({
        name: 'Business Credentials',
        authorize: async credentials => {
          const userInfo = credentials as unknown as SignInRequest

          const response = await _signIn(userInfo)

          const decodedToken = decodeToken(response.accessToken)

          if (decodedToken.valid) {
            if (
              name === 'business' &&
              decodedToken.decoded.role !== 'ACADEMY'
            ) {
              throw new HttpError({
                code: 'NOT_ACADEMY_ROLE',
                message: '학원 권한이 없습니다.',
                status: 403,
              })
            }

            if (name === 'teacher' && decodedToken.decoded.role !== 'TEACHER') {
              throw new HttpError({
                code: 'NOT_TEACHER_ROLE',
                message: '선생님 권한이 없습니다.',
                status: 403,
              })
            }

            return response
          }

          return response
        },
      }),
    ],
    session: {
      strategy: 'jwt', // JSON Web Token 사용
      maxAge: 60 * 60 * 24 * 7, // 세션 만료 시간(sec) : 7일
    },
    callbacks: {
      jwt: async ({
        token, // JWT에 저장된 데이터
        user, // authorize 콜백에서 반환된 정보, trigger = 'signIn' | 'signUp'
        // trigger, // 콜백이 호출된 이유, 'signIn' | 'signUp' | 'update'
        // session, // 업데이트된 세션 정보, trigger = 'update'
      }) => {
        // user 객체 X : 단순 세션 조회를 위한 요청
        // user 객체 O : 로그인 시도
        if (user) {
          return {
            ...token,
            accessToken: user.accessToken,
            accessTokenExpiresAt: user.accessTokenExpiresAt,
            refreshToken: user.refreshToken,
            refreshTokenExpiresAt: user.refreshTokenExpiresAt,
          }
        } else if (
          token.accessTokenExpiresAt &&
          Date.now() <
            Number(token.accessTokenExpiresAt) - ACCESS_TOKEN_REFRESH_THRESHOLD
        ) {
          return token
        } else {
          if (!token.refreshToken) {
            token.error = REFRESH_TOKEN_ERROR

            return token
          }

          const newToken = await refreshToken(token.refreshToken as string)

          if (isServerError(newToken)) {
            token.error = REFRESH_TOKEN_ERROR

            return token
          }

          return {
            ...token,
            accessToken: newToken.accessToken,
            accessTokenExpiresAt: newToken.accessTokenExpiresAt,
            refreshToken: newToken.refreshToken,
            refreshTokenExpiresAt: newToken.refreshTokenExpiresAt,
          }
        }
      },
      session: ({ session, token }) => {
        if (token.accessToken) {
          Object.assign(session, {
            accessToken: token.accessToken,
            error: token?.error,
            isExpired: false,
          })
        }

        return session
      },
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith('/')) return `${baseUrl}${url}`

        // MSW 관련 URL 필터링
        if (url.includes('mockServiceWorker.js')) {
          return baseUrl
        }

        // Allows callback URLs on the same origin
        if (new URL(url).origin === baseUrl) return url

        return baseUrl
      },
    },
    basePath,
  }) satisfies NextAuthConfig
