import { useTranslations } from 'next-intl'

import { Layout } from 'shared/ui'

export const PrivatePolicyPage = () => {
  const t = useTranslations('private-policy')

  return (
    <Layout
      wide
      className="w-[700px] min-w-[700px] space-y-12 [&_li]:ml-4 [&_ul]:list-disc"
    >
      <section className="flex flex-col gap-y-10">
        <h1 className="display-small font-bold text-gray-900">{t('title')}</h1>
        <p className="title-small whitespace-pre-line font-normal text-gray-800">
          {t('introduction')}
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.1.title')}
        </h3>
        <p className="title-small mb-4 font-normal text-gray-800">
          {t('article.1.content.1')}
        </p>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.1.content.items.general')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.1.content.items.career')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.1.content.items.auto')}
          </li>
        </ul>
        <p className="title-small mb-4 mt-4 font-normal text-gray-800">
          {t('article.1.content.2')}
        </p>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.1.content.methods.1')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.1.content.methods.2')}
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.2.title')}
        </h3>
        <p className="title-small mb-4 font-normal text-gray-800">
          {t('article.2.content')}
        </p>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.2.purposes.1')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.2.purposes.2')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.2.purposes.3')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.2.purposes.4')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.2.purposes.5')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.2.purposes.6')}
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.3.title')}
        </h3>
        <p className="title-small mb-4 font-normal text-gray-800">
          {t('article.3.content.1')}
        </p>
        <p className="title-small mb-4 font-normal text-gray-800">
          {t('article.3.content.2')}
        </p>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.3.content.periods.display')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.3.content.periods.contract')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.3.content.periods.payment')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.3.content.periods.complaint')}
          </li>
        </ul>
        <p className="title-small mb-4 mt-4 font-normal text-gray-800">
          {t('article.3.content.3')}
        </p>
        <p className="title-small font-normal text-gray-800">
          {t('article.3.content.4')}
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.4.title')}
        </h3>
        <p className="title-small mb-4 font-normal text-gray-800">
          {t('article.4.content')}
        </p>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.4.exceptions.1')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.4.exceptions.2')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.4.exceptions.3')}
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.5.title')}
        </h3>
        <p className="title-small font-normal text-gray-800">
          {t('article.5.content')}
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.6.title')}
        </h3>
        <p className="title-small font-normal text-gray-800">
          {t('article.6.content')}
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.7.title')}
        </h3>
        <p className="title-small mb-4 font-normal text-gray-800">
          {t('article.7.content.1')}
        </p>
        <p className="title-small mb-4 font-normal text-gray-800">
          {t('article.7.content.2')}
        </p>
        <p className="title-small font-normal text-gray-800">
          {t('article.7.content.3')}
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.8.title')}
        </h3>
        <p className="title-small mb-4 font-normal text-gray-800">
          {t('article.8.content.1')}
        </p>
        <p className="title-small font-normal text-gray-800">
          {t('article.8.content.2')}
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.9.title')}
        </h3>
        <p className="title-small mb-4 font-normal text-gray-800">
          {t('article.9.content.1')}
        </p>
        <p className="title-small font-normal text-gray-800">
          {t('article.9.content.2')}
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.10.title')}
        </h3>
        <p className="title-small mb-4 font-normal text-gray-800">
          {t('article.10.content')}
        </p>
        <div className="pl-6">
          <p className="title-small font-semibold text-gray-800">
            {t('article.10.officer.title')}
          </p>
          <p className="title-small font-normal text-gray-800">
            {t('article.10.officer.name')}
          </p>
          <p className="title-small font-normal text-gray-800">
            {t('article.10.officer.email')}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.11.title')}
        </h3>
        <p className="title-small mb-4 font-normal text-gray-800">
          {t('article.11.content')}
        </p>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.11.institutions.1')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.11.institutions.2')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.11.institutions.3')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.11.institutions.4')}
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.12.title')}
        </h3>
        <p className="title-small font-normal text-gray-800">
          {t('article.12.content')}
        </p>
      </section>
    </Layout>
  )
}
