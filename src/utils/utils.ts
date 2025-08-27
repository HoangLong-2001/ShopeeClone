import type { AxiosError } from 'axios'
import axios, { HttpStatusCode } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return axios.isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
export function isNotAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return axios.isAxiosError(error) && error.response?.status !== HttpStatusCode.UnprocessableEntity
}
