import { getRequestConfig } from 'next-intl/server'

import { getUserLocale } from 'shared/server-lib'

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale()

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
