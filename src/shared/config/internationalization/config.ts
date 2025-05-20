export type Locale = (typeof locales)[number]

export const locales = ['en', 'ko'] as const
export const defaultTeacherLocale: Locale = 'en'
export const defaultBusinessLocale: Locale = 'ko'
