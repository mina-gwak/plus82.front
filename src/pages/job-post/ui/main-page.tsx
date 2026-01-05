'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Suspense } from 'react'

import { JobPostFilters } from 'features/job-post-filter'
import { EmptyBoundary } from 'shared/api'
import { Button, Layout } from 'shared/ui'

import { ClosingSoon } from './closing-soon'
import { JobListSkeleton } from './job-list-skeleton'
import { JobPosting } from './job-posting'
import { NoClosingJob } from './no-closing-job'
import { NoJobPosting } from './no-job-posting'
import { useFilter } from '../lib/use-filter'

export const MainPage = () => {
  const { filters, setFilters } = useFilter({ syncWithURL: false })
  const session = useSession()
  const router = useRouter()

  const isAuthenticated = session.status === 'authenticated'

  const handleRegisterResumeButtonClick = () => {
    if (isAuthenticated) {
      router.push('/setting/resume')
    } else {
      router.push('/sign-in')
    }
  }

  return (
    <Layout wide>
      <div className="mb-10 flex h-[260px] w-full items-center gap-[158px] rounded-3xl bg-blue-100">
        <div className="ml-[120px]">
          <h2 className="display-small mb-5 font-medium text-gray-900">
            Upload your resume and
            <br />
            start getting offers from academies!
          </h2>
          <Button onClick={handleRegisterResumeButtonClick}>
            Register your resume
          </Button>
        </div>
        <div className="mb-10">
          <Image
            src="/images/resume.svg"
            width={206}
            height={206}
            alt="Resume"
          />
        </div>
      </div>
      <section className="mb-20">
        <h2 className="display-small mb-6 text-gray-900">Closing soon</h2>
        <EmptyBoundary fallback={<NoClosingJob />}>
          <Suspense fallback={<JobListSkeleton />}>
            <ClosingSoon />
          </Suspense>
        </EmptyBoundary>
      </section>
      <section>
        <h2 className="display-small mb-4 text-gray-900">Job posting</h2>
        <JobPostFilters onChange={setFilters} />
        <EmptyBoundary trigger={filters} fallback={<NoJobPosting />}>
          <Suspense fallback={<JobListSkeleton />}>
            <JobPosting filters={filters} />
          </Suspense>
        </EmptyBoundary>
      </section>
    </Layout>
  )
}
