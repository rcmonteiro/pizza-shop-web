import { http, HttpResponse } from 'msw'

import { CancelOrderBody } from '../cancel-order'

export const cancelOrderMock = http.patch<CancelOrderBody>(
  '/orders/:orderId/cancel',
  async ({ params }) => {
    const { orderId } = params

    if (orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    } else {
      return new HttpResponse(null, { status: 204 })
    }
  },
)
