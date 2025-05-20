'use client'

import { useRouter } from 'next/navigation'

import { HttpError } from 'shared/api'
import { Button, Image, Layout } from 'shared/ui'

export default function Error({ error }: { error: HttpError }) {
  const router = useRouter()

  const handleButtonClick = () => {
    router.push('/business')
  }

  return (
    <Layout wide>
      <div className="flex h-full flex-col items-center justify-center">
        <Image
          src="/images/error.png"
          useCDN={false}
          alt={error?.cause?.toString() ?? 'error'}
          className="mb-4 h-[200px] w-[200px] border-none"
        />
        <h2 className="display-large mb-4 font-bold text-gray-900">안내</h2>
        <div className="title-medium mb-10 flex flex-col text-center text-gray-900">
          <p>잘못된 경로로 접근하셨습니다.</p>
        </div>
        <Button onClick={handleButtonClick} className="w-[360px]">
          메인으로 돌아가기
        </Button>
      </div>
    </Layout>
  )
}
