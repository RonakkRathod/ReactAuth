import { apiClient, withAuth } from './apiClient'

export const fetchUserById = async (id, token) => {
  const config = token ? withAuth(token) : undefined
  const { data } = await apiClient.get(`/users/${id}`, config)
  return data
}
