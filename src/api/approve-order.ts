import { api } from '@/lib/axios'

export interface ApproveOrderBody {
  orderId: string
}

export const approveOrder = async ({ orderId }: ApproveOrderBody) => {
  await api.patch(`/orders/${orderId}/approve`)
}
