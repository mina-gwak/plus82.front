import { NextFetchEvent, NextRequest } from 'next/server'

import { MiddlewareFactory } from './type'

export const withHeader: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const response = await next(request, _next)

    response?.headers.set('x-pathname', request.nextUrl.pathname)

    return response
  }
}
