import { colors } from 'shared/config'
import { cn } from 'shared/lib'
import { Checkbox, CheckboxProps, Icon, linkVariants } from 'shared/ui'

const KoreanLabel = (className: string) => (
  <p className={cn('flex flex-grow items-start justify-between', className)}>
    (필수) 개인정보 수집 및 이용 동의서
    <a
      href="/consent-to-collection-and-use-of-personal-information"
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
  <p className={cn('flex flex-grow items-start justify-between', className)}>
    (Required) Consent to Collection
    <br />
    and Use of Personal Information
    <a
      href="/consent-to-collection-and-use-of-personal-information"
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

export const ConsentToCollectionAndUseOfPersonalInformation = ({
  locale,
  ...props
}: Props) => {
  return (
    <Checkbox
      {...props}
      className="mb-4 w-full"
      label={locale === 'ko' ? KoreanLabel : EnglishLabel}
    />
  )
}
