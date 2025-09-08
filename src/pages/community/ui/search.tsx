'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

import { colors } from 'shared/config'
import { Slot } from 'shared/lib'
import { Icon, TextField } from 'shared/ui'

export const Search = () => {
  const t = useTranslations('feed-list')

  const router = useRouter()
  const pathname = usePathname()
  const isBusiness = pathname?.includes('business')
  const searchParams = useSearchParams()
  const searchParam = searchParams?.get('search') ?? ''

  const [search, setSearch] = useState(searchParam)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const params = search ? `?search=${search}` : ''
      router.push(
        isBusiness ? `/business/community${params}` : `/community${params}`,
      )
    }
  }

  useEffect(() => {
    setSearch(searchParam)
  }, [searchParam])

  return (
    <TextField
      value={search}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className="mx-auto mb-10 w-[530px]"
      placeholder={t('search.placeholder')}
    >
      <Slot name="left">
        <Icon name="Search" size="large" color={colors.gray[700]} />
      </Slot>
    </TextField>
  )
}
