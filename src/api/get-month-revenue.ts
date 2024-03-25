import { api } from '@/lib/axios'

export interface GetMonthRevenueResponse {
  receipt: number
  diffFromLastMonth: number
}

export const getMonthRevenue = async ({
  managedRestaurantId,
}: {
  managedRestaurantId: string
}) => {
  const response = await api.get<GetMonthRevenueResponse>(
    `/metrics/month-receipt`,
    {
      params: {
        managedRestaurantId,
      },
    },
  )
  return response.data
}
