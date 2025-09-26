import type { InputHTMLAttributes } from 'react'
import type { FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface IInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<TFieldValues>
  rules?: RegisterOptions<TFieldValues>
  name?: TName
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}
export default function Input<T extends FieldValues>({
  register,
  className,
  name,
  classNameError = 'mt-1 min-h-[1rem] text-sm text-red-600',
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  errorMessage,
  onChange,
  rules,
  ...rest
}: IInputProps<T>) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input {...rest} className={classNameInput} {...registerResult} onChange={onChange} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
