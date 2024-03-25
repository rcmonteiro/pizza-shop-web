import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatNumber } from '@/utils/formatters'

import { MetricCardSkeleton } from './metric-card-skeleton'

export const DayOrdersAmountCard = ({
  managedRestaurantId,
}: {
  managedRestaurantId: string
}) => {
  const { data: cardData } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: () => getDayOrdersAmount({ managedRestaurantId }),
    staleTime: 2000,
  })

  return (
    <Card>
      <CardHeader className="pb2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {cardData ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {formatNumber(cardData?.amount)}
            </span>
            <p className="text-xs text-muted-foreground">
              {cardData.diffFromYesterday > 0 ? (
                <span className=" text-emerald-500 dark:text-emerald-400">
                  +{cardData?.diffFromYesterday}%
                </span>
              ) : (
                <span className=" text-rose-500 dark:text-rose-400">
                  {cardData?.diffFromYesterday}%
                </span>
              )}{' '}
              em relação a ontem
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
