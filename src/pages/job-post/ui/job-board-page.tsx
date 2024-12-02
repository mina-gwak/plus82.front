'use client'

import { Suspense } from 'react'

import { EmptyBoundary } from 'shared/api'
import { Layout } from 'shared/ui'

import { JobPostFilters } from 'features/job-post-filter/ui/job-post-filters'

import { useFilter } from '../lib/use-filter'

import { JobListSkeleton } from './job-list-skeleton'
import { JobPosting } from './job-posting'
import { NoJobPosting } from './no-job-posting'

export const JobBoardPage = () => {
  const { filters, setFilters } = useFilter({
    syncWithURL: true,
    url: '/job-board',
  })

  return (
    <Layout wide>
      <JobPostFilters
        defaultFilters={filters}
        useSearchField
        onChange={setFilters}
      />
      <EmptyBoundary trigger={filters} fallback={<NoJobPosting />}>
        <Suspense fallback={<JobListSkeleton />}>
          <JobPosting filters={filters} />
        </Suspense>
      </EmptyBoundary>
    </Layout>
  )
}
