import axios, { AxiosError, type AxiosInstance } from 'axios'
import type { IResponse } from '~/types/common.type'
import { isNotAxiosUnprocessableEntityError } from './utils'
import { toast } from 'react-toastify'
import { clearFromLS, getAccessTokenFromLS, saveAccessTokenToLS, saveProfileToLS } from './auth'
import type { AuthResponse } from '~/types/auth.type'
import { BASE_URL } from '~/constants/env'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === 'login' || url === 'register') {
          const data = response.data as AuthResponse
          if (data.data?.access_token && data.data.user) {
            this.accessToken = data.data.access_token
            saveProfileToLS(data.data.user)
          }
          saveAccessTokenToLS(this.accessToken)
        } else if (url === 'logout') {
          this.accessToken = ''
          clearFromLS()
        }
        return response
      },
      function onRejected(error: AxiosError<IResponse<any> | any>) {
        if (isNotAxiosUnprocessableEntityError<IResponse<any>>(error)) {
          const message = error.response?.data?.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
