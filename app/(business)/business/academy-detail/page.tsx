import { getAcademyMe } from 'entities/academy'
import { AcademyDetailPage } from 'pages/academy-detail'

const Page = async () => {
  const academyDetail = await getAcademyMe()

  return <AcademyDetailPage academyDetail={academyDetail} />
}

export default Page
