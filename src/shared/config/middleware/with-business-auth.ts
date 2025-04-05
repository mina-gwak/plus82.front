import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import { match } from 'path-to-regexp'

import { getBusinessSession } from 'auth'

import { MiddlewareFactory } from './type'

const matchersForAuth = ['/business/setting/*path']
const matchersForSignIn = ['/business/sign-up', '/business/sign-in']

export const withBusinessAuth: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // 인증이 필요한 페이지
    if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
      return (await getBusinessSession())
        ? next(request, _next)
        : NextResponse.redirect(new URL('/business/sign-in', request.url))
    }

    // 인증 후 회원가입 및 로그인 접근 제어
    if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
      return (await getBusinessSession()) // 세션 정보 확인
        ? NextResponse.redirect(new URL('/business', request.url))
        : next(request, _next)
    }

    return next(request, _next)
  }
}

const isMatch = (pathname: string, urls: string[]) => {
  return urls.some(url => !!match(url)(pathname))
}
