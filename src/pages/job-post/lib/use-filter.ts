import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { JobPostFilter } from 'features/job-post-filter'
import { convertToSearchParams } from 'shared/lib'

type Props = {
  syncWithURL?: boolean
  url?: string
}

export const useFilter = ({ syncWithURL = false, url }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const defaultFilters = {
    locations: searchParams?.get('locations')?.split(',').filter(Boolean) || [],
    studentTypes:
      searchParams?.get('studentTypes')?.split(',').filter(Boolean) || [],
    searchText: searchParams?.get('searchText') || '',
  }

  const [filters, setFilters] = useState<JobPostFilter | null>(
    syncWithURL ? defaultFilters : null,
  )

  useEffect(() => {
    if (!syncWithURL) return

    const queryString = convertToSearchParams(filters)
    router.replace(`${url}${queryString ? `?${queryString}` : ''}`)
  }, [filters, router, syncWithURL, url])

  return { filters, setFilters }
}
