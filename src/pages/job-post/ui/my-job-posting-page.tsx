import { getJobPostResumeSummary } from 'entities/job-post-resume-relation'

import MyJobPostingContent from './my-job-posting-content'

export const MyJobPostingPage = async () => {
  const summary = await getJobPostResumeSummary()

  return (
    <div className="flex flex-grow flex-col gap-4 py-10 pl-[46px]">
      <MyJobPostingContent summary={summary} />
    </div>
  )
}
