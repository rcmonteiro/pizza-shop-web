import { api } from '@/lib/axios'

export interface DeliverOrderBody {
  orderId: string
}

export const deliverOrder = async ({ orderId }: DeliverOrderBody) => {
  await api.patch(`/orders/${orderId}/deliver`)
}
