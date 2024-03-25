import { api } from '@/lib/axios'

export interface DispatchOrderBody {
  orderId: string
}

export const dispatchOrder = async ({ orderId }: DispatchOrderBody) => {
  await api.patch(`/orders/${orderId}/dispatch`)
}
