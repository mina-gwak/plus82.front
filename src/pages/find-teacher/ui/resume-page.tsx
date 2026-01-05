'use client'

import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { cn } from 'shared/lib'
import { Layout, Pagination, Spinner, Table, Tabs } from 'shared/ui'

import { SidePanel } from './side-panel'
import { useRepresentativeResumes } from '../api/use-representative-resumes'
import { convertStudentType, convertVisaType } from '../lib/converter'
import { TabValue, useTab } from '../lib/tab'
import { defaultFilter, FindTeacherFilter } from '../model/filter'

export const RepresentativeResumePage = () => {
  const [filter, setFilter] = useState<FindTeacherFilter>(defaultFilter)
  const router = useRouter()

  const { tab, handleTabChange } = useTab()

  const [currentPage, setCurrentPage] = useState(0)

  console.log(filter)

  const { resumes, hasNoResume, totalPages, isLoading } =
    useRepresentativeResumes({
      ...filter,
      pageNumber: currentPage,
      rowCount: 10,
    })

  const handleItemClick = (id: number) => () => {
    router.push(`/business/find-teacher/resume/${id}`)
  }

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected)
  }

  return (
    <Layout wide>
      <div className="flex gap-4">
        <SidePanel onChange={setFilter} />
        <div className="w-[784px]">
          <Tabs.Root defaultValue={tab} onValueChange={handleTabChange}>
            <Tabs.List
              size="small"
              width="full"
              variant="box"
              className="mb-4 w-[240px]"
            >
              <Tabs.Trigger value={TabValue.SHOW_RESUME}>
                이력서 보기
              </Tabs.Trigger>
              <Tabs.Trigger value={TabValue.SHOW_HISTORY}>
                히스토리
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={tab} className="w-full">
              <div className="mb-10 h-[584px]">
                <Table.Root className="w-full">
                  <Table.Header>
                    <Table.Row className={cn(hasNoResume && 'border-none')}>
                      <Table.Head className="w-[150px]">이름</Table.Head>
                      <Table.Head className="w-[80px]">성별</Table.Head>
                      <Table.Head className="w-[120px]">생년월일</Table.Head>
                      <Table.Head className="w-[140px]">국적</Table.Head>
                      <Table.Head className="w-[120px]">비자</Table.Head>
                      <Table.Head className="w-[120px]">대상 학생</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  {(() => {
                    if (hasNoResume) {
                      return null
                    }

                    return (
                      <Table.Body>
                        {resumes.map(resume => (
                          <Table.Row
                            key={resume.id}
                            onClick={handleItemClick(resume.id!)}
                            className={cn('min-h-[54px] cursor-pointer')}
                          >
                            <Table.Cell>
                              {resume.firstName} {resume.lastName}
                            </Table.Cell>
                            <Table.Cell>
                              {resume.genderType === 'MALE' ? '남성' : '여성'}
                            </Table.Cell>
                            <Table.Cell>
                              {format(resume.birthDate, 'yyyy.MM.dd')}
                            </Table.Cell>
                            <Table.Cell>{resume.countryNameEn}</Table.Cell>
                            <Table.Cell>
                              {resume.hasVisa
                                ? convertVisaType(resume.visaType)
                                : '비자 없음'}
                            </Table.Cell>
                            <Table.Cell>
                              {convertStudentType({
                                forKindergarten: resume.forKindergarten,
                                forElementary: resume.forElementary,
                                forMiddleSchool: resume.forMiddleSchool,
                                forHighSchool: resume.forHighSchool,
                                forAdult: resume.forAdult,
                              })}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    )
                  })()}
                </Table.Root>
                {(() => {
                  if (isLoading) {
                    return (
                      <div className="relative mt-20 flex justify-center">
                        <Spinner size="medium" />
                      </div>
                    )
                  }

                  if (hasNoResume) {
                    return (
                      <p className="title-large mt-20 text-center font-medium text-gray-700">
                        조건에 맞는 선생님이 없어요
                      </p>
                    )
                  }

                  return null
                })()}
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
      <Pagination
        pageCount={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Layout>
  )
}
