export type FormValues = {
  genderType: string[] | null
  age: number[]
  visaTypeList: string[] | null
  studentType: string[] | null
  countryIdList: number[] | null
}

export const defaultValues: FormValues = {
  genderType: [],
  age: [0, 50],
  visaTypeList: [],
  studentType: [],
  countryIdList: [],
}
