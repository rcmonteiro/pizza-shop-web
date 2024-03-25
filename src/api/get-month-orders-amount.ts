import { api } from '@/lib/axios'

export interface GetMonthOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export const getMonthOrdersAmount = async ({
  managedRestaurantId,
}: {
  managedRestaurantId: string
}) => {
  const response = await api.get<GetMonthOrdersAmountResponse>(
    `/metrics/month-orders-amount`,
    {
      params: {
        managedRestaurantId,
      },
    },
  )
  return response.data
}
