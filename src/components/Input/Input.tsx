import type { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface IInputProps<T extends FieldValues> {
  type: React.HTMLInputTypeAttribute
  className?: string
  placeholder?: string
  register: UseFormRegister<T>
  rules?: RegisterOptions<T>
  autoComplete?: string
  name: any
  errorMessage?: string
}
export default function Input<T extends FieldValues>({
  type,
  register,
  autoComplete,
  className,
  placeholder,
  name,
  errorMessage,
  rules
}: IInputProps<T>) {
  return (
    <div className={className}>
      <input
        type={type}
        autoComplete={autoComplete}
        className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}
