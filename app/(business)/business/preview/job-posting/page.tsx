'use client'

import { useEffect } from 'react'

import {
  getPreviewJobPosting,
  clearPreviewJobPosting,
} from 'features/preview-job-posting'
import { JobPostingDetailPage as _JobPostingDetailPage } from 'pages/job-post'

const JobPostingDetailPage = () => {
  const jobPostDetail = getPreviewJobPosting()

  if (!jobPostDetail) {
    throw new Error('Job posting not found')
  }

  useEffect(() => {
    return () => {
      clearPreviewJobPosting()
    }
  }, [])

  return (
    <_JobPostingDetailPage
      jobPostDetail={jobPostDetail}
      hasApplied={false}
      hasNoResume={false}
    />
  )
}

export default JobPostingDetailPage
