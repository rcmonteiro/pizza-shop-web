import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus, TOrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { queryClient } from '@/lib/react-query'
import { currency, distanceToNow } from '@/utils/formatters'

import { OrderDetails } from './order-details'

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: TOrderStatus
    customerName: string
    total: number
  }
}

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false)

  const updateStatusOnCache = ({
    orderId,
    status,
  }: {
    orderId: string
    status: TOrderStatus
  }) => {
    const cached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })
    cached.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }
          return order
        }),
      })
    })
  }

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateStatusOnCache({ orderId, status: 'processing' })
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateStatusOnCache({ orderId, status: 'delivering' })
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateStatusOnCache({ orderId, status: 'delivered' })
      },
    })

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateStatusOnCache({ orderId, status: 'canceled' })
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
          <DialogTrigger asChild>
            <Button variant={'outline'} size={'xs'}>
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails open={isOrderDetailOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {distanceToNow(order.createdAt)}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {currency(order.total / 100)}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            variant={'outline'}
            size={'xs'}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
          >
            Aprovar
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant={'outline'}
            size={'xs'}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
          >
            Em entrega
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant={'outline'}
            size={'xs'}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
          >
            Entregue
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant={'ghost'}
          size={'xs'}
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
