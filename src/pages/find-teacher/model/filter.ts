export type FindTeacherFilter = {
  genderType: 'MALE' | 'FEMALE' | null
  countryIdList: number[]
  fromAge: number | null
  toAge: number | null
  visaTypeList: string[]
  forKindergarten?: boolean
  forElementary?: boolean
  forMiddleSchool?: boolean
  forHighSchool?: boolean
  forAdult?: boolean
}

export const defaultFilter: FindTeacherFilter = {
  genderType: null,
  countryIdList: [],
  fromAge: null,
  toAge: null,
  visaTypeList: [],
}
