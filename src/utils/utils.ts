import type { AxiosError } from 'axios'
import axios, { HttpStatusCode } from 'axios'
import { BASE_URL } from '~/constants/env'
import userImage from '~/assets/images/no-purchase.png'
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return axios.isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
export function isNotAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return axios.isAxiosError(error) && error.response?.status !== HttpStatusCode.UnprocessableEntity
}
export function formatCurrency(value: number) {
  return new Intl.NumberFormat('de-DE').format(value)
}
export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
}
export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'
const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}
export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}
export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${BASE_URL}images/${avatarName}` : userImage)
