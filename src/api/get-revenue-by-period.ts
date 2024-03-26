import { api } from '@/lib/axios'

export type GetRevenueByPeriodResponse = {
  date: string
  receipt: number
}[]

interface GetRevenueByPeriod {
  from?: Date
  to?: Date
}

export const getRevenueByPeriod = async ({ from, to }: GetRevenueByPeriod) => {
  const response = await api.get<GetRevenueByPeriodResponse>(
    `/metrics/daily-receipt-in-period`,
    {
      params: { from, to },
    },
  )
  return response.data
}
