import { Skeleton } from 'shared/ui'

export function ApplicationTableSkeleton() {
  return (
    <div className="divide-gray-00 divide-y">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex py-4 pl-5">
          <div className="w-[180px]">
            <Skeleton className="h-[18px] w-4/5" />
          </div>
          <div className="w-[314px]">
            <Skeleton className="h-[18px] w-4/5" />
          </div>
          <div className="w-[140px]">
            <Skeleton className="h-[18px] w-4/5" />
          </div>
          <div className="w-[90px]">
            <Skeleton className="h-[18px] w-4/5" />
          </div>
        </div>
      ))}
    </div>
  )
}
