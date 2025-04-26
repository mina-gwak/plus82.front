'use client'

import ReactPaginate from 'react-paginate'

import { colors } from 'shared/config'
import { cn } from 'shared/lib'

import { Icon } from '../icon'

interface PaginationProps {
  pageCount?: number
  currentPage: number
  onPageChange: (selectedItem: { selected: number }) => void
  className?: string
}

export const Pagination = ({
  pageCount = 1,
  currentPage,
  onPageChange,
  className,
}: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      forcePage={currentPage}
      onPageChange={onPageChange}
      className={cn('flex items-center justify-center gap-1', className)}
      pageLinkClassName={cn(
        'body-large flex h-8 w-8 items-center justify-center rounded-md font-bold text-gray-900 transition-colors',
        'hover:bg-gray-100',
      )}
      activeLinkClassName={cn('bg-blue-800 text-white', 'hover:!bg-blue-700')}
      previousLinkClassName={cn(
        'flex h-8 w-8 items-center justify-center rounded-md text-gray-700',
        'hover:bg-gray-100',
        'aria-disabled:hover:bg-white',
      )}
      nextLinkClassName={cn(
        'flex h-8 w-8 items-center justify-center rounded-md text-gray-700',
        'hover:bg-gray-100',
        'aria-disabled:hover:bg-white',
      )}
      breakLinkClassName={cn(
        'flex h-8 w-8 items-center justify-center text-gray-700',
      )}
      disabledClassName={cn('cursor-not-allowed opacity-50 hover:bg-white')}
      previousLabel={
        <Icon name="ChevronLeft" size="medium" color={colors.gray[700]} />
      }
      nextLabel={
        <Icon name="ChevronRight" size="medium" color={colors.gray[700]} />
      }
      breakLabel={
        <Icon
          name="Dot"
          size="medium"
          color={colors.gray[700]}
          className="rotate-90 transform"
        />
      }
    />
  )
}
