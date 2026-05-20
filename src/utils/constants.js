export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com'

export const AUTH_STORAGE_KEY =
  import.meta.env.VITE_AUTH_STORAGE_KEY || 'reactauth.session'

export const PRODUCTS_PAGE_SIZE = Number(
  import.meta.env.VITE_PRODUCTS_PAGE_SIZE || 12,
)
