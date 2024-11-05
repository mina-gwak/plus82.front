import { colors } from 'shared/config'
import { Icon, Layout } from 'shared/ui'

type Props = {
  title: string
  content?: string
}

export const ErrorPage = ({ title, content }: Props) => {
  return (
    <Layout className="flex flex-col items-center justify-center gap-4">
      <Icon name="ExclamationMark" color={colors.error} size="xxLarge" />
      <h1 className="display-small text-center font-bold text-gray-900">
        {title}
      </h1>
      {content && (
        <div className="title-medium whitespace-pre-line text-center text-gray-900">
          {content}
        </div>
      )}
    </Layout>
  )
}
