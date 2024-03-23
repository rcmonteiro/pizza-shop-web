import { api } from '@/lib/axios'

export interface RegisterRestaurantBody {
  restaurantName: string
  managerName: string
  phone: string
  email: string
}

export const registerRestaurant = async ({
  restaurantName,
  managerName,
  phone,
  email,
}: RegisterRestaurantBody) => {
  await api.post('/restaurants', {
    restaurantName,
    managerName,
    phone,
    email,
  })
}
