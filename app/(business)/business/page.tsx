import { colors } from 'shared/config'
import { Icon } from 'shared/ui'
import { Layout } from 'shared/ui'

export default function BusinessPage() {
  return (
    <Layout wide>
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <Icon
          name="ExclamationMark"
          size="custom"
          className="h-[150px] w-[150px]"
          color={colors.blue[800]}
        />
        <h2 className="display-medium font-medium text-gray-900">
          현재{' '}
          <mark className="bg-transparent font-bold text-blue-800">
            페이지 준비중
          </mark>
          입니다.
        </h2>
        <div className="flex flex-col items-center gap-1">
          <p className="title-medium text-gray-600">
            이용에 불편을 드려 죄송합니다.
          </p>
          <p className="title-medium text-gray-600">
            보다 나은 서비스 제공을 위하여 페이지 준비중에 있습니다.
          </p>
          <p className="title-medium text-gray-600">
            빠른 시일 내에 준비하여 찾아뵙겠습니다.
          </p>
        </div>
      </div>
    </Layout>
  )
}
