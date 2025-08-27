import { type AuthResponse } from '~/types/auth.type'
import http from '~/utils/http'

export const registerAccount = async (body: { email: string; password: string }) => {
  const response = await http.post<AuthResponse>('register', body)
  return response.data
}
export const login = async (body: { email: string; password: string }) => {
  const response = await http.post<AuthResponse>('login', body)
  return response.data
}
