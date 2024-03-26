import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { approveOrderMock } from './approve-order.mock'
import { cancelOrderMock } from './cancel-order.mock'
import { deliverOrderMock } from './deliver-order.mock'
import { dispatchOrderMock } from './dispatch-order.mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount.mock'
import { getManagedRestaurantMock } from './get-managed-restaurant.mock'
import { getMonthCanceledMock } from './get-month-canceled.mock'
import { getMonthOrdersAmountMock } from './get-month-orders-amount.mock'
import { getMonthRevenueMock } from './get-month-revenue.mock'
import { getOrderDetailsMock } from './get-order-details.mock'
import { getOrdersMock } from './get-orders.mock'
import { getPopularProductsMock } from './get-popular-products.mock'
import { getProfileMock } from './get-profile.mock'
import { getRevenueByPeriodMock } from './get-revenue-by-period.mock'
import { registerRestaurantMock } from './register-restaurant.mock'
import { signInMock } from './sign-in.mock'
import { updateProfileMock } from './update-profile.mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledMock,
  getMonthRevenueMock,
  getDayOrdersAmountMock,
  getRevenueByPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
  getOrdersMock,
  getOrderDetailsMock,
  approveOrderMock,
  cancelOrderMock,
  deliverOrderMock,
  dispatchOrderMock,
)

export const enableMSW = async () => {
  if (env.MODE !== 'test') return
  await worker.start()
}
