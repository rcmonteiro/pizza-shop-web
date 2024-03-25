import { TOrderStatus } from '@/components/order-status'
import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex: number | 0
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export interface GetOrdersResponse {
  orders: {
    orderId: string
    createdAt: string
    status: TOrderStatus
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export const getOrders = async ({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrdersQuery) => {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      orderId,
      customerName,
      status,
    },
  })
  return response.data
}
