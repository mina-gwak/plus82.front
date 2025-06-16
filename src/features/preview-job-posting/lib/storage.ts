import { JobPostDetail } from 'entities/job-post'
import { getStorage, removeStorage, setStorage } from 'shared/lib'

const PREVIEW_JOB_POSTING_KEY = 'job-posting-preview'

export const getPreviewJobPosting = () => {
  const jobPosting = getStorage(PREVIEW_JOB_POSTING_KEY)

  if (!jobPosting) {
    return null
  }

  return JSON.parse(jobPosting)
}

export const setPreviewJobPosting = (jobPosting: JobPostDetail) => {
  setStorage(PREVIEW_JOB_POSTING_KEY, JSON.stringify(jobPosting))
}

export const clearPreviewJobPosting = () => {
  removeStorage(PREVIEW_JOB_POSTING_KEY)
}
