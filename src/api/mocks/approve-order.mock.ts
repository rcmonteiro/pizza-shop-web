import { http, HttpResponse } from 'msw'

import { ApproveOrderBody } from '../approve-order'

export const approveOrderMock = http.patch<ApproveOrderBody>(
  '/orders/:orderId/approve',
  async ({ params }) => {
    const { orderId } = params

    if (orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    } else {
      return new HttpResponse(null, { status: 204 })
    }
  },
)
