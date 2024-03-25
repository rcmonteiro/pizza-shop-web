import { api } from '@/lib/axios'

export interface GetDayOrdersAmountResponse {
  amount: number
  diffFromYesterday: number
}

export const getDayOrdersAmount = async ({
  managedRestaurantId,
}: {
  managedRestaurantId: string
}) => {
  const response = await api.get<GetDayOrdersAmountResponse>(
    `/metrics/day-orders-amount`,
    {
      params: {
        managedRestaurantId,
      },
    },
  )
  return response.data
}
