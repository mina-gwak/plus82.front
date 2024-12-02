import { colors } from 'shared/config'
import { Icon } from 'shared/ui'

type Props = {
  onClick: () => void
}

export const ResetButton = ({ onClick }: Props) => {
  return (
    <button className="flex items-center gap-1" onClick={onClick}>
      <Icon name="Reset" size="small" color={colors.gray['500']} />
      <span className="body-large text-gray-500">Reset</span>
    </button>
  )
}
