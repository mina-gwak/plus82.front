import { useTranslations } from 'next-intl'

type Props = {
  onClick: () => void
}

export const EditButton = ({ onClick }: Props) => {
  const t = useTranslations()

  return (
    <button
      type="button"
      className="body-large w-full px-3 py-3.5 text-left font-medium"
      onClick={onClick}
    >
      {t('feed-list.feed-menu.button.edit')}
    </button>
  )
}
