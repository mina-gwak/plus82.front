import { colors } from 'shared/config'
import { cn } from 'shared/lib'
import { Checkbox, CheckboxProps, Icon, linkVariants } from 'shared/ui'

const KoreanLabel = (className: string) => (
  <p className={cn('flex flex-grow items-center justify-between', className)}>
    (필수) 개인정보 처리방침
    <a
      href="/private-policy"
      target="_blank"
      onClick={event => {
        event.stopPropagation()
      }}
      className={linkVariants({ variant: 'secondary' })}
    >
      <Icon name="ChevronRight" size="large" color={colors.gray[700]} />
    </a>
  </p>
)

const EnglishLabel = (className: string) => (
  <p className={cn('flex flex-grow items-center justify-between', className)}>
    (Required) Private Policy
    <a
      href="/private-policy"
      target="_blank"
      onClick={event => {
        event.stopPropagation()
      }}
      className={linkVariants({ variant: 'secondary' })}
    >
      <Icon name="ChevronRight" size="large" color={colors.gray[700]} />
    </a>
  </p>
)

type Props = CheckboxProps & {
  locale: 'ko' | 'en'
}

export const PrivatePolicy = ({ locale, ...props }: Props) => {
  return (
    <Checkbox
      {...props}
      className="mb-4 w-full"
      label={locale === 'ko' ? KoreanLabel : EnglishLabel}
    />
  )
}
