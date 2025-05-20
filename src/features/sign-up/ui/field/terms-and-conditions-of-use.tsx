import { Checkbox, CheckboxProps, linkVariants } from 'shared/ui'

const KoreanLabel = (className: string) => (
  <p className={className}>
    <a
      href="/terms-and-conditions-of-use"
      target="_blank"
      onClick={event => {
        event.stopPropagation()
      }}
      className={linkVariants({ variant: 'secondary' })}
    >
      개인정보 수집 및 이용 정책과 이용 약관
    </a>
    에 동의합니다.
  </p>
)

const EnglishLabel = (className: string) => (
  <p className={className}>
    I have read and agree to the Plus 82&apos;s
    <br />
    <a
      href="/terms-and-conditions-of-use"
      target="_blank"
      onClick={event => {
        event.stopPropagation()
      }}
      className={linkVariants({ variant: 'secondary' })}
    >
      Terms and Conditions of Use. (Essential)
    </a>
  </p>
)

type Props = CheckboxProps & {
  locale: 'ko' | 'en'
}

export const TermsAndConditionsOfUse = ({ locale, ...props }: Props) => {
  return (
    <Checkbox
      {...props}
      className="mb-4"
      label={locale === 'ko' ? KoreanLabel : EnglishLabel}
    />
  )
}
