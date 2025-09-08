'use client'

import { cn } from 'shared/lib'

import { AcademyName } from './field/academy-name'
import { AcademyNameEn } from './field/academy-name-en'
import { Address } from './field/address'
import { BusinessRegistrationNumber } from './field/business-registration-number'
import { Description } from './field/description'
import { Images } from './field/images'
import { RepresentativeName } from './field/representative-name'
import { StudentType } from './field/student-type'

type Props = {
  className?: string
}

export const AcademyDetailForm = ({ className }: Props) => {
  return (
    <div className={cn('rounded-3xl border border-gray-300 p-10', className)}>
      <RepresentativeName />
      <AcademyName />
      <AcademyNameEn />
      <BusinessRegistrationNumber />
      <Address />
      <Description />
      <StudentType />
      <Images />
    </div>
  )
}
