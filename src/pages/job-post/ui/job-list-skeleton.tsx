import { CardSkeleton } from 'entities/job-post'

export const JobListSkeleton = () => {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <li key={index}>
          <CardSkeleton />
        </li>
      ))}
    </ul>
  )
}
