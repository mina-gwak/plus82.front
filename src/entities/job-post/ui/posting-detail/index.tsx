import { useLocale } from 'next-intl'

import { formatDate, formatCurrency, toDisplayValue } from 'shared/lib'

import type { JobPostDetail } from '../../model/job-post-detail'
import AcademyAddress from '../academy-address'

type Props = {
  jobPost: JobPostDetail
}

export const PostingDetail = ({ jobPost }: Props) => {
  const local = useLocale()

  const code = local === 'ko' ? '만원' : 'in 10,000 KRW'

  return (
    <ul className="flex flex-col gap-8">
      <li className="flex flex-col gap-[6px]">
        <h4 className="title-large font-medium text-gray-900">
          Academy information
        </h4>
        <p className="title-small whitespace-pre-line font-normal text-gray-900">
          {toDisplayValue(jobPost.academyDescription)}
        </p>
      </li>
      <li className="flex flex-col gap-[6px]">
        <h4 className="title-large font-medium text-gray-900">
          Job Description
        </h4>
        <p className="title-small whitespace-pre-line font-normal text-gray-900">
          {toDisplayValue(jobPost.jobDescription)}
        </p>
      </li>
      <li className="flex flex-col gap-[6px]">
        <h4 className="title-large font-medium text-gray-900">
          Required Qualification
        </h4>
        <p className="title-small whitespace-pre-line font-normal text-gray-900">
          {toDisplayValue(jobPost.requiredQualification)}
        </p>
      </li>
      <li className="flex flex-col gap-[6px]">
        <h4 className="title-large font-medium text-gray-900">
          Preferred Qualification
        </h4>
        <p className="title-small whitespace-pre-line font-normal text-gray-900">
          {toDisplayValue(jobPost.preferredQualification)}
        </p>
      </li>
      <li className="flex flex-col gap-[6px]">
        <h4 className="title-large font-medium text-gray-900">Benefits</h4>
        <p className="title-small whitespace-pre-line font-normal text-gray-900">
          {toDisplayValue(jobPost.benefits)}
        </p>
      </li>
      <li className="flex flex-col gap-[6px]">
        <h4 className="title-large font-medium text-gray-900">Salary</h4>
        <p className="title-small font-normal text-gray-900">
          {toDisplayValue(formatCurrency({ number: jobPost.salary, code }))}
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
            address={`${jobPost.academyAddress} ${jobPost.academyDetailedAddress}`}
            lat={jobPost.lat}
            lng={jobPost.lng}
          />
        </div>
      </li>
    </ul>
  )
}
