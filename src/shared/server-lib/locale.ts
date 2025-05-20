'use server'

import { cookies, headers } from 'next/headers'

import {
  Locale,
  defaultTeacherLocale,
  defaultBusinessLocale,
} from 'shared/config/internationalization'

const TEACHER_COOKIE_NAME = 'NEXT_TEACHER_LOCALE'
const BUSINESS_COOKIE_NAME = 'NEXT_BUSINESS_LOCALE'

const isBusinessPath = async () => {
  const headersList = await headers()
  // next-url 헤더 사용
  const pathname = headersList.get('x-pathname') || ''

  return pathname.startsWith('/business')
}

export const getLocale = async () => {
  if (await isBusinessPath()) {
    return getBusinessLocale()
  } else {
    return getTeacherLocale()
  }
}

export const setLocale = async (locale: Locale) => {
  if (await isBusinessPath()) {
    await setBusinessLocale(locale)
  } else {
    await setTeacherLocale(locale)
  }
}

export const getTeacherLocale = async () => {
  return (
    (await cookies()).get(TEACHER_COOKIE_NAME)?.value || defaultTeacherLocale
  )
}

export const setTeacherLocale = async (locale: Locale) => {
  ;(await cookies()).set(TEACHER_COOKIE_NAME, locale)
}

export async function getBusinessLocale() {
  return (
    (await cookies()).get(BUSINESS_COOKIE_NAME)?.value || defaultBusinessLocale
  )
}

export async function setBusinessLocale(locale: Locale) {
  ;(await cookies()).set(BUSINESS_COOKIE_NAME, locale)
}
