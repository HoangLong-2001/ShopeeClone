import { type ProductListResponse, type ProductListConfig, type Product } from '~/types/product.type'
import http from '~/utils/http'
const URL = '/products'
export const getProducts = async (params: ProductListConfig) => {
  const response = await http.get<ProductListResponse>(URL, {
    params
  })
  return response.data
}
export const getProduct = async (id: string) => {
  const response = await http.get<Product>(`${URL}/${id}`)
  return response.data
}
