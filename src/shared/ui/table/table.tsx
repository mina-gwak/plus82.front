import { HTMLAttributes } from 'react'

import { cn } from 'shared/lib'

export const Root = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableElement>) => (
  <div className="relative w-full overflow-auto rounded-[10px] border border-gray-300">
    <table
      className={cn('body-large w-full caption-bottom', className)}
      {...props}
    />
  </div>
)

export const Header = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead
    className={cn('border-gray-300 bg-gray-100 [&_tr]:border-b', className)}
    {...props}
  />
)

export const Body = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody
    className={cn('border-gray-300 [&_tr:last-child]:border-0', className)}
    {...props}
  />
)

export const Footer = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <tfoot
    className={cn('border-t bg-gray-100/50 [&>tr]:last:border-b-0', className)}
    {...props}
  />
)

export const Row = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      'border-b border-gray-300 transition-colors hover:bg-gray-50',
      className,
    )}
    {...props}
  />
)

export const Head = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn(
      'h-11 px-2 text-left align-middle font-medium text-gray-700',
      '[&:first-child]:pl-5 [&:last-child]:pr-5',
      className,
    )}
    {...props}
  />
)

export const Cell = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={cn(
      'h-[54px] p-2 align-middle text-gray-900 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      '[&:first-child]:pl-5 [&:last-child]:pr-5',
      className,
    )}
    {...props}
  />
)

export const Caption = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableCaptionElement>) => (
  <caption className={cn('mt-4 text-gray-500', className)} {...props} />
)
