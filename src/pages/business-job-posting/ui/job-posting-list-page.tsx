'use client'

import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { type MouseEvent } from 'react'
import { useState } from 'react'

import { jobPostQueries } from 'entities/job-post'
import { CopyJobPostingButton } from 'features/copy-job-posting'
import { PreviewJobPostingButton } from 'features/preview-job-posting'
import { colors } from 'shared/config'
import { cn, formatCurrencyWithRule } from 'shared/lib'
import { Layout, Tabs, Table, Pagination, Icon, Button } from 'shared/ui'

import { useBusinessJobPosts } from '../api/use-business-job-posts'
import { convertJobFilterToParams, JobFilter } from '../lib/job-filter'

export const BusinessJobPostingListPage = () => {
  const t = useTranslations('job-posting-list')
  const locale = useLocale()

  const queryClient = useQueryClient()

  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(0)
  const [status, setStatus] = useState<JobFilter>(JobFilter.IN_PROGRESS)

  const { jobPosts, totalPages } = useBusinessJobPosts({
    pageNumber: currentPage,
    ...convertJobFilterToParams(status),
  })

  const hasNoJobPosts = jobPosts.length === 0

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected)
  }

  const handleStatusChange = (value: string) => {
    setStatus(value as JobFilter)
  }

  const handleItemClick = (id: number) => () => {
    if (status === JobFilter.SAVED) return

    router.push(`/business/job-posting/${id}/applicant-management`)
  }

  const handleEditButtonClick = (id: number) => (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    if (status === JobFilter.SAVED) {
      router.push(`/business/job-posting/${id}/update/draft`)
    } else {
      router.push(`/business/job-posting/${id}/update`)
    }
  }

  const handleCopySuccess = () => {
    queryClient.invalidateQueries({
      queryKey: jobPostQueries.businessLists(),
    })
  }

  return (
    <Layout wide>
      <h1 className="display-small mb-10 text-center font-bold text-gray-900">
        {t('title')}
      </h1>
      <Tabs.Root
        defaultValue={JobFilter.IN_PROGRESS}
        className="w-full"
        onValueChange={handleStatusChange}
      >
        <div className="flex justify-between">
          <Tabs.List
            size="small"
            width="full"
            variant="box"
            className="mb-4 w-[360px]"
          >
            <Tabs.Trigger value={JobFilter.IN_PROGRESS}>
              {t('tabs.in-progress')}
            </Tabs.Trigger>
            <Tabs.Trigger value={JobFilter.SAVED}>
              {t('tabs.saved')}
            </Tabs.Trigger>
            <Tabs.Trigger value={JobFilter.CLOSED}>
              {t('tabs.closed')}
            </Tabs.Trigger>
          </Tabs.List>
          <Button
            variant="lined"
            size="medium"
            as="a"
            href="/business/job-posting/create"
          >
            <Button.Icon name="Plus" />
            {t('button.register-job-posting')}
          </Button>
        </div>
        <Tabs.Content value={status} className="w-full">
          <div className="mb-10 h-[584px]">
            <Table.Root className="w-full">
              <Table.Header>
                <Table.Row className={cn(hasNoJobPosts && 'border-none')}>
                  <Table.Head className="w-[392px]">
                    {t('table.job-title')}
                  </Table.Head>
                  <Table.Head className="w-[120px]">
                    {t('table.application')}
                  </Table.Head>
                  <Table.Head className="w-[152px]">
                    {t('table.salary')}
                  </Table.Head>
                  <Table.Head className="w-[120px]">
                    {t('table.posted-date')}
                  </Table.Head>
                  <Table.Head className="w-[120px]">
                    {t('table.expiration-date')}
                  </Table.Head>
                  <Table.Head className="w-[156px]" />
                </Table.Row>
              </Table.Header>
              {(() => {
                if (hasNoJobPosts) {
                  return null
                }

                return (
                  <Table.Body>
                    {jobPosts.map(jobPost => (
                      <Table.Row
                        key={jobPost.id}
                        onClick={handleItemClick(jobPost.id)}
                        className={cn('min-h-[54px]', {
                          'cursor-pointer': status !== JobFilter.SAVED,
                          'hover:bg-white': status === JobFilter.SAVED,
                        })}
                      >
                        <Table.Cell>
                          <div className="line-clamp-1 w-[392px]">
                            {jobPost.title ?? '-'}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          {jobPost.resumeCount}
                          {t('application-count')}
                        </Table.Cell>
                        <Table.Cell>
                          {formatCurrencyWithRule({
                            number: jobPost.salary,
                            locale,
                          }) ?? '-'}
                          {jobPost?.salaryNegotiable &&
                            ` (${t('table.salary-negotiable')})`}
                        </Table.Cell>
                        <Table.Cell
                          className={cn(!jobPost.openDate && 'text-blue-800')}
                        >
                          {jobPost.openDate
                            ? format(jobPost.openDate, 'yyyy.MM.dd')
                            : t('table.draft')}
                        </Table.Cell>
                        <Table.Cell
                          className={cn(!jobPost.dueDate && 'text-blue-800')}
                        >
                          {jobPost.dueDate
                            ? format(jobPost.dueDate, 'yyyy.MM.dd')
                            : t('table.no-expiration-date')}
                        </Table.Cell>
                        <Table.Cell className="flex">
                          <button
                            className="flex h-10 w-10 items-center justify-center"
                            disabled={status === JobFilter.CLOSED}
                            onClick={handleEditButtonClick(jobPost.id)}
                          >
                            <Icon
                              name="Pen"
                              size="large"
                              color={
                                status === JobFilter.CLOSED
                                  ? colors.gray[300]
                                  : colors.gray[700]
                              }
                            />
                          </button>
                          <CopyJobPostingButton
                            type="icon"
                            jobPostId={jobPost.id}
                            disabled={status === JobFilter.SAVED}
                            onSuccess={handleCopySuccess}
                          />
                          <PreviewJobPostingButton
                            type="icon"
                            jobPostId={jobPost.id}
                            disabled={status === JobFilter.SAVED}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                )
              })()}
            </Table.Root>
            {hasNoJobPosts && (
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
