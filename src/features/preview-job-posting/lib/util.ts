import { AcademyDetail } from 'entities/academy'
import { CreateJobPost, JobPostDetail } from 'entities/job-post'

export const convertToJobPostingDetail = ({
  createJobPost,
  academyDetail,
}: {
  createJobPost: CreateJobPost
  academyDetail: AcademyDetail
}): JobPostDetail => {
  return {
    ...createJobPost,
    id: Math.random(),
    academyId: academyDetail.id,
    academyName: academyDetail.name,
    academyNameEn: academyDetail.nameEn,
    academyRepresentativeName: academyDetail.representativeName,
    academyDescription: academyDetail.description,
    academyLocationType: academyDetail.locationType,
    academyAddress: academyDetail.address,
    academyDetailedAddress: academyDetail.detailedAddress,
    lat: academyDetail.lat,
    lng: academyDetail.lng,
    forKindergarten: academyDetail.forKindergarten,
    forElementary: academyDetail.forElementary,
    forMiddleSchool: academyDetail.forMiddleSchool,
    forHighSchool: academyDetail.forHighSchool,
    academyImageUrls: academyDetail.imageList.map(image => image.path),
  }
}
