import { cva } from 'class-variance-authority'

export const layout = cva('flex flex-col items-center')

export const heading = cva('display-small mb-10 font-bold text-gray-900')

export const fields = cva('mb-[88px] flex flex-col gap-6')

export const field = cva('flex flex-col gap-2')

export const buttonGroup = cva('mb-10 flex flex-col items-center gap-2')

export const footer = cva('body-large flex items-center gap-2 text-gray-900')
