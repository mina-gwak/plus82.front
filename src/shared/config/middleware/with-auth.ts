import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import { match } from 'path-to-regexp'

import { getTeacherSession } from 'auth'

import { MiddlewareFactory } from './type'

const matchersForAuth = ['/setting/*path']
const matchersForSignIn = ['/sign-up', '/sign-in']

export const withAuth: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // 인증이 필요한 페이지
    if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
      return (await getTeacherSession())
        ? next(request, _next)
        : NextResponse.redirect(new URL('/sign-in', request.url))
    }

    // 인증 후 회원가입 및 로그인 접근 제어
    if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
      return (await getTeacherSession()) // 세션 정보 확인
        ? NextResponse.redirect(new URL('/', request.url))
        : next(request, _next)
    }

    return next(request, _next)
  }
}

const isMatch = (pathname: string, urls: string[]) => {
  return urls.some(url => !!match(url)(pathname))
}
