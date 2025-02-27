'use server'

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

export const setCookie = async (
  key: string,
  value: string,
  options?: Partial<ResponseCookie>,
) => {
  ;(await cookies()).set(key, value, options)
}

export const getCookie = async (key: string) => {
  return (await cookies()).get(key)?.value
}

export const deleteCookie = async (key: string) => {
  ;(await cookies()).delete(key)
}
