'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { ApplicationStatus } from 'entities/job-post-resume-relation'
import { CopyJobPostingButton } from 'features/copy-job-posting'
import { PreviewJobPostingButton } from 'features/preview-job-posting'
import { cn, formatDate } from 'shared/lib'
import { Layout, Tabs, Table, Pagination, Button } from 'shared/ui'

import { useJobPostRelations } from '../api/use-job-post-relations'

type Props = {
  title: string
  jobPostId: number
  isExpired: boolean
}

export const JobPostApplicantManagementListPage = ({
  title,
  jobPostId,
  isExpired,
}: Props) => {
  const t = useTranslations('applicant-management-list')

  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(0)
  const [status, setStatus] = useState<ApplicationStatus>(
    ApplicationStatus.SUBMITTED,
  )

  const { applications, totalPages } = useJobPostRelations({
    status,
    pageNumber: currentPage,
    jobPostId: Number(jobPostId),
  })

  const hasNoApplications = applications.length === 0

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected)
  }

  const handleStatusChange = (value: string) => {
    setStatus(value as ApplicationStatus)
  }

  const handleItemClick = (id: number) => () => {
    router.push(`/business/job-posting/${jobPostId}/applicant-management/${id}`)
  }

  const handleEditButtonClick = () => {
    router.push(`/business/job-posting/${jobPostId}/update`)
  }

  const handleCopySuccess = () => {
    router.push(`/business/job-posting`)
  }

  return (
    <Layout wide>
      <h1 className="title-large mb-6 font-bold text-gray-900">{title}</h1>
      <Tabs.Root
        defaultValue="SUBMITTED"
        className="w-full"
        onValueChange={handleStatusChange}
      >
        <div className="flex items-end justify-between">
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
          <div className="mb-4 flex gap-2">
            <Button
              variant="lined"
              size="small"
              onClick={handleEditButtonClick}
              disabled={isExpired}
            >
              <Button.Icon name="Pen" />
              {t('button.edit')}
            </Button>
            <CopyJobPostingButton
              type="button"
              jobPostId={jobPostId}
              onSuccess={handleCopySuccess}
            />
            <PreviewJobPostingButton type="button" jobPostId={jobPostId} />
          </div>
        </div>
        <Tabs.Content value={status} className="w-full">
          <div className="mb-10 h-[584px]">
            <Table.Root className="w-full">
              <Table.Header>
                <Table.Row className={cn(hasNoApplications && 'border-none')}>
                  <Table.Head className="w-[240px]">
                    {t('table.applicant')}
                  </Table.Head>
                  <Table.Head className="w-[380px]">
                    {t('table.nationality')}
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
                          {application.resumeFirstName}{' '}
                          {application.resumeLastName}
                        </Table.Cell>
                        <Table.Cell>
                          {application?.countryNameEn ?? '-'}
                        </Table.Cell>
                        <Table.Cell>
                          {application?.academyMemo ?? '-'}
                        </Table.Cell>
                        <Table.Cell>
                          {formatDate(application.submittedDate)}
                        </Table.Cell>
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
