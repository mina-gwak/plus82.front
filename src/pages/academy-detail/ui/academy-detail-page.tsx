'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { AcademyDetail } from 'entities/academy'
import {
  AcademyDetailForm,
  SidePanel,
  convertToFormValues,
} from 'features/academy-detail-form'
import { Form } from 'shared/form'
import { Layout } from 'shared/ui'

type Props = {
  academyDetail: AcademyDetail
}

export const AcademyDetailPage = ({ academyDetail }: Props) => {
  const t = useTranslations()

  const form = useForm({
    values: convertToFormValues(academyDetail),
  })

  return (
    <Layout wide>
      <h1 className="display-small mb-10 text-center font-bold text-gray-900">
        {t('academy-detail.title')}
      </h1>
      <Form {...form} className="flex gap-[20px]">
        <AcademyDetailForm className="flex-grow" />
        <div className="space-y-2">
          <SidePanel />
        </div>
      </Form>
    </Layout>
  )
}
