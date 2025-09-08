import { useTranslations } from 'next-intl'

import { Layout } from 'shared/ui'

export const TermsOfUsePage = () => {
  const t = useTranslations('terms-of-use')

  return (
    <Layout
      wide
      className="w-[700px] min-w-[700px] space-y-12 [&_li]:ml-4 [&_ul]:list-disc"
    >
      <section className="flex flex-col gap-y-10">
        <h1 className="display-small font-bold text-gray-900">{t('title')}</h1>
      </section>

      <h2 className="title-large font-bold text-gray-900">{t('chapter.1')}</h2>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.1.title')}
        </h3>
        <p className="title-small font-normal text-gray-800">
          {t('article.1.content')}
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.2.title')}
        </h3>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.2.items.site')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.2.items.member')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.2.items.contract')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.2.items.id')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.2.items.password')}
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.3.title')}
        </h3>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.3.items.1')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.3.items.2')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.3.items.3')}
          </li>
        </ul>
      </section>

      <h2 className="title-large font-bold text-gray-900">{t('chapter.2')}</h2>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.4.title')}
        </h3>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.4.items.1')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.4.items.2')}
            <ul className="mt-2">
              <li>{t('article.4.items.reasons.1')}</li>
              <li>{t('article.4.items.reasons.2')}</li>
              <li>{t('article.4.items.reasons.3')}</li>
            </ul>
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

      <h2 className="title-large font-bold text-gray-900">{t('chapter.3')}</h2>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.6.title')}
        </h3>
        <p className="title-small font-normal text-gray-800">
          {t('article.6.content')}
        </p>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.6.services.1')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.6.services.2')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.6.services.3')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.6.services.4')}
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.7.title')}
        </h3>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.7.items.1')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.7.items.2')}
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.8.title')}
        </h3>
        <p className="title-small font-normal text-gray-800">
          {t('article.8.content')}
        </p>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.8.reasons.1')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.8.reasons.2')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.8.reasons.3')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.8.reasons.4')}
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.9.title')}
        </h3>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.9.items.1')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.9.items.2')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.9.items.3')}
          </li>
        </ul>
      </section>

      <h2 className="title-large font-bold text-gray-900">{t('chapter.4')}</h2>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.10.title')}
        </h3>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.10.items.1')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.10.items.2')}
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.11.title')}
        </h3>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.11.items.1')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.11.items.2')}
          </li>
        </ul>
      </section>

      <h2 className="title-large font-bold text-gray-900">{t('chapter.5')}</h2>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.12.title')}
        </h3>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            {t('article.12.items.1')}
          </li>
          <li className="title-small font-normal text-gray-800">
            {t('article.12.items.2')}
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.13.title')}
        </h3>
        <p className="title-small font-normal text-gray-800">
          {t('article.13.content')}
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('supplementary.title')}
        </h3>
        <p className="title-small font-normal text-gray-800">
          {t('supplementary.content')}
        </p>
      </section>
    </Layout>
  )
}
