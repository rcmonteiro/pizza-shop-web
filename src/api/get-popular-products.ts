import { api } from '@/lib/axios'

type GetPopularProductsResponse = {
  product: string
  amount: number
}[]

export const getPopularProducts = async ({
  managedRestaurantId,
}: {
  managedRestaurantId: string
}) => {
  const response = await api.get<GetPopularProductsResponse>(
    `/metrics/popular-products`,
    {
      params: {
        managedRestaurantId,
      },
    },
  )
  return response.data
}
