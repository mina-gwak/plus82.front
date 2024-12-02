import { setupServer } from 'msw/node'

import { jobPostHandlers } from 'entities/job-post'

export const server = setupServer(...jobPostHandlers)
