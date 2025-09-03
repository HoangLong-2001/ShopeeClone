import axios, { AxiosError, type AxiosInstance } from 'axios'
import type { IResponse } from '~/types/common.type'
import { isNotAxiosUnprocessableEntityError } from './utils'
import { toast } from 'react-toastify'
import { clearAccessTokenFromLS, getAccessTokenFromLS, saveAccessTokenToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
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
          this.accessToken = response.data.data.access_token
          saveAccessTokenToLS(this.accessToken)
        } else if (url === 'logout') {
          this.accessToken = ''
          clearAccessTokenFromLS()
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
