import { getNullableBusinessSession } from 'entities/auth'
import { Button, Image } from 'shared/ui'
import { Layout } from 'shared/ui'

const BusinessPage = async () => {
  const session = await getNullableBusinessSession()

  const link = session ? '/business/job-posting/create' : '/business/sign-up'

  return (
    <Layout wide>
      <div
        className="flex h-full max-h-[900px] min-h-[667px] flex-col items-center justify-between rounded-3xl"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #D9E8FF 100%)',
        }}
      >
        <div className="flex w-full flex-col items-center">
          <h2 className="display-large mt-10 text-center font-bold text-gray-900">
            강사를 손쉽게 관리하고,
            <br />
            빠르게 채용하세요
          </h2>
          <div className="mt-6 w-fit text-center">
            <p className="title-small font-normal text-gray-700">
              학원에 맞는 원어민 강사를 찾고 계신가요?
            </p>
            <p className="title-small font-normal text-gray-700">
              지금, Plus82와 시작하세요.
            </p>
          </div>
          <Button as="a" href={link} size="large" className="mt-6 w-fit">
            무료로 가입하기
          </Button>
        </div>

        <Image
          src="/images/business-banner.png"
          useCDN={false}
          alt="business-page-image"
          fill={false}
          width={700}
          height={386}
          className="border-none"
        />
      </div>
    </Layout>
  )
}

export default BusinessPage
