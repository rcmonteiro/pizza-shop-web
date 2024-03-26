import { http, HttpResponse } from 'msw'

import { GetRevenueByPeriodResponse } from '../get-revenue-by-period'

export const getRevenueByPeriodMock = http.get<
  never,
  never,
  GetRevenueByPeriodResponse
>('/metrics/daily-receipt-in-period', async () => {
  return HttpResponse.json([
    { date: '26/03', receipt: 15100 },
    { date: '25/03', receipt: 10100 },
    { date: '24/03', receipt: 80900 },
    { date: '23/03', receipt: 70050 },
    { date: '22/03', receipt: 20090 },
    { date: '21/03', receipt: 50090 },
    { date: '20/03', receipt: 11090 },
  ])
})
