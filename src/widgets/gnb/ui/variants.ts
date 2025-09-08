import { cva } from 'class-variance-authority'

export const header = cva(
  'w-fit min-w-full border-b border-b-gray-300 bg-white py-3',
)

export const outerWrapper = cva('mx-auto flex w-fit')

export const innerWrapper = cva(
  'mx-10 flex w-[1060px] items-center justify-between',
)

export const leftSection = cva('flex cursor-pointer items-center gap-[7.5rem]')

export const rightSection = cva('flex items-center gap-2')

export const textButtons = cva('flex items-center')

export const divider = cva('h-5 w-px bg-gray-300')
