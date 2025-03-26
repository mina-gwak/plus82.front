import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { startTransition } from 'react'

import { signOutWithForm } from 'entities/auth'
import { colors, type Locale } from 'shared/config'
import { useDropdown } from 'shared/lib'
import { setUserLocale } from 'shared/server-lib/locale'

import { Dropdown } from '../dropdown'
import { Icon } from '../icon'

export const UserButton = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const locale = useLocale()

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
    router.push('/setting/my-page')
    close()
  }

  const handleSignOutClick = async () => {
    queryClient.removeQueries()

    await signOutWithForm()
    await signOut({ redirect: false })

    router.push('/')
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
      setUserLocale(locale)
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
          <Dropdown.Item onClick={handleMyPageClick}>My Page</Dropdown.Item>
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
          <Dropdown.Item onClick={handleSignOutClick}>Sign Out</Dropdown.Item>
        </Dropdown>
      )}
    </div>
  )
}
