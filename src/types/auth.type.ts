import type { IResponse } from './common.type'
import type { User } from './user.type'

export type AuthResponse = IResponse<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>
