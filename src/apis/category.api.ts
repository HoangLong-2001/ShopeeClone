import type { CategoryResponse } from '~/types/category.type'
import http from '~/utils/http'
const URL = 'categories'
export const getCategories = async () => {
  const response = await http.get<CategoryResponse>(URL)
  return response.data
}
