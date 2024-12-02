import { capitalize } from 'lodash-es'
import Image from 'next/image'

import { colors } from 'shared/config'
import { Icon } from 'shared/ui'

import { convertStudentType } from 'entities/job-post'

import { JobPost } from '../model/job-post'

export const Card = ({
  imageUrls,
  title,
  academyName,
  locationType,
  forKindergarten,
  forElementary,
  forMiddleSchool,
  forHighSchool,
  forAdult,
}: JobPost) => {
  const studentType = convertStudentType({
    forKindergarten,
    forElementary,
    forMiddleSchool,
    forHighSchool,
    forAdult,
  })

  return (
    <div className="w-[250px]">
      <div className="relative mb-2 h-[150px] overflow-hidden rounded-xl border border-gray-200">
        <Image
          src={`${process.env.NEXT_PUBLIC_CDN_URL}${imageUrls[0]}`}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <h3 className="title-medium text-gray-900">{title}</h3>
          <p className="body-large font-normal text-gray-500">{academyName}</p>
        </div>
        <ul className="flex flex-col gap-1">
          <li className="body-large flex items-center gap-0.5 font-normal text-gray-700">
            <Icon name="LocationFilled" color={colors.gray[500]} size="small" />
            <span>{capitalize(locationType)}</span>
          </li>
          <li className="body-large flex items-center gap-0.5 font-normal text-gray-700">
            <Icon name="User" color={colors.gray[500]} size="small" />
            <span>{studentType}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
