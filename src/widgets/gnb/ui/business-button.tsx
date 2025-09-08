import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import { startTransition } from 'react'

import { businessSignOut } from 'entities/auth'
import { colors, type Locale } from 'shared/config'
import { useDropdown } from 'shared/lib'
import { setLocale } from 'shared/server-lib'
import { Dropdown, Icon } from 'shared/ui'

export const BusinessButton = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const locale = useLocale()
  const t = useTranslations()

  const isDev = process.env.NODE_ENV === 'development'

  const { isOpen, toggleIsOpen, close, dropdownRef } = useDropdown()
  const {
    isOpen: isSubMenuOpen,
    open: openSubMenu,
    close: closeSubMenu,
    dropdownRef: dropdownRefSubMenu,
  } = useDropdown()

  const handleClick = () => {
    toggleIsOpen()
  }

  const handleMyPageClick = () => {
    router.push('/business/setting/my-academy')
    close()
  }

  const handleSignOutClick = async () => {
    await businessSignOut()
    await signOut({ redirect: false })

    router.push('/business')

    queryClient.removeQueries()
    close()
  }

  const handleMouseEnter = () => {
    openSubMenu()
  }

  const handleMouseLeave = () => {
    closeSubMenu()
  }

  const handleLanguageClick = (value: Locale) => () => {
    const locale = value as Locale

    startTransition(() => {
      setLocale(locale)
    })

    close()
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300"
        onClick={handleClick}
      >
        <Icon
          name="User"
          size="medium"
          color={colors.gray[700]}
          className="relative -top-px"
        />
      </button>
      {isOpen && (
        <Dropdown
          className="w-[140px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]"
          scrollable={false}
        >
          <Dropdown.Item onClick={handleMyPageClick}>
            {t('dropdown.my-page')}
          </Dropdown.Item>
          {isDev && (
            <Dropdown.Item
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <div className="h-full w-full" ref={dropdownRefSubMenu}>
                Language
                {isSubMenuOpen && (
                  <Dropdown className="absolute -top-1 left-[90%] w-[140px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]">
                    <Dropdown.Item
                      selected={locale === 'en'}
                      onClick={handleLanguageClick('en')}
                    >
                      English
                    </Dropdown.Item>
                    <Dropdown.Item
                      selected={locale === 'ko'}
                      onClick={handleLanguageClick('ko')}
                    >
                      Korean
                    </Dropdown.Item>
                  </Dropdown>
                )}
              </div>
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={handleSignOutClick}>
            {t('dropdown.sign-out')}
          </Dropdown.Item>
        </Dropdown>
      )}
    </div>
  )
}
