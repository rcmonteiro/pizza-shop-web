import { api } from '@/lib/axios'

export interface GetMonthCanceledResponse {
  amount: number
  diffFromLastMonth: number
}

export const getMonthCanceled = async ({
  managedRestaurantId,
}: {
  managedRestaurantId: string
}) => {
  const response = await api.get<GetMonthCanceledResponse>(
    `/metrics/month-canceled-orders-amount`,
    {
      params: {
        managedRestaurantId,
      },
    },
  )
  return response.data
}
