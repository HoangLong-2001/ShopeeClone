import { type AuthResponse } from '~/types/auth.type'
import http from '~/utils/http'
export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
export const registerAccount = async (body: { email: string; password: string }) => {
  const response = await http.post<AuthResponse>(URL_REGISTER, body)
  return response.data
}
export const login = async (body: { email: string; password: string }) => {
  const response = await http.post<AuthResponse>(URL_LOGIN, body)
  return response.data
}

export const logout = async () => await http.post(URL_LOGOUT)
