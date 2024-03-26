import { http, HttpResponse } from 'msw'

import { GetRevenueByPeriodResponse } from '../get-revenue-by-period'

export const getRevenueByPeriodMock = http.get<
  never,
  never,
  GetRevenueByPeriodResponse
>('/metrics/daily-receipt-in-period', async ({ request }) => {
  const { searchParams } = new URL(request.url)

  const dateRange = searchParams.get('from')
    ? {
        from: searchParams.get('from'),
        to: searchParams.get('to'),
      }
    : false
  console.log(dateRange)
  if (dateRange) {
    return HttpResponse.json([
      { date: '20/03', receipt: 45100 },
      { date: '19/03', receipt: 70100 },
      { date: '18/03', receipt: 50900 },
      { date: '17/03', receipt: 10050 },
      { date: '16/03', receipt: 40090 },
      { date: '15/03', receipt: 30090 },
      { date: '14/03', receipt: 21090 },
    ])
  }
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
