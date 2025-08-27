import axios, { AxiosError, type AxiosInstance } from 'axios'
import type { IResponse } from '~/types/common.type'
import { isNotAxiosUnprocessableEntityError } from './utils'
import { toast } from 'react-toastify'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    this.instance.interceptors.response.use(
      function onFulfilled(response) {
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
