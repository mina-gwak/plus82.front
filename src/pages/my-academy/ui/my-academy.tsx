import { getAcademyMe } from 'entities/academy'
import { getBusinessUserMe } from 'entities/user'
import { Button } from 'shared/ui'

export const MyAcademyPage = async () => {
  const academy = await getAcademyMe()
  const user = await getBusinessUserMe()

  return (
    <div className="w-full py-10 pl-[46px]">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="title-large font-bold text-gray-900">{academy.name}</h2>
        <div className="flex items-center gap-1">
          <p className="body-large text-gray-700">담당자</p>
          <p className="body-large text-gray-900">{user?.fullName}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          as="a"
          href="/business/setting/my-account/personal-information"
          variant="lined"
          size="large"
          fullWidth
        >
          개인 정보 수정
        </Button>
        <Button
          as="a"
          href="/business/setting/my-account/change-password"
          variant="lined"
          size="large"
          fullWidth
        >
          비밀번호 변경
        </Button>
      </div>
    </div>
  )
}
