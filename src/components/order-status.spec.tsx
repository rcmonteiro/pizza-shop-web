import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

export type TOrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

const orderStatusMap: Record<TOrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  processing: 'Em preparo',
  delivering: 'Em entrega',
  delivered: 'Entregue',
}

const orderStatusColors: Record<TOrderStatus, string> = {
  pending: 'bg-slate-400',
  canceled: 'bg-rose-500',
  processing: 'bg-amber-400',
  delivering: 'bg-amber-400',
  delivered: 'bg-emerald-500',
}

describe('Order Status', () => {
  const orderStatus: TOrderStatus[] = [
    'pending',
    'canceled',
    'processing',
    'delivering',
    'delivered',
  ]

  orderStatus.forEach((status) => {
    it(`should display the right text and badge when order status = ${status}`, () => {
      const wrapper = render(<OrderStatus status={status} />)
      // wrapper.debug()

      const statusText = wrapper.getByText(orderStatusMap[status])
      const statusBadge = wrapper.getByTestId('badge')

      expect(statusText).toBeInTheDocument()
      expect(statusBadge).toHaveClass(orderStatusColors[status])
    })
  })
})
