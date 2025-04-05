'use client' // Error boundaries must be Client Components

import { useRouter } from 'next/navigation'

import { HttpError } from 'shared/api'
import { Button, Image, Layout } from 'shared/ui'

export default function Error({ error }: { error: HttpError }) {
  const router = useRouter()

  const handleButtonClick = () => {
    router.push('/')
  }

  console.log(error)

  return (
    <Layout wide>
      <div className="flex h-full flex-col items-center justify-center">
        <Image
          src="/images/error.png"
          useCDN={false}
          alt={error?.cause?.toString() ?? 'error'}
          className="mb-4 h-[200px] w-[200px] border-none"
        />
        <h2 className="display-large mb-4 font-bold text-gray-900">
          Resume Unavailable
        </h2>
        <div className="title-medium mb-10 flex flex-col text-center text-gray-900">
          <p>This resume is not accessible.</p>
        </div>

        <Button onClick={handleButtonClick} className="w-[360px]">
          Back to main
        </Button>
      </div>
    </Layout>
  )
}
