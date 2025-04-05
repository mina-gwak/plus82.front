import { getRequestConfig } from 'next-intl/server'

import { getLocale } from 'shared/server-lib'

export default getRequestConfig(async () => {
  const locale = await getLocale() // path에 따라 다른 쿠키 값 반환

  const messages = {
    ...(await import(`./locales/${locale}/gnb.json`)).default,
    ...(await import(`./locales/${locale}/auth.json`)).default,
    ...(await import(`./locales/${locale}/validation.json`)).default,
    ...(await import(`./locales/${locale}/exception.json`)).default,
  }

  return {
    locale,
    messages,
  }
})
