import { http, HttpResponse } from 'msw'

import { DeliverOrderBody } from '../deliver-order'

export const deliverOrderMock = http.patch<DeliverOrderBody>(
  '/orders/:orderId/deliver',
  async ({ params }) => {
    const { orderId } = params

    if (orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    } else {
      return new HttpResponse(null, { status: 204 })
    }
  },
)
