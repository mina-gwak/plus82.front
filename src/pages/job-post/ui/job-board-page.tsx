'use client'

import { Suspense } from 'react'

import { JobPostFilters } from 'features/job-post-filter'
import { EmptyBoundary } from 'shared/api'
import { Layout } from 'shared/ui'

import { JobListSkeleton } from './job-list-skeleton'
import { JobPosting } from './job-posting'
import { NoJobPosting } from './no-job-posting'
import { useFilter } from '../lib/use-filter'

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
