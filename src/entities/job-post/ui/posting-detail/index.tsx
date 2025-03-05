import { formatDate, toDisplayValue } from 'shared/lib'

import type { JobPostDetail } from '../../model/job-post-detail'
import AcademyAddress from '../academy-address'

type Props = {
  jobPost: JobPostDetail
}

export const PostingDetail = ({ jobPost }: Props) => {
  return (
    <ul className="flex flex-col gap-8">
      <li className="flex flex-col gap-[6px]">
        <h4 className="title-large font-medium text-gray-900">
          Academy information
        </h4>
        <p className="title-small font-normal text-gray-900">
          {toDisplayValue(jobPost.academyDescription)}
        </p>
      </li>
      <li className="flex flex-col gap-[6px]">
        <h4 className="title-large font-medium text-gray-900">Job details</h4>
        <p className="title-small font-normal text-gray-900">
          {toDisplayValue(jobPost.description)}
        </p>
      </li>
      <li className="flex flex-col gap-[6px]">
        <h4 className="title-large font-medium text-gray-900">Salary</h4>
        <p className="title-small font-normal text-gray-900">
          {toDisplayValue(jobPost.salary)}
        </p>
      </li>
      <li className="flex flex-col gap-[6px]">
        <h4 className="title-large font-medium text-gray-900">Start date</h4>
        <p className="title-small font-normal text-gray-900">
          {formatDate(jobPost.jobStartDate)}
        </p>
      </li>
      <li className="flex flex-col gap-[6px]">
        <h4 className="title-large font-medium text-gray-900">
          Expiration date
        </h4>
        <p className="title-small font-normal text-gray-900">
          {formatDate(jobPost.dueDate)}
        </p>
      </li>
      <li className="flex flex-col gap-[6px]">
        <h4 className="title-large font-medium text-gray-900">
          Academy address
        </h4>
        <div className="title-small font-normal text-gray-900">
          <AcademyAddress
            address={jobPost.academyDetailedAddress}
            lat={jobPost.lat}
            lng={jobPost.lng}
          />
        </div>
      </li>
    </ul>
  )
}
