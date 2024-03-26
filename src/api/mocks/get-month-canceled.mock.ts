import { http, HttpResponse } from 'msw'

import { GetMonthCanceledResponse } from '../get-month-canceled'

export const getMonthCanceledMock = http.get<
  never,
  never,
  GetMonthCanceledResponse
>('/metrics/month-canceled-orders-amount', async () => {
  return HttpResponse.json({
    amount: 103,
    diffFromLastMonth: 7,
  })
})
