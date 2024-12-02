import { delay, http, HttpResponse } from 'msw'

import {
  convertURL,
  getAPISearchParams,
  getPaginationResponse,
  type PageSize,
  resolver,
} from 'shared/mocks'

import { JobPost, Location } from 'entities/job-post/model/job-post'

const JobPostData: JobPost = {
  id: 1,
  title: 'Job Post Title',
  dueDate: '2025-01-01',
  academyId: 1,
  academyName: 'Academy Name',
  locationType: Location.SEOUL,
  forKindergarten: true,
  forElementary: false,
  forMiddleSchool: false,
  forHighSchool: false,
  forAdult: false,
  imageUrls: ['/images/banner.svg'],
}

export const getJobPostsHandler = (response: JobPost = JobPostData) =>
  http.get(
    convertURL('/job-posts'),
    resolver(async ({ request }) => {
      await delay(1000)
      const [pageNumber, rowCount] = getAPISearchParams(request, [
        'pageNumber',
        'rowCount',
      ])

      return HttpResponse.json(
        getPaginationResponse(response, {
          isRepetitive: true,
          pageNumber,
          rowCount: rowCount as PageSize,
        }),
      )
    }),
  )
