import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import type { IResponse } from '~/types/common.type'
import { isAxiosExpiredError, isAxiosUnauthorizedError } from './utils'
import { toast } from 'react-toastify'
import {
  clearFromLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  saveAccessTokenToLS,
  saveProfileToLS,
  saveRefreshTokenToLS
} from './auth'
import type { RefreshTokenResponse, AuthResponse } from '~/types/auth.type'
import { BASE_URL } from '~/constants/env'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from '~/apis/auth.api'
import type { User } from '~/types/user.type'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'expire-access-token': 15, // 5s
        'expire-refresh-token': 20 // 1h
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
        if (url === URL_LOGIN || url === URL_REGISTER) {
          // const data = response.data as AuthResponse
          const data = response.data as AuthResponse
          this.accessToken = data.data?.access_token as string
          this.refreshToken = data.data?.refresh_token as string
          saveAccessTokenToLS(this.accessToken)
          saveRefreshTokenToLS(this.refreshToken)
          saveProfileToLS(data.data?.user as User)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          clearFromLS()
        }
        return response
      },
      (error: AxiosError) => {
        // if (isNotAxiosUnprocessableEntityError<IResponse<any>>(error)) {
        //   const message = error.response?.data?.message || error.message
        //   toast.error(message)
        // }
        if (
          ![HttpStatusCode.Unauthorized, HttpStatusCode.UnprocessableEntity].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
          clearFromLS()
        }
        if (isAxiosUnauthorizedError<IResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || { headers: {}, url: '' }
          const { url } = config
          if (isAxiosExpiredError(error) && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              return this.instance({ ...config, headers: { ...config.headers, Authorization: access_token } })
            })
          }
          clearFromLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data?.data?.message || error.response?.data.message)
        }

        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken = () => {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const access_token = res.data.data?.access_token as string
        saveAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearFromLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance
export default http
