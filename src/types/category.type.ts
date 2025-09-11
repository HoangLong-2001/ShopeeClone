import type { IResponse } from './common.type'

export interface Category {
  _id: string
  name: string
}
export type CategoryResponse = IResponse<Category[]>
