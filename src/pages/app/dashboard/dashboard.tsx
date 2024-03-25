import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'

import { DayOrdersAmountCard } from './day-orders-amount-card'
import { MonthCanceledCard } from './month-canceled-card'
import { MonthOrdersAmountCard } from './month-orders-amount-card'
import { MonthRevenueCard } from './month-revenue-card'
import { PopularProductsChart } from './popular-products-chart'
import { RevenueChart } from './revenue-chart'

export const Dashboard = () => {
  const {
    data: managedRestaurant /*, isLoading: isLoadingManagedRestaurant */,
  } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        {managedRestaurant && (
          <>
            <div className="grid grid-cols-4 gap-4">
              <MonthRevenueCard managedRestaurantId={managedRestaurant?.id} />
              <MonthOrdersAmountCard
                managedRestaurantId={managedRestaurant?.id}
              />
              <DayOrdersAmountCard
                managedRestaurantId={managedRestaurant?.id}
              />
              <MonthCanceledCard managedRestaurantId={managedRestaurant?.id} />
            </div>
            <div className="grid grid-cols-9 gap-4">
              <RevenueChart />
              <PopularProductsChart
                managedRestaurantId={managedRestaurant?.id}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}
