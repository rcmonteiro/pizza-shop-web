import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', async () => {
  return HttpResponse.json([
    { product: 'Calabresa', amount: 150 },
    { product: 'Mussarela', amount: 101 },
    { product: 'Peperoni', amount: 89 },
    { product: 'Marguerita', amount: 75 },
    { product: 'Portuguesa', amount: 29 },
  ])
})
