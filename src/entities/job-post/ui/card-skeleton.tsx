export const CardSkeleton = () => {
  return (
    <div className="w-[250px]">
      <div className="skeleton relative mb-2 h-[150px] overflow-hidden rounded-xl border border-gray-200 bg-gray-200" />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="skeleton h-[20px] w-[120px] rounded-[4px] bg-gray-200" />
          <p className="skeleton h-4 w-10 rounded-[4px] bg-gray-200" />
        </div>
        <ul className="flex flex-col gap-1">
          <li className="skeleton h-4 w-[60px] rounded-[4px] bg-gray-200" />
          <li className="skeleton h-4 w-[80px] rounded-[4px] bg-gray-200" />
        </ul>
      </div>
    </div>
  )
}
