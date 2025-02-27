import { JobPostRelation } from '../../model/application'

import { Table } from './table'

type ApplicationTableProps = {
  applications?: JobPostRelation[]
}

export const ApplicationTable = ({ applications }: ApplicationTableProps) => {
  return (
    <Table>
      <Table.Header />
      <Table.Body>
        {applications?.map(application => (
          <Table.Row key={application.id} application={application} />
        ))}
      </Table.Body>
    </Table>
  )
}
