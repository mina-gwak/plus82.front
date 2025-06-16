import { Layout } from 'shared/ui'
import {
  SettingSidebar,
  SettingSidebarProvider,
  businessItems,
} from 'widgets/sidebar'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout wide className="relative my-0 flex">
      <SettingSidebarProvider>
        <SettingSidebar items={businessItems} />
        {children}
      </SettingSidebarProvider>
    </Layout>
  )
}

export default PageLayout
