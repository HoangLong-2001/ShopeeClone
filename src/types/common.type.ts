import yup from 'yup'
import type { RegisterOptions } from 'react-hook-form'
import type { schema, userSchema } from '~/utils/rules'

// export declare interface IFormState {
//   email: string
//   password: string
//   confirm_password: string
// }
export type FORM_VALIDATE_TYPE = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions<IFormState>
}
export type IFormState = yup.InferType<typeof schema>
export interface IResponse<Data> {
  message: string
  data?: Data
}
export type UserFormState = yup.InferType<typeof userSchema>
export type NotUndefinedField<T> = {
  [key in keyof T]-?: NotUndefinedField<NonNullable<T[key]>>
}
