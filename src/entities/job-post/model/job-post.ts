export enum Location {
  SEOUL = 'Seoul',
  BUSAN = 'Busan',
  DAEGU = 'Daegu',
  INCHEON = 'Incheon',
  GWANGJU = 'Gwangju',
  DAEJEON = 'Daejeon',
  ULSAN = 'Ulsan',
  SEJONG = 'Sejong',
  GYEONGGI = 'Gyeonggi',
  GANGWON = 'Gangwon',
  CHUNGBUK = 'Chungcheongbuk-do',
  CHUNGNAM = 'Chungcheongnam-do',
  JEONBUK = 'Jeollabuk-do',
  JEONNAM = 'Jeollanam-do',
  GYEONGBUK = 'Gyeongsangbuk-do',
  GYEONGNAM = 'Gyeongsangnam-do',
  JEJU = 'Jeju',
}

export enum StudentType {
  KINDERGARTEN = 'Kindergarten',
  ELEMENTARY = 'Elementary',
  MIDDLE_SCHOOL = 'MiddleSchool',
  HIGH_SCHOOL = 'HighSchool',
  ADULT = 'Adult',
}

export type JobPost = {
  id: number
  title: string
  dueDate: string
  academyId: number
  academyName: string
  locationType: Location
  forKindergarten: boolean
  forElementary: boolean
  forMiddleSchool: boolean
  forHighSchool: boolean
  forAdult: boolean
  imageUrls: string[]
}
