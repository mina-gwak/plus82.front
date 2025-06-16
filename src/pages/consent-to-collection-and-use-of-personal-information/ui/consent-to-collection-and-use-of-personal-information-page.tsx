import { useTranslations } from 'next-intl'

import { Layout } from 'shared/ui'

export const ConsentToCollectionAndUseOfPersonalInformationPage = () => {
  const t = useTranslations(
    'consent-to-collection-and-use-of-personal-information',
  )

  return (
    <Layout
      wide
      className="w-[700px] min-w-[700px] space-y-12 [&_li]:ml-4 [&_ul]:list-disc"
    >
      <section className="flex flex-col gap-y-10">
        <h1 className="display-small font-bold text-gray-900">{t('title')}</h1>
        <p className="title-small font-normal text-gray-800">
          {t('introduction')}
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.1.title')}
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="title-small font-bold text-gray-900">
              {t('article.1.content.1.title')}
            </h4>
            <ul className="mt-2 space-y-1">
              <li className="title-small font-normal text-gray-800">
                {t('article.1.content.1.items.1')}
              </li>
              <li className="title-small font-normal text-gray-800">
                {t('article.1.content.1.items.2')}
              </li>
            </ul>
          </div>
          <div>
            <h4 className="title-small font-bold text-gray-900">
              {t('article.1.content.2.title')}
            </h4>
            <ul className="mt-2 space-y-1">
              <li className="title-small font-normal text-gray-800">
                {t('article.1.content.2.items.1')}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.2.title')}
        </h3>
        <p className="title-small font-normal text-gray-800">
          {t('article.2.content')}
        </p>
        <ul className="space-y-1">
          {[1, 2, 3, 4, 5, 6].map(index => (
            <li key={index} className="title-small font-normal text-gray-800">
              {t(`article.2.purposes.${index}`)}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.3.title')}
        </h3>
        <div className="space-y-4">
          <p className="title-small font-normal text-gray-800">
            {t('article.3.content.1')}
          </p>
          <p className="title-small font-normal text-gray-800">
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
          <p className="title-small font-normal text-gray-800">
            {t('article.3.content.3')}
          </p>
          <p className="title-small font-normal text-gray-800">
            {t('article.3.content.4')}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.4.title')}
        </h3>
        <p className="title-small font-normal text-gray-800">
          {t('article.4.content')}
        </p>
        <ul className="space-y-1">
          {[1, 2, 3].map(index => (
            <li key={index} className="title-small font-normal text-gray-800">
              {t(`article.4.exceptions.${index}`)}
            </li>
          ))}
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
        <ul className="space-y-1">
          {[1, 2, 3].map(index => (
            <li key={index} className="title-small font-normal text-gray-800">
              {t(`article.7.content.${index}`)}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.8.title')}
        </h3>
        <ul className="space-y-1">
          {[1, 2].map(index => (
            <li key={index} className="title-small font-normal text-gray-800">
              {t(`article.8.content.${index}`)}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.9.title')}
        </h3>
        <ul className="space-y-1">
          {[1, 2].map(index => (
            <li key={index} className="title-small font-normal text-gray-800">
              {t(`article.9.content.${index}`)}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          {t('article.10.title')}
        </h3>
        <ul className="space-y-1">
          {[1, 2, 3].map(index => (
            <li key={index} className="title-small font-normal text-gray-800">
              {t(`article.10.content.${index}`)}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
