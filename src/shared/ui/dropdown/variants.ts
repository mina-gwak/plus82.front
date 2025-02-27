import { cva } from 'class-variance-authority'

export const dropdownWrapper = cva(
  'absolute left-0 top-[calc(100%+6px)] z-dropdown w-full rounded-lg border border-gray-300 bg-white',
  {
    variants: {
      scrollable: {
        true: 'overflow-hidden',
        false: 'overflow-visible',
      },
    },
  },
)

export const dropdown = cva('', {
  variants: {
    scrollable: {
      true: 'scrollbar overflow-auto',
      false: 'overflow-visible',
    },
  },
})

export const dropdownGroup = cva('group')

export const dropdownItem = cva(
  'body-medium min-h-12 cursor-pointer p-3 leading-6 text-gray-900 hover:bg-gray-100 group-[:not(:last-child)]:last:border-b group-[:not(:last-child)]:last:border-b-gray-500 data-selected:bg-gray-100 not-last:border-b not-last:border-b-gray-300',
)

export const dropdownItemContent = cva('flex items-center justify-between')

export const wrapperOnlyForStory = cva(
  'relative flex h-[2rem] w-[200px] items-center justify-center',
)
