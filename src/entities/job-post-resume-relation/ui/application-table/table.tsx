import { capitalize, isNil } from 'lodash-es'
import Link from 'next/link'
import { Children, PropsWithChildren } from 'react'

import { formatDate } from 'shared/lib'

import { ApplicationTableSkeleton } from './skeleton'
import { JobPostRelation } from '../../model/application'

const TableRoot = ({ children }: PropsWithChildren) => (
  <div className="flex w-full flex-col gap-2">{children}</div>
)

const Header = () => (
  <ul className="body-medium flex rounded-lg bg-gray-100 py-4 pl-5">
    <li className="w-[180px] text-gray-700">Name of academy</li>
    <li className="w-[314px] text-gray-700">Job Title</li>
    <li className="w-[140px] text-gray-700">Submission Date</li>
    <li className="w-[90px] text-gray-700">Status</li>
  </ul>
)

const Body = ({ children }: PropsWithChildren) => {
  if (isNil(children)) {
    return <ApplicationTableSkeleton />
  }

  if (!Children.count(children)) {
    return (
      <p className="title-large flex h-[160px] items-center justify-center text-gray-700">
        You don&apos;t have a history of applying
      </p>
    )
  }

  return <div className="divide-y divide-gray-300">{children}</div>
}

const Row = ({ application }: { application: JobPostRelation }) => (
  <Link
    href={`/job-board/${application.jobPostId}`}
    key={application.id}
    className="body-medium flex py-4 pl-5 text-gray-900 hover:bg-gray-50"
  >
    <div className="w-[180px] truncate">{application.academyName}</div>
    <div className="w-[314px] truncate">{application.jobPostTitle}</div>
    <div className="w-[140px]">{formatDate(application.submittedDate)}</div>
    <div className="w-[90px]">{capitalize(application.status)}</div>
  </Link>
)

const Table = Object.assign(TableRoot, {
  Header: Header,
  Body: Body,
  Row: Row,
})

export { Table }
