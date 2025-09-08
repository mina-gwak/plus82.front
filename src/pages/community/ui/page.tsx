import { Layout } from 'shared/ui'

import { FeedList } from './feed-list'
import { Search } from './search'
import { SidePanel } from './side-panel'

type Props = {
  isPublic: boolean
}

export const CommunityPage = async ({ isPublic }: Props) => {
  return (
    <Layout wide className="flex">
      <SidePanel isPublic={isPublic} />
      <div className="flex-1">
        {!isPublic && <Search />}
        <FeedList isPublic={isPublic} />
      </div>
    </Layout>
  )
}
