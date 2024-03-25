import { TOrderStatus } from '@/components/order-status'
import { api } from '@/lib/axios'

export interface GetOrderQuery {
  orderId: string
}

export interface GetOrderResponse {
  status: TOrderStatus
  id: string
  createdAt: Date | null
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: { name: string }
  }[]
}

export const getOrderDetail = async ({ orderId }: GetOrderQuery) => {
  const response = await api.get<GetOrderResponse>(`/orders/${orderId}`)
  return response.data
}
