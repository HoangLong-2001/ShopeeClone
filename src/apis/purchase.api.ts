import type { IResponse } from '~/types/common.type'
import type { Purchase, PurchaseListStatus } from '~/types/purchase.type'
import http from '~/utils/http'

const URL = '/purchases'

export const addToCart = async (body: { product_id: string; buy_count: number }) => {
  const response = await http.post<IResponse<Purchase>>(`${URL}/add-to-cart`, body)
  return response.data
}
export const getPurchases = async (params: { status: PurchaseListStatus }) => {
  const response = await http.get<IResponse<Purchase[]>>(URL, {
    params
  })
  return response.data
}
export const updatePurchase = async (body: { product_id: string; buy_count: number }) => {
  const response = await http.put<IResponse<Purchase>>(`${URL}/update-purchase`, body)
  return response.data
}

export const byProducts = async (body: { product_id: string; buy_count: number }[]) => {
  const response = await http.post<IResponse<Purchase[]>>(`${URL}/buy-products`, body)
  return response.data
}
export const deletePurchase = async (purchaseIds: string[]) => {
  const response = await http.delete<IResponse<{ deleted_count: number }>>(`${URL}`, {
    data: purchaseIds
  })
  return response.data
}
