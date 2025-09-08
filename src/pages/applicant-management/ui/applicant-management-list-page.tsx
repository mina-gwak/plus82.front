'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { ApplicationStatus } from 'entities/job-post-resume-relation'
import { cn } from 'shared/lib'
import { Layout, Tabs, Table, Pagination } from 'shared/ui'

import { useJobPostRelations } from '../api/use-job-post-relations'

export const ApplicantManagementListPage = () => {
  const t = useTranslations('applicant-management-list')

  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(0)
  const [status, setStatus] = useState<ApplicationStatus>(
    ApplicationStatus.SUBMITTED,
  )

  const { applications, totalPages } = useJobPostRelations({
    status,
    pageNumber: currentPage,
  })

  const hasNoApplications = applications.length === 0

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected)
  }

  const handleStatusChange = (value: string) => {
    setStatus(value as ApplicationStatus)
  }

  const handleItemClick = (id: number) => () => {
    router.push(`/business/applicant-management/${id}`)
  }

  return (
    <Layout wide>
      <h1 className="display-small mb-10 text-center font-bold text-gray-900">
        {t('title')}
      </h1>
      <Tabs.Root
        defaultValue="SUBMITTED"
        className="w-full"
        onValueChange={handleStatusChange}
      >
        <Tabs.List
          size="small"
          width="full"
          variant="box"
          className="mb-4 w-[480px]"
        >
          <Tabs.Trigger value="SUBMITTED">{t('tabs.submitted')}</Tabs.Trigger>
          <Tabs.Trigger value="REVIEWED">{t('tabs.reviewed')}</Tabs.Trigger>
          <Tabs.Trigger value="ACCEPTED">{t('tabs.accepted')}</Tabs.Trigger>
          <Tabs.Trigger value="REJECTED">{t('tabs.rejected')}</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={status} className="w-full">
          <div className="mb-10 h-[584px]">
            <Table.Root className="w-full">
              <Table.Header>
                <Table.Row className={cn(hasNoApplications && 'border-none')}>
                  <Table.Head className="w-[240px]">
                    {t('table.applicant')}
                  </Table.Head>
                  <Table.Head className="w-[380px]">
                    {t('table.job-title')}
                  </Table.Head>
                  <Table.Head className="w-[300px]">
                    {t('table.memo')}
                  </Table.Head>
                  <Table.Head className="w-[140px]">
                    {t('table.application-date')}
                  </Table.Head>
                </Table.Row>
              </Table.Header>
              {(() => {
                if (hasNoApplications) {
                  return null
                }

                return (
                  <Table.Body>
                    {applications.map(application => (
                      <Table.Row
                        key={application.id}
                        onClick={handleItemClick(application.id)}
                        className="cursor-pointer"
                      >
                        <Table.Cell>
                          {(() => {
                            if (
                              application.resumeFirstName &&
                              application.resumeLastName
                            ) {
                              return (
                                <>
                                  {application.resumeFirstName}{' '}
                                  {application.resumeLastName}
                                </>
                              )
                            }

                            return '-'
                          })()}
                        </Table.Cell>
                        <Table.Cell>{application.jobPostTitle}</Table.Cell>
                        <Table.Cell>
                          {application?.academyMemo ?? '-'}
                        </Table.Cell>
                        <Table.Cell>{application.submittedDate}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                )
              })()}
            </Table.Root>
            {hasNoApplications && (
              <p className="title-large mt-20 text-center font-medium text-gray-700">
                {t('table.no-data')}
              </p>
            )}
          </div>
        </Tabs.Content>
      </Tabs.Root>
      <Pagination
        pageCount={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Layout>
  )
}
