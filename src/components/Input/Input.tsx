import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface IInputProps {
  type: React.HTMLInputTypeAttribute
  className?: string
  placeholder?: string
  register: UseFormRegister<any>
  rules?: RegisterOptions<any>
  autoComplete?: string
  name: string
  errorMessage?: string
}
export default function Input({
  type,
  register,
  autoComplete,
  className,
  placeholder,
  name,
  errorMessage,
  rules
}: IInputProps) {
  return (
    <div className={className}>
      <input
        type={type}
        autoComplete={autoComplete}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
