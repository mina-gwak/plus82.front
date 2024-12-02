import { setupWorker } from 'msw/browser'

import { jobPostHandlers } from 'entities/job-post'

export const worker = setupWorker(...jobPostHandlers)
