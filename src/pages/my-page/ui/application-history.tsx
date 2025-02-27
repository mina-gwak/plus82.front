import {
  getJobPostResumeSummary,
  HistoryPanel,
} from 'entities/job-post-resume-relation'

export const ApplicationHistory = async () => {
  const summary = await getJobPostResumeSummary()

  return (
    <div>
      <h3 className="title-small mb-4 text-gray-900">Application History</h3>
      <HistoryPanel summary={summary} />
    </div>
  )
}
