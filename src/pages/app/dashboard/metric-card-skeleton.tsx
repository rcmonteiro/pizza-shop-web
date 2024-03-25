import { Skeleton } from '@/components/ui/skeleton'

export const MetricCardSkeleton = () => {
  return (
    <>
      <Skeleton className="mt-1 h-7 w-36" />
      <Skeleton className="w-53 h-4" />
    </>
  )
}
