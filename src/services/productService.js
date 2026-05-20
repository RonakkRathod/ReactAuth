import { apiClient } from './apiClient'

export const fetchProducts = async ({ limit, skip }) => {
  const { data } = await apiClient.get('/products', {
    params: { limit, skip },
  })
  return data
}

export const fetchProductById = async (id) => {
  const { data } = await apiClient.get(`/products/${id}`)
  return data
}
